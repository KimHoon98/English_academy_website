'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { getTest, GradeKey } from '@/lib/levelTests/index';
import type { GradeTest } from '@/lib/levelTests/types';
import Link from 'next/link';

type Phase = 'disclaimer' | 'test' | 'result';
type Section = 'reading1' | 'reading2' | 'grammar';

export default function LevelTestGradePage() {
  const params = useParams();
  const router = useRouter();
  const grade = (params.grade as string)?.toLowerCase() as GradeKey;

  const [test, setTest] = useState<GradeTest | null>(null);
  const [phase, setPhase] = useState<Phase>('disclaimer');
  const [section, setSection] = useState<Section>('reading1');
  const [answers, setAnswers] = useState<{ [id: number]: number }>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [readingScore, setReadingScore] = useState(0);
  const [grammarScore, setGrammarScore] = useState(0);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);

      const testData = await getTest(grade);
      if (!testData) { router.push('/level-test'); return; }
      setTest(testData);
    };
    init();
  }, [grade]);

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const allAnswered = (questions: { id: number }[]) =>
    questions.every(q => answers[q.id] !== undefined);

  const handleSubmit = async () => {
    if (!test || !userId) return;
    setSaving(true);

    const allReadingQuestions = [
      ...test.reading.passage1.questions,
      ...test.reading.passage2.questions,
    ];
    const allQuestions = [...allReadingQuestions, ...test.grammar];

    const rScore = allReadingQuestions.filter(q => answers[q.id] === q.answer).length;
    const gScore = test.grammar.filter(q => answers[q.id] === q.answer).length;

    // 문제별 정답/오답 정보
    const wrongQuestions = allQuestions
      .filter(q => answers[q.id] !== q.answer)
      .map(q => ({
        id: q.id,
        type: q.type,
        question: q.question,
        yourAnswer: q.options[answers[q.id]],
        correctAnswer: q.options[q.answer],
      }));

    const answersData = allQuestions.map(q => ({
      id: q.id,
      type: q.type,
      question: q.question,
      yourAnswer: q.options[answers[q.id]] ?? '미응답',
      correctAnswer: q.options[q.answer],
      isCorrect: answers[q.id] === q.answer,
    }));

    setReadingScore(rScore);
    setGrammarScore(gScore);

    await supabase.from('level_test_results').insert({
      user_id: userId,
      grade: test.grade,
      grade_label: test.gradeLabel,
      reading_score: rScore,
      grammar_score: gScore,
      total_score: rScore + gScore,
      total_questions: 20,
      answers: answersData,
      wrong_questions: wrongQuestions,
    });

    setSaving(false);
    setPhase('result');
  };

  if (!test) return <div className="min-h-screen flex items-center justify-center text-slate-500">불러오는 중...</div>;

  // ========================
  // 1. 안내 화면
  // ========================
  if (phase === 'disclaimer') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full border border-slate-100">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">{test.gradeLabel} 레벨 테스트</h2>
            <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">임시 온라인 테스트</span>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <p className="text-amber-800 font-bold text-sm mb-1">⚠️ 안내 사항</p>
              <p className="text-amber-700 text-sm leading-relaxed">
                이 테스트는 대략적인 영어 수준을 파악하기 위한 <strong>임시 온라인 테스트</strong>입니다.
                정확한 레벨 측정을 위해서는 <strong>학원 방문 후 직접 테스트</strong>를 받으실 것을 권장드립니다.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
              <p className="font-black text-slate-900 text-sm">테스트 구성</p>
              <div className="flex items-center gap-3">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Reading</span>
                <p className="text-sm text-slate-600">지문 2개 × 5문제 = 총 10문제</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-slate-700 text-white text-xs font-bold px-3 py-1 rounded-full">Grammar</span>
                <p className="text-sm text-slate-600">문법 문제 10문제</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">Total</span>
                <p className="text-sm text-slate-600">총 20문제 / 약 15~20분 소요</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPhase('test')}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition cursor-pointer"
          >
            확인했습니다. 테스트 시작하기! →
          </button>

          <div className="text-center mt-4">
            <Link href="/level-test" className="text-sm text-slate-400 hover:text-slate-600 hover:underline">
              ← 학년 선택으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ========================
  // 2. 테스트 화면
  // ========================
  if (phase === 'test') {
    const currentPassage = section === 'reading1'
      ? test.reading.passage1
      : section === 'reading2'
      ? test.reading.passage2
      : null;
    const currentGrammar = section === 'grammar' ? test.grammar : null;
    const currentQuestions = currentPassage?.questions ?? currentGrammar ?? [];

    const sectionLabel = section === 'reading1'
      ? 'Reading - Passage 1'
      : section === 'reading2'
      ? 'Reading - Passage 2'
      : 'Grammar';

    const sectionNumber = section === 'reading1' ? 1 : section === 'reading2' ? 2 : 3;

    const handleNext = () => {
      if (section === 'reading1') setSection('reading2');
      else if (section === 'reading2') setSection('grammar');
      else handleSubmit();
    };

    return (
      <div className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-3xl mx-auto">

          {/* 상단 진행 표시 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500">{test.gradeLabel} 레벨 테스트</span>
              <span className="text-sm font-bold text-blue-600">{sectionNumber} / 3 섹션</span>
            </div>
            <div className="flex gap-2">
              {(['reading1', 'reading2', 'grammar'] as Section[]).map((s, i) => (
                <div key={s} className={`h-2 flex-1 rounded-full transition-all ${
                  s === section ? 'bg-blue-600' :
                  (section === 'reading2' && s === 'reading1') || (section === 'grammar') ? 'bg-blue-300' :
                  'bg-slate-200'
                }`} />
              ))}
            </div>
          </div>

          {/* 섹션 헤더 */}
          <div className="mb-6">
            <span className={`inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-3 ${
              section === 'grammar' ? 'bg-slate-700' : 'bg-blue-600'
            }`}>
              {sectionLabel}
            </span>
          </div>

          {/* 지문 */}
          {currentPassage && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
              <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">Passage</p>
              <p className="text-slate-800 leading-relaxed text-sm whitespace-pre-line">{currentPassage.passage}</p>
            </div>
          )}

          {/* 문제 목록 */}
          <div className="space-y-6">
            {currentQuestions.map((q, qIdx) => (
              <div key={q.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <p className="font-black text-slate-900 mb-4">
                  <span className="text-blue-600 mr-2">Q{q.id}.</span>
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswer(q.id, oIdx)}
                      className={`w-full text-left px-5 py-3 rounded-xl border-2 font-medium text-sm transition-all cursor-pointer ${
                        answers[q.id] === oIdx
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <span className="font-black mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 다음 버튼 */}
          <div className="mt-8">
            <button
              onClick={handleNext}
              disabled={!allAnswered(currentQuestions) || saving}
              className={`w-full py-5 rounded-2xl text-xl font-black transition-all shadow-lg cursor-pointer ${
                allAnswered(currentQuestions) && !saving
                  ? 'bg-slate-900 text-white hover:bg-blue-600'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {saving ? '저장 중...' :
               !allAnswered(currentQuestions) ? '모든 문제에 답해주세요' :
               section === 'grammar' ? '테스트 제출하기 →' : '다음 섹션으로 →'}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ========================
  // 3. 결과 화면
  // ========================
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-100 text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-black text-slate-900 mb-1">테스트 완료!</h2>
          <p className="text-slate-500 mb-8">{test.gradeLabel} 레벨 테스트 결과</p>

          {/* 점수 카드 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Reading</p>
              <p className="text-3xl font-black text-slate-900">{readingScore}</p>
              <p className="text-xs text-slate-400 mt-1">/ 10</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-2">Grammar</p>
              <p className="text-3xl font-black text-slate-900">{grammarScore}</p>
              <p className="text-xs text-slate-400 mt-1">/ 10</p>
            </div>
            <div className={`rounded-2xl p-5 border ${
              readingScore + grammarScore >= 16 ? 'bg-green-50 border-green-200' :
              readingScore + grammarScore >= 10 ? 'bg-amber-50 border-amber-200' :
              'bg-red-50 border-red-200'
            }`}>
              <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-2">Total</p>
              <p className={`text-3xl font-black ${
                readingScore + grammarScore >= 16 ? 'text-green-600' :
                readingScore + grammarScore >= 10 ? 'text-amber-600' :
                'text-red-500'
              }`}>{readingScore + grammarScore}</p>
              <p className="text-xs text-slate-400 mt-1">/ 20</p>
            </div>
          </div>

          {/* 코멘트 */}
          <div className={`rounded-2xl p-5 mb-6 text-left ${
            readingScore + grammarScore >= 16 ? 'bg-green-50 border border-green-200' :
            readingScore + grammarScore >= 10 ? 'bg-amber-50 border amber-200' :
            'bg-red-50 border border-red-100'
          }`}>
            <p className="font-black text-slate-900 mb-1">
              {readingScore + grammarScore >= 16 ? '🌟 우수한 수준이에요!' :
               readingScore + grammarScore >= 10 ? '📚 기초가 잡혀 있어요!' :
               '💪 함께 실력을 키워봐요!'}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {readingScore + grammarScore >= 16
                ? '현재 학년 수준에서 매우 우수한 실력을 보여주고 있어요. 더 높은 수준의 학습으로 도전해보세요!'
                : readingScore + grammarScore >= 10
                ? '기본적인 영어 실력을 갖추고 있어요. 꾸준한 연습으로 더욱 향상시킬 수 있어요!'
                : '영어의 기초를 함께 다져봐요. 디아크 잉글리시의 맞춤형 커리큘럼이 도움이 될 거예요!'}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
            <p className="text-amber-800 text-sm font-bold">⚠️ 이 결과는 임시 온라인 테스트 결과입니다.</p>
            <p className="text-amber-700 text-xs mt-1">정확한 레벨 측정을 위해 학원 방문 테스트를 권장드립니다.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/consultation"
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition text-center">
            상담 신청하러 가기 →
          </Link>
          <Link href="/profile"
            className="w-full py-4 bg-white text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition text-center border border-slate-200">
            내 테스트 결과 보기
          </Link>
          <Link href="/level-test"
            className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-lg hover:bg-slate-200 transition text-center">
            다른 학년 테스트 해보기
          </Link>
        </div>
      </div>
    </div>
  );
}
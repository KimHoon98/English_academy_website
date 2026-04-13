'use client';

import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';

type Profile = {
  id: string;
  nickname: string | null;
  avatar_url: string | null;
};

type Consultation = {
  id: string;
  created_at: string;
  child_name: string;
  child_grade: string;
  message: string | null;
  is_resolved: boolean;
  admin_reply: string | null;
  replied_at: string | null;
};

type TestResult = {
  id: string;
  created_at: string;
  grade: string;
  grade_label: string;
  reading_score: number;
  grammar_score: number;
  total_score: number;
  total_questions: number;
};

type Tab = 'profile' | 'tests' | 'consultations' | 'settings';

export default function ProfileClient({
  userEmail, userId, profile, consultations
}: {
  userEmail: string;
  userId: string;
  profile: Profile | null;
  consultations: Consultation[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [nickname, setNickname] = useState(profile?.nickname ?? '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sentIds, setSentIds] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchTestResults = async () => {
      const { data } = await supabase
        .from('level_test_results')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (data) setTestResults(data);
    };
    fetchTestResults();
  }, [userId]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${userId}/avatar.${ext}`;
    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(path);
      const url = data.publicUrl + '?t=' + Date.now();
      setAvatarUrl(url);
      await supabase.from('profiles').upsert({ id: userId, avatar_url: url });
    }
    setUploading(false);
  };

  const handleSaveNickname = async () => {
    setSaving(true);
    await supabase.from('profiles').upsert({ id: userId, nickname });
    setSaveMsg('저장됐어요!');
    setSaving(false);
    setTimeout(() => setSaveMsg(''), 2000);
  };

  const handleDeleteAccount = async () => {
    await fetch('/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  const handleSendResult = async (result: TestResult) => {
    setSendingId(result.id);
    await supabase.from('level_test_results').update({
      sent_to_admin: true,
      sent_at: new Date().toISOString(),
    }).eq('id', result.id);
    setSentIds(prev => [...prev, result.id]);
    setSendingId(null);
  };

  const getScoreColor = (score: number, total: number) => {
    const pct = score / total;
    if (pct >= 0.8) return 'text-green-600';
    if (pct >= 0.5) return 'text-amber-600';
    return 'text-red-500';
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: '내 프로필' },
    { id: 'tests', label: '레벨테스트' },
    { id: 'consultations', label: '상담 내역' },
    { id: 'settings', label: '설정' },
  ];

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      {/* 탭 */}
      <div className="flex gap-2 mb-8 bg-white rounded-2xl p-2 border border-slate-100 shadow-sm overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-500 hover:text-slate-900'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-10 border border-slate-100">

        {/* 내 프로필 탭 */}
        {activeTab === 'profile' && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-black">일반 회원</span>
              <h1 className="text-2xl font-black text-slate-900">내 프로필</h1>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div
                className="w-28 h-28 rounded-full border-4 border-slate-100 shadow-lg overflow-hidden bg-slate-100 flex items-center justify-center cursor-pointer hover:opacity-80 transition relative"
                onClick={() => fileRef.current?.click()}
              >
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="프로필 사진" fill className="object-cover" />
                ) : (
                  <span className="text-4xl">👤</span>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              <button onClick={() => fileRef.current?.click()}
                className="mt-3 text-sm text-blue-600 font-bold hover:underline cursor-pointer">
                사진 변경하기
              </button>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">이메일</p>
              <p className="font-bold text-slate-900">{userEmail}</p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">닉네임</p>
              <div className="flex gap-2">
                <input
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  placeholder="닉네임을 입력해주세요"
                  className="flex-1 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button onClick={handleSaveNickname} disabled={saving}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition cursor-pointer disabled:opacity-50">
                  {saving ? '저장 중...' : '저장'}
                </button>
              </div>
              {saveMsg && <p className="text-blue-600 text-xs font-bold mt-2">{saveMsg}</p>}
            </div>
          </div>
        )}

        {/* 레벨테스트 탭 */}
        {activeTab === 'tests' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">📝 레벨테스트 내역</h2>
              <Link href="/level-test"
                className="text-sm font-bold text-blue-600 hover:underline">
                테스트 보러가기 →
              </Link>
            </div>

            {testResults.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-10 text-center border border-slate-100">
                <p className="text-slate-400 mb-4">아직 레벨테스트 내역이 없습니다.</p>
                <Link href="/level-test" className="text-blue-600 font-bold hover:underline">
                  레벨테스트 하러 가기 →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {testResults.map(result => {
                  const isSent = sentIds.includes(result.id) || (result as any).sent_to_admin;
                  return (
                    <div key={result.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                      {/* 헤더 */}
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <div>
                          <p className="font-black text-slate-900 text-lg">{result.grade_label}</p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {new Date(result.created_at).toLocaleDateString('ko-KR', {
                              year: 'numeric', month: 'long', day: 'numeric',
                              hour: '2-digit', minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <span className={`text-2xl font-black ${getScoreColor(result.total_score, result.total_questions)}`}>
                          {result.total_score} / {result.total_questions}
                        </span>
                      </div>

                      {/* 점수 상세 */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                          <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Reading</p>
                          <p className={`text-2xl font-black ${getScoreColor(result.reading_score, 10)}`}>
                            {result.reading_score}
                          </p>
                          <p className="text-xs text-slate-400">/ 10</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
                          <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1">Grammar</p>
                          <p className={`text-2xl font-black ${getScoreColor(result.grammar_score, 10)}`}>
                            {result.grammar_score}
                          </p>
                          <p className="text-xs text-slate-400">/ 10</p>
                        </div>
                      </div>

                      {/* 원장님께 결과 보내기 */}
                      <div className={`rounded-xl p-4 border ${isSent ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                        {isSent ? (
                          <p className="text-sm font-bold text-green-700">✅ 원장님께 결과를 전송했습니다.</p>
                        ) : (
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <p className="text-sm text-amber-800 font-medium">
                              원장님께 이 결과를 보내시겠어요?
                            </p>
                            <button
                              onClick={() => handleSendResult(result)}
                              disabled={sendingId === result.id}
                              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition cursor-pointer disabled:opacity-50 shrink-0"
                            >
                              {sendingId === result.id ? '전송 중...' : '원장님께 결과 보내기'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 상담 내역 탭 */}
        {activeTab === 'consultations' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">📋 상담 신청 내역</h2>
              <div className="flex gap-3">
                <div className="text-center">
                  <p className="text-2xl font-black text-slate-900">{consultations.length}</p>
                  <p className="text-xs text-slate-400">전체</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-blue-600">{consultations.filter(c => c.admin_reply).length}</p>
                  <p className="text-xs text-slate-400">답변 완료</p>
                </div>
              </div>
            </div>

            {consultations.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-10 text-center border border-slate-100">
                <p className="text-slate-400 mb-4">아직 상담 신청 내역이 없습니다.</p>
                <Link href="/consultation" className="text-blue-600 font-bold hover:underline">
                  상담 신청하러 가기 →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {consultations.map(c => (
                  <div key={c.id} className={`rounded-2xl p-6 border shadow-sm ${c.admin_reply ? 'border-blue-100 bg-blue-50/30' : 'border-slate-100 bg-white'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.admin_reply ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                        {c.admin_reply ? '답변 완료' : '답변 대기 중'}
                      </span>
                      <span className="text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString('ko-KR')}</span>
                    </div>
                    <p className="font-black text-slate-900">{c.child_name} ({c.child_grade})</p>
                    {c.message && <p className="text-sm text-slate-500 mt-2 bg-slate-50 p-3 rounded-xl">{c.message}</p>}
                    {c.admin_reply ? (
                      <div className="mt-3 bg-white rounded-xl p-4 border border-blue-100">
                        <p className="text-xs font-bold text-blue-600 mb-1">✉️ 원장님 답변</p>
                        <p className="text-sm text-slate-700">{c.admin_reply}</p>
                        <p className="text-xs text-slate-400 mt-1">{new Date(c.replied_at!).toLocaleDateString('ko-KR')}</p>
                      </div>
                    ) : (
                      <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-sm text-slate-400">아직 답변이 작성되지 않았습니다. 조금만 기다려주세요!</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 설정 탭 */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-8">⚙️ 설정</h2>
            <div className="space-y-4">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-black text-slate-900 mb-1">비밀번호 변경</h3>
                <p className="text-sm text-slate-500 mb-4">이메일로 비밀번호 재설정 링크를 받아요.</p>
                <Link href="/find-password"
                  className="inline-block px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition">
                  비밀번호 변경하기
                </Link>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-black text-slate-900 mb-1">닉네임 변경</h3>
                <p className="text-sm text-slate-500 mb-4">프로필에 표시될 닉네임을 변경해요.</p>
                <div className="flex gap-2">
                  <input
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    placeholder="새 닉네임 입력"
                    className="flex-1 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button onClick={handleSaveNickname} disabled={saving}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition cursor-pointer disabled:opacity-50">
                    {saving ? '저장 중...' : '저장'}
                  </button>
                </div>
                {saveMsg && <p className="text-blue-600 text-xs font-bold mt-2">{saveMsg}</p>}
              </div>

              <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                <h3 className="font-black text-red-600 mb-1">계정 삭제</h3>
                <p className="text-sm text-slate-500 mb-4">계정을 삭제하면 모든 데이터가 사라지며 복구할 수 없어요.</p>
                {!deleteConfirm ? (
                  <button onClick={() => setDeleteConfirm(true)}
                    className="px-5 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition cursor-pointer">
                    계정 삭제하기
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-red-600">정말 삭제하시겠어요? 이 작업은 되돌릴 수 없어요.</p>
                    <div className="flex gap-2">
                      <button onClick={handleDeleteAccount}
                        className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition cursor-pointer">
                        네, 삭제할게요
                      </button>
                      <button onClick={() => setDeleteConfirm(false)}
                        className="px-5 py-2.5 bg-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-300 transition cursor-pointer">
                        취소
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
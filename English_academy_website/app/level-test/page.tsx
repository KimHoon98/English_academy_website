'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

const grades = [
  { id: 'A1', label: '초등학교 1학년', group: '초등' },
  { id: 'A2', label: '초등학교 2학년', group: '초등' },
  { id: 'A3', label: '초등학교 3학년', group: '초등' },
  { id: 'A4', label: '초등학교 4학년', group: '초등' },
  { id: 'A5', label: '초등학교 5학년', group: '초등' },
  { id: 'A6', label: '초등학교 6학년', group: '초등' },
  { id: 'B1', label: '중학교 1학년', group: '중등' },
  { id: 'B2', label: '중학교 2학년', group: '중등' },
  { id: 'B3', label: '중학교 3학년', group: '중등' },
];
  
export default function LevelTestPage() {
    const [authChecked, setAuthChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setIsLoggedIn(!!user);
        setAuthChecked(true);
    };
    checkAuth();
    }, []);
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const elementary = grades.filter(g => g.group === '초등');
  const middle = grades.filter(g => g.group === '중등');

  const handleStart = () => {
    if (!selected) return;
    router.push(`/level-test/${selected.toLowerCase()}`);
  };
  if (!authChecked) return null;

    if (!isLoggedIn) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-slate-100">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">로그인이 필요해요</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
            레벨 테스트는 회원만 이용할 수 있어요.<br />
            로그인 후 이용해주세요.
            </p>
            <div className="flex flex-col gap-3">
            <Link href="/login"
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition text-center">
                로그인하러 가기
            </Link>
            <button onClick={() => router.back()}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-lg hover:bg-slate-200 transition cursor-pointer">
                돌아가기
            </button>
            </div>
        </div>
        </div>
    );
    }
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* 헤더 */}
        <div className="text-center mb-14">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Level Test</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">레벨 테스트</h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            아이의 현재 영어 실력을 정확하게 파악하고<br />
            딱 맞는 수업 레벨을 찾아드립니다.
          </p>
        </div>

        {/* 안내 카드 */}
        <div className="bg-blue-600 rounded-[2rem] p-8 text-white mb-10 shadow-xl shadow-blue-200">
          <h3 className="text-lg font-black mb-4">테스트 안내</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-50 text-sm">
            <div className="flex items-start gap-3">
              <span className="bg-white/20 w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs">1</span>
              <span>학년을 선택해주세요</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-white/20 w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs">2</span>
              <span>학년별 맞춤 문제를 풀어보세요</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-white/20 w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs">3</span>
              <span>결과에 따라 최적 레벨을 안내드려요</span>
            </div>
          </div>
        </div>

        {/* 학년 선택 */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-6">학년을 선택해주세요</h2>

          {/* 초등 */}
          <div className="mb-8">
            <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">초등학교 (A1 – A6)</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {elementary.map(g => (
                <button
                  key={g.id}
                  onClick={() => setSelected(g.id)}
                  className={`py-4 px-4 rounded-2xl border-2 font-bold text-sm transition-all duration-200 cursor-pointer ${
                    selected === g.id
                      ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span className="block text-xs font-black mb-0.5 opacity-70">{g.id}</span>
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* 중등 */}
          <div className="mb-10">
            <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">중학교 (B1 – B3)</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {middle.map(g => (
                <button
                  key={g.id}
                  onClick={() => setSelected(g.id)}
                  className={`py-4 px-4 rounded-2xl border-2 font-bold text-sm transition-all duration-200 cursor-pointer ${
                    selected === g.id
                      ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span className="block text-xs font-black mb-0.5 opacity-70">{g.id}</span>
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* 시작 버튼 */}
          <button
            onClick={handleStart}
            disabled={!selected}
            className={`w-full py-5 rounded-2xl text-xl font-black transition-all duration-300 transform shadow-lg ${
              selected
                ? 'bg-slate-900 text-white hover:bg-blue-600 hover:-translate-y-1 shadow-slate-200 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {selected
              ? `${grades.find(g => g.id === selected)?.label} 테스트 시작하기 →`
              : '학년을 먼저 선택해주세요'
            }
          </button>

          <p className="text-center text-slate-400 text-xs mt-4">
            * 테스트는 약 10~15분 소요됩니다.
          </p>
        </div>

        {/* 하단 상담 유도 */}
        <div className="text-center mt-10">
          <p className="text-slate-500 text-sm mb-2">테스트보다 직접 상담을 원하신다면?</p>
          <Link href="/consultation" className="text-blue-600 font-bold hover:underline text-sm">
            전문 선생님과 1:1 상담 신청하기 →
          </Link>
        </div>

      </div>
    </div>
  );
}
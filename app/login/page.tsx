'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('로그인 실패: ' + error.message);
      setIsLoading(false);
      return;
    }

    // ✅ 더 확실하게 새로고침하며 이동
    window.location.replace('/'); 
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-20 px-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
        {/* 로고 및 헤더 */}
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black text-slate-900 tracking-tighter inline-block mb-3">
            THE ARK <span className="text-blue-600">ENGLISH</span>
          </Link>
          <p className="text-slate-500 font-medium">디아크 잉글리시에 오신 것을 환영합니다.</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 font-medium text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">이메일 주소</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
              disabled={isLoading}
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-700">비밀번호</label>
              <Link href="/find-password" className="text-xs text-blue-600 hover:underline">
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={isLoading}
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-5 rounded-2xl text-lg font-black transition-all duration-300 transform shadow-lg shadow-slate-200 ${
              isLoading
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-slate-900 text-white hover:bg-blue-600 hover:-translate-y-1'
            }`}
          >
            {isLoading ? '로그인 중...' : '로그인하기'}
          </button>
        </form>

        {/* 하단 링크 */}
        <div className="text-center mt-10 pt-8 border-t border-slate-100">
          <p className="text-slate-600 mb-2">아직 계정이 없으신가요?</p>
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            신규 회원가입 하러가기 →
          </Link>
        </div>
      </div>

      <p className="text-center text-slate-400 text-xs mt-10">
        © 2024 THE ARK ENGLISH. All rights reserved.
      </p>
    </div>
  );
}
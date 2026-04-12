'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. 비밀번호 일치 확인
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 2. 비밀번호 길이 체크 (Supabase 기본 설정은 6자 이상)
    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);

    try {
      // 3. Supabase 회원가입 호출
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      // 이미 가입된 이메일 체크
      if (data.user && data.user.identities?.length === 0) {
        setError('이미 가입된 이메일입니다. 로그인 페이지로 이동해주세요.');
        setIsLoading(false);
        return;
      }

      if (data.user) {
        alert('회원가입 신청이 완료되었습니다!\n이메일을 확인하여 가입을 승인해주세요.');
        router.push('/login');
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-2">회원가입</h2>
          <p className="text-slate-500">디아크 잉글리시의 가족이 되어주세요.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
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
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="6자 이상 입력"
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="비밀번호 다시 입력"
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-5 rounded-2xl text-lg font-black transition-all duration-300 transform shadow-lg ${
              isLoading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 shadow-blue-100'
            }`}
          >
            {isLoading ? '가입 처리 중...' : '가입하기'}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-slate-100">
          <p className="text-slate-600 mb-2">이미 계정이 있으신가요?</p>
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            로그인 하러가기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
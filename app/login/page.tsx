'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 🔥 handleLogin 수정
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '로그인 실패')
        setIsLoading(false)
        return
      }

      // 🔥 중요: 서버 다시 렌더링
      window.location.href = '/'
    } catch (err) {
      setError('로그인 중 오류 발생')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-10 border border-slate-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-3">다시 오셨군요!</h1>
          <p className="text-slate-500 font-medium">서비스 이용을 위해 로그인해주세요.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">이메일 주소</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border text-slate-700 placeholder:text-slate-300 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">비밀번호</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border text-slate-700 placeholder:text-slate-300 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm font-bold px-4 py-3 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-blue-600 disabled:bg-slate-300 transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
          >
            {isLoading ? '로그인 중...' : '로그인하기'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 font-medium mb-4">아직 계정이 없으신가요?</p>
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            1초 만에 회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
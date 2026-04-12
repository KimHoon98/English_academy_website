'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function FindPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (resetError) {
      setError('이메일 발송에 실패했습니다. 다시 시도해주세요.');
      setIsLoading(false);
      return;
    }

    setIsSent(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
        
        {isSent ? (
          // 이메일 발송 완료 화면
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">이메일을 확인해주세요</h2>
            <p className="text-slate-500 leading-relaxed mb-2">
              <span className="font-bold text-slate-900">{email}</span>으로
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              비밀번호 재설정 링크를 보내드렸어요.<br />
              메일함을 확인해주세요.
            </p>
            <p className="text-sm text-slate-400 mb-8">
              이메일이 오지 않으면 스팸함을 확인하거나<br />잠시 후 다시 시도해주세요.
            </p>
            <button
              onClick={() => { setIsSent(false); setEmail(''); }}
              className="text-blue-600 font-bold hover:underline text-sm"
            >
              다른 이메일로 다시 시도하기
            </button>
          </div>
        ) : (
          // 이메일 입력 화면
          <>
            <div className="text-center mb-10">
              <Link href="/" className="text-3xl font-black text-slate-900 tracking-tighter inline-block mb-3">
                THE ARK <span className="text-blue-600">ENGLISH</span>
              </Link>
              <h2 className="text-xl font-black text-slate-900 mt-4 mb-2">비밀번호 찾기</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                가입하신 이메일 주소를 입력하시면<br />
                비밀번호 재설정 링크를 보내드려요.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="가입하신 이메일을 입력해주세요"
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
                {isLoading ? '발송 중...' : '재설정 링크 보내기'}
              </button>
            </form>

            <div className="text-center mt-8 pt-6 border-t border-slate-100">
              <Link href="/login" className="text-blue-600 font-bold hover:underline text-sm">
                ← 로그인으로 돌아가기
              </Link>
            </div>
          </>
        )}
      </div>

      <p className="text-center text-slate-400 text-xs mt-10">
        © 2024 THE ARK ENGLISH. All rights reserved.
      </p>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 상태
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 확인용 보기 상태
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    });

    if (updateError) {
      // 기본 메시지 설정
      let errorMessage = '비밀번호 변경에 실패했습니다.';

      // Supabase가 보내는 영어 문구에 따라 한글로 변환
      if (updateError.message.includes('should be different')) {
        errorMessage = '이전과 동일한 비밀번호는 사용할 수 없습니다.';
      } else if (updateError.message.includes('at least 6 characters')) {
        errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
      } else if (updateError.status === 401 || updateError.message.includes('session')) {
        errorMessage = '인증 세션이 만료되었습니다. 다시 시도해주세요.';
      }

      setError(errorMessage);
      setIsLoading(false);
      return;
    }

    alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
        <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">새 비밀번호 설정</h2>
        
        <form onSubmit={handleReset} className="space-y-6">
          {error && <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-100">{error}</div>}
          
          {/* 새 비밀번호 입력 */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">새 비밀번호</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="6자 이상 입력"
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl grayscale hover:grayscale-0 transition"
              >
                {showPassword ? '🧐' : '🫣'}
              </button>
            </div>
          </div>

          {/* 비밀번호 확인 입력 */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호 확인</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="한 번 더 입력"
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl grayscale hover:grayscale-0 transition"
              >
                {showConfirmPassword ? '🧐' : '🫣'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 disabled:bg-slate-400"
          >
            {isLoading ? '변경 중...' : '비밀번호 변경하기'}
          </button>
        </form>
      </div>
    </div>
  );
}
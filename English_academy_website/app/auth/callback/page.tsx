'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const error = searchParams.get('error');
    const errorCode = searchParams.get('error_code');

    if (error || errorCode) {
      setStatus('error');
      return;
    }

    // 해시에서 토큰 처리 (Supabase가 #access_token=... 형식으로 보냄)
    const handleCallback = async () => {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !data.session) {
        // 해시 파라미터로 세션 교환 시도
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          const { error: setError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (setError) {
            setStatus('error');
            return;
          }
        } else {
          setStatus('error');
          return;
        }
      }
      setStatus('success');
    };

    handleCallback();
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium">확인 중입니다...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-slate-100">
          <div className="text-5xl mb-6">😢</div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">링크가 만료됐어요</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            인증 링크가 만료되었거나 이미 사용된 링크예요.<br />
            다시 회원가입을 시도해주세요.
          </p>
          <Link href="/register"
            className="w-full block py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition text-center">
            회원가입 다시 하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-slate-100">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-2xl font-black text-slate-900 mb-3">회원가입 완료!</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          디아크 잉글리시 회원이 되신 것을 환영합니다!<br />
          이제 모든 서비스를 이용하실 수 있어요.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/"
            className="w-full block py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition text-center">
            홈으로 가기
          </Link>
          <Link href="/consultation"
            className="w-full block py-4 bg-blue-50 text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-100 transition text-center">
            상담 신청하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
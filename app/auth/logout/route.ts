import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookieStore = await cookies();

  // 1. 서버 사이드 Supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 서버 액션이나 라우트 핸들러에서 리다이렉트 시 발생하는 쿠키 설정 오류 무시
          }
        },
      },
    }
  );

  // 2. Supabase 세션 삭제 (로그아웃 실행)
  await supabase.auth.signOut();

  // 3. 메인 페이지로 이동 (전체 새로고침 효과를 위해 redirect 사용)
  const requestUrl = new URL(request.url);
  return NextResponse.redirect(requestUrl.origin);
}
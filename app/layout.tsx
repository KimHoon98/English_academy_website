// app/layout.tsx
import './globals.css';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        // ✅ 이 부분이 반드시 있어야 브라우저와 서버의 세션이 동기화됩니다.
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // 서버 컴포넌트 환경에서의 에러는 무시합니다.
          }
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  return (
    <html lang="ko" className="bg-slate-50">
      <body className="antialiased font-sans text-slate-900 flex flex-col min-h-screen bg-slate-50">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-8 py-5 shadow-sm">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">A</div>
              <span>THE ARK <span className="text-blue-600">ENGLISH</span></span>
            </Link>

            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-8 font-bold text-[15px] text-slate-600 mr-4">
                <Link href="/academy" className="hover:text-blue-600 transition">학원 소개</Link>
                <Link href="/consultation" className="hover:text-blue-600 transition">상담 신청하기</Link>
              </div>
              <div className="hidden md:block h-4 w-[1px] bg-slate-200" />
              
              <div className="flex items-center gap-6 font-bold text-[15px]">
                {user ? (
                  <>
                    <Link href="/auth/logout" className="text-red-400 hover:text-red-600 transition">로그아웃</Link>
                    <Link href="/profile" className="text-blue-600 hover:text-blue-800 transition">내 프로필</Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-slate-500 hover:text-slate-900 transition">로그인</Link>
                    <Link href="/register" className="text-slate-500 hover:text-slate-900 transition">회원가입</Link>
                  </>
                )}
              </div>

              <Link href="/consultation">
                <button className="hidden sm:block bg-slate-900 text-white px-7 py-3 rounded-full text-[14px] font-black hover:bg-blue-600 transition shadow-lg shadow-slate-100 active:scale-95">
                  빠른 상담 신청
                </button>
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow pt-24 bg-slate-50 relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}
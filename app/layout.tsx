import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: '디아크 잉글리시 | THE ARK ENGLISH',
  description: '결과로 증명하는 노원구 초·중등 영어 전문 학원',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans text-slate-900 bg-slate-50 antialiased"> {/* antialiased 추가로 폰트 선명도 개선 */}
        {/* 공통 상단 바: h-20(높이)과 z-index를 명확히 함 */}
        <nav className="fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-md border-b z-[100] px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-slate-900 tracking-tighter flex-shrink-0">
            THE ARK <span className="text-blue-600">ENGLISH</span>
          </Link>

          <div className="hidden md:flex gap-10 font-bold text-sm text-slate-700">
            <Link href="/academy" className="hover:text-blue-600 transition">학원 소개</Link>
            <Link href="/academy/programs" className="hover:text-blue-600 transition">수강 프로그램</Link>
            <Link href="/consultation" className="hover:text-blue-600 transition">상담 신청하기</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition">
              로그인
            </Link>
            <Link href="/consultation">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-blue-700 transition shadow-sm">
                빠른 상담
              </button>
            </Link>
          </div>
        </nav>

        {/* main 태그에 상단 바 높이만큼 여백(pt-20)을 확실히 줌 */}
        <main className="relative z-0 pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

export default async function AdminConsultationsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // 로그인 안 됐으면 로그인 페이지로
  if (!session) redirect('/login');

  // 원장 아니면 프로필로 튕기기
  if (session.user.email !== 'daniel3954@gmail.com') redirect('/profile');

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <div className="mb-8 flex items-center gap-4">
        <a href="/profile" className="text-slate-400 hover:text-slate-600 transition text-sm font-bold">
          ← 대시보드로 돌아가기
        </a>
      </div>
      <h1 className="text-3xl font-black text-slate-900 mb-2">상담 신청 내역</h1>
      <p className="text-slate-500 mb-10">최근 1년간 접수된 모든 상담 신청을 확인하고 답변할 수 있어요.</p>
      <AdminDashboard />
    </div>
  );
}
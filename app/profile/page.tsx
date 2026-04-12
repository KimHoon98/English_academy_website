import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ProfileClient from '@/components/profile/ProfileClient';
import AdminProfile from '@/components/profile/AdminProfile';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); } } }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const userEmail = session.user.email!;
  const userId = session.user.id;
  const isAdmin = userEmail === 'daniel3954@gmail.com';

  // 프로필 가져오기
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  // 상담 내역
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const { data: consultations } = await supabase
    .from('consultations')
    .select('*')
    .gte('created_at', oneYearAgo.toISOString())
    .order('created_at', { ascending: false });

  if (isAdmin) {
    return <AdminProfile userEmail={userEmail} consultations={consultations ?? []} />;
  }

  // 유저는 본인 상담만
  const { data: myConsultations } = await supabase
    .from('consultations')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', oneYearAgo.toISOString())
    .order('created_at', { ascending: false });

  return (
    <ProfileClient
      userEmail={userEmail}
      userId={userId}
      profile={profile}
      consultations={myConsultations ?? []}
    />
  );
}
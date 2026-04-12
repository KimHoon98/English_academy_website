import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import Image from 'next/image';

type Consultation = {
  id: string;
  created_at: string;
  parent_name: string;
  child_name: string;
  child_grade: string;
  is_resolved: boolean;
  message: string | null;
  user_id: string | null;
};

type Profile = {
  id: string;
  nickname: string | null;
  avatar_url: string | null;
};

export default async function AdminProfile({
  userEmail,
  consultations,
}: {
  userEmail: string;
  consultations: Consultation[];
}) {
  const cookieStore = await cookies();

  // 일반 클라이언트 (profiles 조회용)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); } } }
  );

  // 서비스롤 클라이언트 (유저 목록용)
  const adminSupabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); } } }
  );

  const { data: { users } } = await adminSupabase.auth.admin.listUsers();

  // profiles 테이블에서 닉네임 + 아바타 가져오기
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, nickname, avatar_url');

  // id → profile 맵
  const profileMap: Record<string, Profile> = {};
  profiles?.forEach(p => { profileMap[p.id] = p; });

  // 유저 이메일 맵 (user_id → email)
  const userEmailMap: Record<string, string> = {};
  users?.forEach(u => { if (u.email) userEmailMap[u.id] = u.email; });

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-8">

      {/* 헤더 */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-black">관리자 권한</span>
          <h1 className="text-2xl font-black text-slate-900">Admin Dashboard</h1>
        </div>
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">관리자 계정</p>
          <p className="font-bold text-slate-900">{userEmail}</p>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
          <p className="text-3xl font-black text-slate-900">{users?.length ?? 0}</p>
          <p className="text-sm text-slate-500 mt-1">전체 회원</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
          <p className="text-3xl font-black text-slate-900">{consultations.length}</p>
          <p className="text-sm text-slate-500 mt-1">전체 상담</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-6 border border-red-100 shadow-sm text-center">
          <p className="text-3xl font-black text-red-500">{consultations.filter(c => !c.is_resolved).length}</p>
          <p className="text-sm text-slate-500 mt-1">미처리</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm text-center">
          <p className="text-3xl font-black text-blue-600">{consultations.filter(c => c.is_resolved).length}</p>
          <p className="text-sm text-slate-500 mt-1">처리 완료</p>
        </div>
      </div>

      {/* 회원 목록 */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
        <h2 className="text-xl font-black text-slate-900 mb-6">👥 가입 회원 목록</h2>
        {!users || users.length === 0 ? (
          <p className="text-slate-400 text-center py-8">가입한 회원이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {users.map(u => {
              const profile = profileMap[u.id];
              return (
                <div key={u.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    {/* 아바타 */}
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                      {profile?.avatar_url ? (
                        <Image src={profile.avatar_url} alt="avatar" width={40} height={40} className="object-cover w-full h-full" />
                      ) : (
                        <span className="text-lg">👤</span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        {profile?.nickname ?? '닉네임 없음'}
                        <span className="text-slate-400 font-normal text-sm ml-2">— {u.email}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        가입일: {new Date(u.created_at).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${u.email_confirmed_at ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                    {u.email_confirmed_at ? '인증 완료' : '미인증'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 최근 상담 신청 */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900">📋 최근 상담 신청</h2>
          <Link href="/admin/consultations" className="text-sm font-bold text-blue-600 hover:underline">
            전체 보기 →
          </Link>
        </div>
        {consultations.length === 0 ? (
          <p className="text-slate-400 text-center py-8">아직 상담 신청이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {consultations.slice(0, 5).map(c => {
              const profile = c.user_id ? profileMap[c.user_id] : null;
              const email = c.user_id ? userEmailMap[c.user_id] : null;
              return (
                <div key={c.id} className={`p-5 rounded-2xl border ${c.is_resolved ? 'border-slate-100 bg-white' : 'border-red-100 bg-red-50'}`}>
                  {/* 유저 정보 */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                      {profile?.avatar_url ? (
                        <Image src={profile.avatar_url} alt="avatar" width={32} height={32} className="object-cover w-full h-full" />
                      ) : (
                        <span className="text-sm">👤</span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-700">
                      {profile?.nickname ?? '닉네임 없음'}
                      {email && <span className="text-slate-400 font-normal ml-1">— {email}</span>}
                    </p>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full mr-2 ${c.is_resolved ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-500'}`}>
                        {c.is_resolved ? '처리 완료' : '미처리'}
                      </span>
                      <span className="text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-slate-600 space-y-0.5">
                    <p><span className="font-bold text-slate-700">학부모님 성함:</span> {c.parent_name}</p>
                    <p><span className="font-bold text-slate-700">학생 이름:</span> {c.child_name} ({c.child_grade})</p>
                  </div>

                  {c.message && <p className="text-sm text-slate-500 mt-2 bg-slate-100 p-3 rounded-xl truncate">{c.message}</p>}
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
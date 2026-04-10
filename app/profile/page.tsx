'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import ParentDashboard from '@/components/dashboard/ParentDashboard';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<'admin' | 'parent' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // 임시 로직: 특정 이메일이면 관리자로 판단 (나중에 DB role 컬럼으로 교체)
        if (user.email === '관리자이메일@test.com') {
          setRole('admin');
        } else {
          setRole('parent');
        }
      }
      setLoading(false);
    }
    getUserData();
  }, []);

  if (loading) return <div className="p-10 text-center">불러오는 중...</div>;
  if (!user) return <div className="p-10 text-center">로그인이 필요합니다.</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">
            {role === 'admin' ? '원장님 대시보드' : '학부모 마이페이지'}
          </h1>
          <p className="text-slate-500">{user.email} 계정으로 접속 중</p>
        </header>

        {/* 역할에 따른 컴포넌트 분기 */}
        {role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <ParentDashboard userEmail={user.email} />
        )}
      </div>
    </div>
  );
}
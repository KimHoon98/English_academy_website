'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type Consultation = {
  id: string;
  created_at: string;
  parent_name: string;
  child_name: string;
  child_grade: string;
  phone: string;
  message: string;
  is_resolved: boolean;
  admin_reply: string | null;
  replied_at: string | null;
};

export default function ParentDashboard({ userEmail }: { userEmail: string }) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyConsultations = async () => {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .gte('created_at', oneYearAgo.toISOString())
        .order('created_at', { ascending: false });

      if (!error && data) setConsultations(data);
      setLoading(false);
    };
    fetchMyConsultations();
  }, []);

  if (loading) return <div className="text-center py-10 text-slate-500">불러오는 중...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
          <p className="text-3xl font-black text-slate-900">{consultations.length}</p>
          <p className="text-sm text-slate-500 mt-1">신청한 상담</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm text-center">
          <p className="text-3xl font-black text-blue-600">{consultations.filter(c => c.admin_reply).length}</p>
          <p className="text-sm text-slate-500 mt-1">답변 받은 상담</p>
        </div>
      </div>

      <h2 className="text-xl font-black text-slate-900">📋 상담 신청 내역 (최근 1년)</h2>

      {consultations.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
          <p className="text-slate-400 mb-4">아직 상담 신청 내역이 없습니다.</p>
          <a href="/consultation" className="text-blue-600 font-bold hover:underline">상담 신청하러 가기 →</a>
        </div>
      ) : (
        <div className="space-y-4">
          {consultations.map(c => (
            <div key={c.id} className={`bg-white rounded-2xl p-6 border shadow-sm ${c.admin_reply ? 'border-blue-100' : 'border-slate-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.admin_reply ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                  {c.admin_reply ? '답변 완료' : '답변 대기 중'}
                </span>
                <span className="text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString('ko-KR')}</span>
              </div>
              <p className="font-black text-slate-900">{c.child_name} ({c.child_grade})</p>
              {c.message && <p className="text-sm text-slate-500 mt-2 bg-slate-50 p-3 rounded-xl">{c.message}</p>}
              {c.admin_reply ? (
                <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-xs font-bold text-blue-600 mb-1">✉️ 원장님 답변</p>
                  <p className="text-sm text-slate-700">{c.admin_reply}</p>
                  <p className="text-xs text-slate-400 mt-1">{c.replied_at && new Date(c.replied_at).toLocaleDateString('ko-KR')}</p>
                </div>
              ) : (
                <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-sm text-slate-400">아직 답변이 작성되지 않았습니다. 조금만 기다려주세요!</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
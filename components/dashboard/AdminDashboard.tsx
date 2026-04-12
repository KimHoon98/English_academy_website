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

export default function AdminDashboard() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
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

  const handleReply = async (id: string) => {
    setSubmitting(id);
    const { error } = await supabase
      .from('consultations')
      .update({
        admin_reply: replyText[id],
        is_resolved: true,
        replied_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (!error) {
      await fetchConsultations();
      setReplyText(prev => ({ ...prev, [id]: '' }));
    }
    setSubmitting(null);
  };

  const toggleResolved = async (id: string, current: boolean) => {
    await supabase
      .from('consultations')
      .update({ is_resolved: !current })
      .eq('id', id);
    await fetchConsultations();
  };

  if (loading) return <div className="text-center py-10 text-slate-500">불러오는 중...</div>;

  const resolved = consultations.filter(c => c.is_resolved);
  const unresolved = consultations.filter(c => !c.is_resolved);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
          <p className="text-3xl font-black text-slate-900">{consultations.length}</p>
          <p className="text-sm text-slate-500 mt-1">전체 신청</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-6 border border-red-100 shadow-sm text-center">
          <p className="text-3xl font-black text-red-500">{unresolved.length}</p>
          <p className="text-sm text-slate-500 mt-1">미처리</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm text-center">
          <p className="text-3xl font-black text-blue-600">{resolved.length}</p>
          <p className="text-sm text-slate-500 mt-1">처리 완료</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-black text-slate-900 mb-4">⏳ 미처리 신청 ({unresolved.length})</h2>
        {unresolved.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-100">모든 신청이 처리되었습니다 🎉</div>
        ) : (
          <div className="space-y-4">
            {unresolved.map(c => (
              <ConsultationCard key={c.id} c={c} replyText={replyText} setReplyText={setReplyText}
                submitting={submitting} handleReply={handleReply} toggleResolved={toggleResolved} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-black text-slate-900 mb-4">✅ 처리 완료 ({resolved.length})</h2>
        {resolved.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-100">처리 완료된 신청이 없습니다.</div>
        ) : (
          <div className="space-y-4">
            {resolved.map(c => (
              <ConsultationCard key={c.id} c={c} replyText={replyText} setReplyText={setReplyText}
                submitting={submitting} handleReply={handleReply} toggleResolved={toggleResolved} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ConsultationCard({ c, replyText, setReplyText, submitting, handleReply, toggleResolved }: {
  c: Consultation;
  replyText: { [key: string]: string };
  setReplyText: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  submitting: string | null;
  handleReply: (id: string) => void;
  toggleResolved: (id: string, current: boolean) => void;
}) {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className={`bg-white rounded-2xl p-6 border shadow-sm ${c.is_resolved ? 'border-slate-100' : 'border-red-200'}`}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.is_resolved ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-500'}`}>
              {c.is_resolved ? '처리 완료' : '미처리'}
            </span>
            <span className="text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString('ko-KR')}</span>
          </div>
          <p className="font-black text-slate-900">{c.parent_name} 학부모 · {c.child_name} ({c.child_grade})</p>
          <p className="text-sm text-slate-500 mt-0.5">📞 {c.phone}</p>
          {c.message && <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-3 rounded-xl">{c.message}</p>}
        </div>
        <button onClick={() => toggleResolved(c.id, c.is_resolved)}
          className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition text-slate-600 shrink-0 cursor-pointer">
          {c.is_resolved ? '미처리로 변경' : '완료 처리'}
        </button>
      </div>

      {c.admin_reply && (
        <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-xs font-bold text-blue-600 mb-1">✉️ 작성된 답변</p>
          <p className="text-sm text-slate-700">{c.admin_reply}</p>
          <p className="text-xs text-slate-400 mt-1">{c.replied_at && new Date(c.replied_at).toLocaleDateString('ko-KR')}</p>
        </div>
      )}

      <div className="mt-4">
        {!showReplyBox ? (
          <button onClick={() => setShowReplyBox(true)}
            className="text-sm text-blue-600 font-bold hover:underline cursor-pointer">
            {c.admin_reply ? '답변 수정하기' : '+ 답변 작성하기'}
          </button>
        ) : (
          <div className="space-y-2">
            <textarea rows={3} value={replyText[c.id] ?? c.admin_reply ?? ''}
              onChange={e => setReplyText(prev => ({ ...prev, [c.id]: e.target.value }))}
              placeholder="학부모님께 전달할 답변을 입력하세요."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
            <div className="flex gap-2">
              <button onClick={() => handleReply(c.id)} disabled={submitting === c.id}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer">
                {submitting === c.id ? '저장 중...' : '답변 저장'}
              </button>
              <button onClick={() => setShowReplyBox(false)}
                className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition cursor-pointer">
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
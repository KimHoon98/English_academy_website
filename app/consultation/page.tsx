'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConsultationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    phoneNumber: '',
    childName: '',
    childGrade: '',
    message: '',
  });

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength <= 3) return phoneNumber;
    if (phoneNumberLength <= 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'phoneNumber' ? formatPhoneNumber(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error();

      alert(`${formData.parentName}님, 상담 신청이 정상적으로 접수되었습니다.\n빠른 시일 내에 연락드리겠습니다!`);
      router.push('/');
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Consultation</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">상담 신청하기</h1>
          <p className="text-slate-600 text-lg">
            아이의 영어 고민, 디아크 잉글리시가 함께 나누겠습니다.<br />
            상담 신청을 남겨주시면 24시간 이내에 전문 상담 선생님이 연락드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* 왼쪽: 안내 정보 */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">📞</span> 빠른 유선 상담
              </h3>
              <p className="text-3xl font-black text-slate-900 mb-2">02-123-4567</p>
              <p className="text-slate-500 leading-relaxed">
                평일 오후 1시 ~ 저녁 9시<br />
                토요일 오전 10시 ~ 오후 4시<br />
                (일요일 및 공휴일 휴무)
              </p>
            </div>

            <div className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl shadow-blue-200">
              <h3 className="text-xl font-bold mb-4">입학 테스트 안내</h3>
              <ul className="space-y-4 text-blue-50">
                <li className="flex gap-3">
                  <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
                  <span>상담 신청 접수 확인 및 일정 조율</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
                  <span>학원 방문 및 레벨 테스트 진행 (약 40분)</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
                  <span>테스트 결과 기반 1:1 맞춤 커리큘럼 설계</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 오른쪽: 신청 폼 */}
          <div className="lg:col-span-3 bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">학부모님 성함</label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    placeholder="성함을 입력해주세요"
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">연락처 (숫자만 입력)</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    placeholder="010-0000-0000"
                    maxLength={13}
                    inputMode="numeric"
                    value={formData.phoneNumber}
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">학생 이름</label>
                  <input
                    type="text"
                    name="childName"
                    required
                    placeholder="아이 이름을 입력해주세요"
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">학생 학년</label>
                  <select
                    name="childGrade"
                    required
                    className={`w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      formData.childGrade === '' ? 'text-slate-300' : 'text-slate-900'
                    }`}
                    onChange={handleChange}
                    value={formData.childGrade}
                  >
                    <option value="">학년 선택</option>
                    <option value="초1">초등학교 1학년</option>
                    <option value="초2">초등학교 2학년</option>
                    <option value="초3">초등학교 3학년</option>
                    <option value="초4">초등학교 4학년</option>
                    <option value="초5">초등학교 5학년</option>
                    <option value="초6">초등학교 6학년</option>
                    <option value="중1">중학교 1학년</option>
                    <option value="중2">중학교 2학년</option>
                    <option value="중3">중학교 3학년</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">궁금하신 점 (선택)</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="예: 레벨 테스트 가능한 시간대나 아이의 현재 영어 학습 상태를 적어주세요."
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl text-xl font-black transition-all duration-300 transform shadow-lg shadow-slate-200 ${
                  isSubmitting
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-blue-600 hover:-translate-y-1'
                }`}
              >
                {isSubmitting ? '신청 접수 중...' : '상담 신청 완료하기'}
              </button>

              <p className="text-center text-slate-400 text-xs mt-4">
                * 개인정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
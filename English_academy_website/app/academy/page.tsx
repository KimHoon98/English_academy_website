'use client';

import React from 'react';
import Image from 'next/image';

export default function AcademyAboutPage() {
  return (
    <div className="min-h-screen">
      {/* 1. 페이지 헤더 (Hero) */}
      <section className="pt-32 pb-20 bg-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">About Us</span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            환경이 실력을 만들고,<br />
            진심이 결과를 만듭니다.
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            디아크 잉글리시는 단순한 지식 전달을 넘어, 아이들이 영어라는 날개를 달고 
            더 넓은 세상을 향해 나아갈 수 있는 든든한 방주가 되고자 합니다.
          </p>
        </div>
      </section>

      {/* 2. 원장님 인사말 (CEO Message) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
            {/* 원장님 사진 또는 학원 상징 이미지 */}
            <Image 
              src="/director.jpg"
              alt="디아크 잉글리시 원장님" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              "영어가 아이의 <span className="text-blue-600">자신감</span>이 되는 순간까지"
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed text-lg">
              <p>
                안녕하십니까, 디아크 잉글리시 원장입니다. 중계동에서 아이들을 가르치며 가장 안타까웠던 점은 영어를 '공부'로만 느껴 일찍 지쳐버리는 모습이었습니다.
              </p>
              <p>
                저희는 아이들이 자연스럽게 말문을 열 수 있는 <strong>소수 정예 밀착 케어</strong>와 
                <strong>몰입형 영어 환경</strong>을 고집합니다. 기초부터 탄탄하게, 그리고 즐겁게 배우는 영어가 진짜 실력이 됩니다.
              </p>
              <p className="font-bold text-slate-900 pt-4 text-xl">
                디아크 잉글리시 원장 홍길동
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 학원 핵심 가치 (Core Values) */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">The Ark's Core Value</h2>
            <p className="text-slate-500">디아크 잉글리시가 추구하는 세 가지 교육 원칙입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Personalized", desc: "아이마다 다른 학습 속도와 성향을 고려한 1:1 맞춤 커리큘럼", icon: "🎯" },
              { title: "Immersive", desc: "원어민 강사진과 함께하는 자연스러운 영어 몰입 환경", icon: "🌐" },
              { title: "Result-Oriented", desc: "학교 내신부터 수행평가까지 확실하게 잡는 결과 중심 교육", icon: "📈" }
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition duration-300">
                <div className="text-4xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
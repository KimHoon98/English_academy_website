'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const imageSizes = "(max-width: 768px) 100vw, 50vw";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6 bg-slate-50 text-center">
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold mb-6">
          노원구 초·중등 영어 전문
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6 break-keep">
          결과로 증명하는 영어.<br />
          <span className="text-blue-600">디아크 잉글리시</span>에서 시작하세요.
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          단순한 암기가 아닙니다. 원어민 밀착 케어와 소수 정예 수업으로 
          아이들의 말문이 트이는 최적의 환경을 제공합니다.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-slate-900 text-white px-10 py-4 rounded-xl text-lg font-bold hover:scale-105 transition">
            지금 시작하기
          </button>
          <button className="bg-white border-2 text-slate-900 border-slate-200 px-10 py-4 rounded-xl text-lg font-bold hover:scale-105 hover:bg-slate-50 transition">
            레벨 테스트 예약
          </button>
        </div>
      </section>

      {/* 2. Visual Slider: 학원 분위기 노출 */}
      <section className="py-20 bg-[#4a85d3] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              아이들이 머물고 싶은<br />최적의 학습 공간
            </h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              쾌적한 강의실과 100% 영어 환경을 통해<br />
              자연스럽게 영어를 습득할 수 있도록 설계되었습니다.
            </p>
            <Link href="/academy" className="text-white font-bold border-b-2 border-white pb-1 hover:text-blue-200 hover:border-blue-200 transition">
              공간 소개 더보기 →
            </Link>
          </div>

          <div className="flex-1 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative">
            <Swiper
              spaceBetween={0}
              centeredSlides={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="w-full h-full"
            >
              <SwiperSlide>
                <Image src="/classroom_1.jpg" alt="강의실 전경 1" fill className="object-cover" sizes={imageSizes} priority />
              </SwiperSlide>
              <SwiperSlide>
                <Image src="/classroom_2.jpg" alt="강의실 전경 2" fill className="object-cover" sizes={imageSizes} />
              </SwiperSlide>
              <SwiperSlide>
                <Image src="/classroom_3.jpg" alt="강의실 전경 3" fill className="object-cover" sizes={imageSizes} />
              </SwiperSlide>
              <SwiperSlide>
                <Image src="/classroom_4.jpg" alt="강의실 전경 4" fill className="object-cover" sizes={imageSizes} />
              </SwiperSlide>
              <SwiperSlide>
                <Image src="/hallway_1.jpg" alt="복도 전경" fill className="object-cover" sizes={imageSizes} />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* 3. CTA Section: 빠른 문의 유도 */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl text-slate-900 mx-auto bg-slate-50 rounded-3xl p-12 border border-slate-100">
          <h2 className="text-3xl font-bold mb-4">지금 바로 상담받아보세요</h2>
          <p className="text-slate-500 mb-8">아이의 현재 실력을 진단하고 딱 맞는 커리큘럼을 제안해 드립니다.</p>
          <Link href="/consultation" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
            무료 상담 신청하기
          </Link>
        </div>
      </section>
      {/* 오시는 길 섹션 */}
      <section id="location" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Location</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">오시는 길</h2>
            </div>
            <p className="text-slate-600 font-medium">
              디아크 잉글리시는 중계동 은행사거리 중심에 위치해 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 지도 영역 (2컬럼 차지) */}
            <div className="lg:col-span-2 relative group shadow-2xl rounded-[2rem] overflow-hidden border-8 border-white">
              <div className="w-full h-full relative">
                <Image 
                  src="/Location_academy.png" 
                  alt="디아크 잉글리시 위치 지도"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                {/* 지도 위 오버레이 버튼 */}
                <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <a 
                    href="https://naver.me/5eUcEVcg"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black shadow-2xl hover:bg-blue-600 hover:text-white transition transform hover:-translate-y-1"
                  >
                    네이버 지도로 길찾기
                  </a>
                </div>
              </div>
            </div>

            {/* 정보 카드 영역 (1컬럼 차지) */}
            <div className="flex flex-col gap-6">
              {/* 주소 및 연락처 카드 */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex-1">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">Address</h3>
                    <p className="text-slate-900 font-bold leading-relaxed text-lg">
                      서울특별시 노원구 한글비석로 245<br />
                      유경데파트 5층
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">Contact</h3>
                    <p className="text-2xl font-black text-slate-900">02-123-4567</p>
                    <p className="text-sm text-slate-500 mt-2 font-medium">수업 중일 수 있으니 <span className="text-blue-600">문자</span>를 남겨주세요.</p>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">Parking</h3>
                    <p className="text-slate-700 font-medium text-sm">유경데파트 건물 내 지하 주차장 이용 가능 (무료 주차권 제공)</p>
                  </div>
                </div>
              </div>

              {/* 교통편 안내 카드 */}
              <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl">
                <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6">Transportation</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg text-lg">🚌</div>
                    <div>
                      <p className="font-bold">버스 이용 시</p>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">은행사거리 또는 중계본동 주민센터 정류장 하차</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg text-lg">🚇</div>
                    <div>
                      <p className="font-bold">지하철 이용 시</p>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">상계역(4호선) 혹은 중계역(7호선) 하차 후 버스 환승</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitResult({ success: true, message: '상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.' });
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setSubmitResult({ success: false, message: result.error || '오류가 발생했습니다.' });
      }
    } catch {
      setSubmitResult({ success: false, message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={scrollToTop} className="flex items-center gap-2 cursor-pointer">
            <span className="text-2xl">🚗</span>
            <span className="text-xl font-bold text-gray-800">로켓콜</span>
          </button>
          <div className="flex items-center gap-2">
            <a
              href="https://drive.google.com/file/d/1FGpJjks9asLnWIAS6wd7be0ARZDssLNM/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary-500 text-primary-500 hover:bg-primary-50 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              제안서 보기
            </a>
            <button
              onClick={scrollToForm}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              상담 신청
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-float mb-6">
            <span className="text-6xl">🚀</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            고객 유치,<br />
            <span className="gradient-text">더 이상 고민하지 마세요</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            자동차 딜러를 위한 프리미엄 약속콜 서비스<br />
            <span className="text-gray-400">(신차 딜러 · 중고차 딜러 · 장기렌트 딜러 · 리스 딜러)</span><br />
            <strong className="text-white">확정된 고객만 딱!</strong> 보내드립니다
          </p>
          <button
            onClick={scrollToForm}
            className="bg-primary-500 hover:bg-primary-600 text-white text-lg px-8 py-4 rounded-xl font-bold transition-all animate-pulse-glow"
          >
            지금 바로 상담 신청하기 →
          </button>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary-500">98%</div>
              <div className="text-gray-600 mt-1">약속 성사율</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary-500">5,000+</div>
              <div className="text-gray-600 mt-1">누적 약속 건수</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary-500">300+</div>
              <div className="text-gray-600 mt-1">제휴 딜러</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary-500">4.9</div>
              <div className="text-gray-600 mt-1">딜러 만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            혹시 이런 고민 있으신가요?
          </h2>
          <p className="text-gray-500 text-center mb-12">자동차 딜러분들이 가장 많이 겪는 어려움입니다</p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <div className="text-3xl mb-3">😰</div>
              <h3 className="font-bold text-lg mb-2">연락 두절 고객</h3>
              <p className="text-gray-600">상담 약속 잡아도 당일에 연락이 안 되는 고객이 너무 많아요</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <div className="text-3xl mb-3">🙅</div>
              <h3 className="font-bold text-lg mb-2">구매 의사 없는 고객</h3>
              <p className="text-gray-600">막상 만나보면 그냥 구경만 하려는 사람들이 대부분이에요</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-bold text-lg mb-2">중복 연락</h3>
              <p className="text-gray-600">이미 다른 딜러랑 상담 중인 고객에게 연락하는 경우가 많아요</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="font-bold text-lg mb-2">시간 낭비</h3>
              <p className="text-gray-600">직접 고객 발굴하느라 정작 영업할 시간이 부족해요</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            로켓콜은 다릅니다 🎯
          </h2>
          <p className="text-xl mb-12 opacity-90">
            <strong>2단계 검증 시스템</strong>으로 확정 고객만 보내드립니다
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-bold text-xl mb-3">1차 검증: 구매 의향 확인</h3>
              <p className="opacity-90">전문 TM팀이 고객의 구매 의향, 예산, 희망 차종을 철저히 확인합니다</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-bold text-xl mb-3">2차 검증: 약속 확정</h3>
              <p className="opacity-90">방문 일정을 확정하고, 당일 리마인드 콜까지 진행합니다</p>
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="bg-white text-primary-500 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl font-bold transition-all"
          >
            무료 상담 신청하기 →
          </button>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            로켓콜을 선택해야 하는 이유
          </h2>
          <p className="text-gray-500 text-center mb-12">딜러분들의 성공을 위해 최선을 다합니다</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-bold text-lg mb-2">확정 고객만</h3>
              <p className="text-gray-600">구매 의사가 확실한 고객만 연결해드립니다</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⏱️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">시간 절약</h3>
              <p className="text-gray-600">고객 발굴에 쓰던 시간을 영업에 집중하세요</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="font-bold text-lg mb-2">매출 증대</h3>
              <p className="text-gray-600">양질의 고객으로 계약 성사율이 올라갑니다</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="font-bold text-lg mb-2">중복 방지</h3>
              <p className="text-gray-600">이미 상담 중인 고객은 배정하지 않습니다</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-bold text-lg mb-2">전담 매니저</h3>
              <p className="text-gray-600">담당 매니저가 1:1로 케어해드립니다</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-lg mb-2">합리적 비용</h3>
              <p className="text-gray-600">성과 기반의 합리적인 비용 체계</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            로켓콜 시작하기
          </h2>
          <p className="text-gray-500 text-center mb-12">간단한 4단계로 시작하세요</p>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
                <h3 className="font-bold mb-2">상담 신청</h3>
                <p className="text-gray-600 text-sm">간단한 정보만 입력하세요</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300 text-2xl">→</div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
                <h3 className="font-bold mb-2">니즈 파악</h3>
                <p className="text-gray-600 text-sm">전담 매니저가 연락드립니다</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300 text-2xl">→</div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
                <h3 className="font-bold mb-2">서비스 시작</h3>
                <p className="text-gray-600 text-sm">맞춤 플랜으로 시작합니다</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300 text-2xl">→</div>
            </div>
            <div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
                <h3 className="font-bold mb-2">고객 배정</h3>
                <p className="text-gray-600 text-sm">확정 고객을 보내드립니다</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={scrollToForm}
              className="bg-primary-500 hover:bg-primary-600 text-white text-lg px-8 py-4 rounded-xl font-bold transition-all"
            >
              로켓콜 시작하기 →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            딜러분들의 생생한 후기
          </h2>
          <p className="text-gray-500 text-center mb-12">실제 이용하신 분들의 이야기입니다</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;예전엔 하루에 수십 통 전화해도 약속 잡기 힘들었는데, 로켓콜 쓰고 나서는
                진짜 살 사람만 와요. 계약률이 3배는 올랐습니다.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span>👨</span>
                </div>
                <div>
                  <div className="font-bold">김OO 딜러</div>
                  <div className="text-gray-500 text-sm">현대자동차 | 경력 8년</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;노쇼가 거의 없어요. 확정된 고객만 온다니까 처음엔 반신반의했는데,
                정말 약속 잡힌 고객들이 제때 방문합니다.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span>👩</span>
                </div>
                <div>
                  <div className="font-bold">이OO 딜러</div>
                  <div className="text-gray-500 text-sm">BMW | 경력 5년</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;신입이라 고객 만나기가 어려웠는데, 로켓콜 덕분에 꾸준히 고객 만나고
                실적도 쌓고 있어요. 신입 딜러분들께 강추합니다!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span>👨</span>
                </div>
                <div>
                  <div className="font-bold">박OO 딜러</div>
                  <div className="text-gray-500 text-sm">중고차딜러 | 경력 1년</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            100% 약속 보장제도
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            확정된 고객이 노쇼할 경우, <strong className="text-white">100% 재배정</strong>해드립니다.<br />
            딜러님의 소중한 시간을 로켓콜이 책임집니다.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            로켓콜 상품 안내
          </h2>
          <p className="text-gray-500 text-center mb-12">딜러님의 상황에 맞는 상품을 선택하세요</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border-2 border-primary-500 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-6 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                BEST
              </div>
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">확정 고객 DB</h3>
              <p className="text-gray-600 mb-4">
                구매 의사 확인 완료 + 방문 일정 확정된 고객만 배정
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">✓</span> 2단계 검증 완료
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">✓</span> 방문 일정 확정
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">✓</span> 당일 리마인드 콜
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">✓</span> 노쇼 시 100% 재배정
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">구매 의향 DB</h3>
              <p className="text-gray-600 mb-4">
                차량 구매 의사가 있는 잠재 고객 정보 제공
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">✓</span> 구매 의향 확인
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">✓</span> 희망 차종/예산 정보
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">✓</span> 연락처 정보 제공
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">✓</span> 합리적인 단가
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            무료 상담 신청
          </h2>
          <p className="text-gray-500 text-center mb-8">
            아래 정보를 입력해주시면 전담 매니저가 연락드립니다
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  이름 <span className="text-primary-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="홍길동"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호 <span className="text-primary-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="010-0000-0000"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  상담 문의
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                  placeholder="궁금한 점이나 문의사항을 적어주세요"
                />
              </div>
            </div>

            {submitResult && (
              <div className={`mt-4 p-4 rounded-lg ${submitResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {submitResult.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white text-lg py-4 rounded-xl font-bold transition-all"
            >
              {isSubmitting ? '제출 중...' : '상담 신청하기'}
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              입력하신 정보는 상담 목적으로만 사용되며, 개인정보처리방침에 따라 보호됩니다.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🚗</span>
            <span className="text-xl font-bold text-white">로켓콜</span>
          </div>
          <p className="text-sm">
            자동차 딜러를 위한 프리미엄 약속콜 서비스
          </p>
          <p className="text-sm mt-4">
            © 2024 로켓콜. All rights reserved.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
            상호: 제이코리아, 대표: 이주영, 사업자등록번호: 278-30-01540
          </div>
        </div>
      </footer>
    </main>
  );
}

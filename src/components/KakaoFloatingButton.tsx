'use client';

import Image from 'next/image';

export default function KakaoFloatingButton() {
  return (
    <a
      href="http://pf.kakao.com/_zxfugn/chat"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-110 transform transition-transform"
      aria-label="카카오톡 상담"
    >
      <Image
        src="/카톡_원형_로고.png"
        alt="카카오톡 상담"
        width={56}
        height={56}
        className="rounded-full"
      />
    </a>
  );
}

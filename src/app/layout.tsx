import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "로켓콜 | 자동차 딜러 전문 약속콜 서비스",
  description: "확정된 고객만 딱! 자동차 딜러를 위한 프리미엄 약속콜 서비스. 고객 유치 걱정 끝, 로켓콜이 검증된 고객을 보내드립니다.",
  keywords: "자동차 딜러, 약속콜, 고객 유치, TM, 텔레마케팅, 자동차 영업, 고객 DB",
  openGraph: {
    title: "로켓콜 | 자동차 딜러 전문 약속콜 서비스",
    description: "확정된 고객만 딱! 자동차 딜러를 위한 프리미엄 약속콜 서비스",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

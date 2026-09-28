import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jungbuhealing.netlify.app"),
  title: {
    template: "%s | 중부건마힐링케어",
    default: "중부건마힐링케어 | 대전·청주·세종·천안·전주 마사지 & 힐링 테라피",
  },
  description:
    "대전, 청주, 세종, 천안, 아산, 공주, 계룡, 논산, 옥천, 금산, 익산, 전주 마사지·스파·에스테틱 정보 안내. 타이, 아로마, 스웨디시 힐링 케어 샵 추천 및 예약 가이드.",
  keywords: [
    "중부건마힐링케어",
    "대전마사지",
    "청주마사지",
    "세종마사지",
    "천안마사지",
    "아산마사지",
    "공주마사지",
    "계룡마사지",
    "논산마사지",
    "옥천마사지",
    "금산마사지",
    "익산마사지",
    "전주마사지",
    "스파",
    "아로마테라피",
    "스웨디시",
    "타이마사지",
    "바디케어",
  ],
  alternates: {
    canonical: "https://jungbuhealing.netlify.app",
  },
  openGraph: {
    title: "중부건마힐링케어 | 중부권 마사지 & 힐링 케어 플랫폼",
    description:
      "대전·청주·세종·충청·전북 전 지역 마사지, 스파, 아로마 테라피 힐링 샵 엄선 정보 안내.",
    url: "https://jungbuhealing.netlify.app",
    siteName: "중부건마힐링케어",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "LA_pPxDDG8woTpUkC-go8lX1KK6GvlR9z0izx4KkUMM",
    other: {
      "naver-site-verification": "82adf43836ecf406bc29b138d2ebacb1e096c8e4",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
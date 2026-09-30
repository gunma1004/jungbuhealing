import Link from "next/link";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

export const SEO_PATTERNS = [
  { t: "출장 힐링 마사지 & 바디 스파", d: "출장 마사지 전문 안내. 엄선된 힐링 테라피 샵 정보 및 코스별 정찰제 가격 비교." },
  { t: "출장 센슈얼 마사지 & 프리미엄 림프", d: "출장 마사지 추천 코스. 부드러운 감성 릴렉싱과 쾌적한 전신 바디 컨디셔닝 케어." },
  { t: "출장 스웨디시 마사지 & 딥 릴렉스", d: "출장 마사지 예약 안내. 섬세한 림프 순환 케어와 안락한 프라이빗 룸 완비 매장." },
  { t: "출장 아로마 마사지 & 에센셜 케어", d: "출장 마사지 제휴 정보. 천연 에센셜 오일로 피로를 녹여내는 아로마 테라피 프로그램." },
  { t: "출장 딥티슈 마사지 & 근육 이완", d: "출장 마사지 이용 안내. 속근육까지 전달되는 섬세한 수기 기법으로 긴장감 해소." },
  { t: "출장 힐링 테라피 마사지 명가", d: "출장 마사지 정식 등록 매장. 숙련된 테라피스트의 정성 어린 수기 관리를 안내합니다." }
];

export function getSeoPattern(seedText: string) {
  let hash = 0;
  for (let i = 0; i < seedText.length; i++) {
    hash = seedText.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % SEO_PATTERNS.length;
  return SEO_PATTERNS[index];
}

function getCityContent(cityName: string, patternDesc: string) {
  let hash = 0;
  for (let i = 0; i < cityName.length; i++) {
    hash = cityName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const absHash = Math.abs(hash);

  const bodies = [
    `핵심 중심지인 ${cityName} 전 지역을 아우르는 프리미엄 홈케어 서비스 네트워크입니다. ${patternDesc} 바쁜 현대인들의 라이프스타일에 맞춰 ${cityName} 내 어디든 30분 이내 방문을 목표로 운영되고 있습니다. 철저한 매니저 교육과 내상 없는 정찰제 시스템으로 최상의 만족도를 제공합니다.`,
    `${cityName} 1등 테라피 플랫폼에 오신 것을 환영합니다. 퇴근 후 피로가 몰려올 때, 자택이나 머무시는 숙소(호텔, 오피스텔 등)에서 편안하게 ${cityName} 최고 수준의 힐링을 경험하세요. 검증된 전문 테라피스트들이 고객님의 지친 심신을 부드럽게 어루만져 드립니다.`,
    `다양한 비즈니스와 휴식이 공존하는 ${cityName} 맞춤형 프리미엄 스웨디시 & 홈타이 안내 센터입니다. ${patternDesc} ${cityName} 주요 상권부터 외곽 주거지까지 폭넓은 제휴망을 갖추고 있으며, 선입금 없는 100% 현장 결제 시스템으로 사기 걱정 없이 안전하게 이용하실 수 있습니다.`
  ];

  const faqsList = [
    [
      { q: `${cityName} 전역으로 빠른 방문이 가능한가요?`, a: `네, ${cityName} 시내 중심가는 물론 외곽 지역까지 각 구역별로 제휴된 전문 기사님들이 대기 중이므로 최대한 신속하게 이동하고 있습니다.` },
      { q: `이용 요금은 어떻게 결제하나요?`, a: `선입금을 유도하는 보이스피싱 사기를 원천 차단하기 위해, 관리사가 도착한 후 직접 결제하는 100% 후불제(현금, 계좌이체 등)로만 진행됩니다.` }
    ],
    [
      { q: `${cityName} 서비스 이용 전 예약은 필수인가요?`, a: `원활한 배차와 원하시는 코스 진행을 위해 최소 30분~1시간 전 사전 예약을 권장해 드리고 있습니다.` },
      { q: `혼자가 아닌 일행과 함께 받을 수 있나요?`, a: `네, 친구나 지인, 커플 동반 예약도 가능합니다. 다만 실시간 배차 상황에 따라 관리사가 순차적으로 도착할 수 있습니다.` }
    ]
  ];

  return {
    body: bodies[absHash % bodies.length],
    faqs: faqsList[absHash % faqsList.length]
  };
}

export async function generateStaticParams() {
  return Object.keys(CITIES_DATA).map((city) => ({
    city: city,
  }));
}

export const dynamicParams = true;

// ✅ 버그 수정: Promise 타입을 명시적으로 풀어서 받도록 수정
type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const city = params.city;
  const cityInfo = CITIES_DATA[city];

  if (!cityInfo) return {};

  const pattern = getSeoPattern(`${cityInfo.name}_city_seo_v3`);
  const title = `${cityInfo.name} ${pattern.t} | ${BRAND_NAME}`;
  const description = `${cityInfo.name} ${pattern.d}`;
  const url = `${DOMAIN}/${city}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: `${BRAND_NAME} ${cityInfo.name}`, locale: "ko_KR", type: "website" },
  };
}

// ✅ 버그 수정: 컴포넌트 props 타입 구조 완벽 매칭
export default async function CityPage(props: Props) {
  const params = await props.params;
  const city = params.city;
  const cityInfo = CITIES_DATA[city];

  // 404 원인 추적 로그 (터미널에서 확인 가능)
  if (!cityInfo) {
    console.log("🚨 [CityPage 404] 찾을 수 없는 city 파라미터:", city);
    console.log("💡 현재 CITIES_DATA 등록 키:", Object.keys(CITIES_DATA).join(", "));
    return notFound();
  }

  const pattern = getSeoPattern(`${cityInfo.name}_city_seo_v3`);
  const cityContent = getCityContent(cityInfo.name, pattern.d);

  return (
    <div className="bg-[#0b0914] text-white font-sans min-h-screen relative overflow-x-hidden pb-32">
      <header className="sticky top-0 z-40 bg-[#0b0914]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span className="w-2.5 h-6 bg-[#00ff88] rounded-full inline-block"></span>
              {BRAND_NAME}
            </span>
          </Link>
          <a href={`tel:${cityInfo.phone}`} className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black bg-[#00ff88]">
            📞 {cityInfo.name} 예약 안내
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[960px] mx-auto text-center">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border border-[#00ff88]/40 bg-[#00ff88]/10 text-[#00ff88]">
          {cityInfo.name.toUpperCase()} HEALING & BODY CARE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black mb-6 word-keep-all">
          {cityInfo.name} {pattern.t}
        </h1>
        
        <div className="text-[#d8d2ea] text-base sm:text-lg mb-12 max-w-[800px] mx-auto leading-loose text-justify break-keep">
          <p>{cityContent.body}</p>
        </div>

        <section className="text-left bg-[#141024] p-6 sm:p-8 rounded-3xl border border-white/10 mb-12 max-w-[850px] mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-[#00ff88]">✓</span> {cityInfo.name} 자주 묻는 질문
          </h3>
          <div className="space-y-4">
            {cityContent.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="font-bold mb-1.5 text-base text-[#00ff88]">Q. {faq.q}</p>
                <p className="text-sm text-gray-300 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5 text-left text-gray-200 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#00ff88] rounded-full"></span>
            📍 {cityInfo.name} 구·지역별 리스트
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {cityInfo.districts.map((district) => {
              const districtPattern = getSeoPattern(`${cityInfo.name}_${district.name}_district_seo`);
              return (
                <div key={district.slug} className="p-5 rounded-2xl bg-[#141024] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{district.name} {districtPattern.t}</h3>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{district.name} {districtPattern.d}</p>
                    </div>
                    <Link href={`/${city}/${district.slug}`} className="text-xs font-bold text-[#00ff88] shrink-0 ml-2">상세보기 →</Link>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {district.dongs.map((dong) => {
                      const dongPattern = getSeoPattern(`${cityInfo.name}_${district.name}_${dong.name}_dong_seo`);
                      return (
                        <Link
                          key={dong.slug}
                          href={`/${city}/${district.slug}/${dong.slug}`}
                          className="py-2.5 px-2 text-center rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-semibold truncate hover:text-[#00ff88] hover:border-[#00ff88]"
                          title={`${dong.name} ${dongPattern.t}`}
                        >
                          {dong.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[480px] bg-[#0b0914]/95 backdrop-blur-xl border border-white/20 p-2.5 rounded-2xl shadow-2xl z-50">
        <a href={`tel:${cityInfo.phone}`} className="py-3 rounded-xl font-black text-black bg-[#00ff88] text-sm flex justify-center gap-1">
          📞 {cityInfo.name} 상담 ({cityInfo.phone})
        </a>
      </div>
    </div>
  );
}
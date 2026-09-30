import Link from "next/link";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

// 50개 SEO 패턴 자체 내장 (단독 실행 보장)
export const SEO_PATTERNS = [
  { t: "출장 힐링 마사지 & 바디 스파", d: "출장 마사지 전문 안내. 엄선된 힐링 테라피 샵 정보 및 코스별 정찰제 가격 비교." },
  { t: "출장 센슈얼 마사지 & 프리미엄 림프", d: "출장 마사지 추천 코스. 부드러운 감성 릴렉싱과 쾌적한 전신 바디 컨디셔닝 케어." },
  { t: "출장 스웨디시 마사지 & 딥 릴렉스", d: "출장 마사지 예약 안내. 섬세한 림프 순환 케어와 안락한 프라이빗 룸 완비 매장." },
  { t: "출장 아로마 마사지 & 에센셜 케어", d: "출장 마사지 제휴 정보. 천연 에센셜 오일로 피로를 녹여내는 아로마 테라피 프로그램." },
  // ... (사용자님이 작성하신 50개 패턴 그대로 유지 - 지면상 생략 없이 모두 넣으셔도 됩니다)
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

// 1. 구 단위 정적 경로 등록
export async function generateStaticParams() {
  const paths: { city: string; district: string }[] = [];

  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    city.districts.forEach((district) => {
      paths.push({
        city: citySlug,
        district: district.slug,
      });
    });
  });

  return paths;
}

export const dynamicParams = true;

// 2. 구 단위 SEO 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string }> | { city: string; district: string };
}) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;

  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);

  if (!cityInfo || !districtInfo) return {};

  const areaFullName = `${cityInfo.name} ${districtInfo.name}`;
  const pattern = getSeoPattern(`${areaFullName}_district_seo`);

  const title = `${areaFullName} ${pattern.t} | ${BRAND_NAME}`;
  const description = `${areaFullName} ${pattern.d}`;
  const url = `${DOMAIN}/${city}/${district}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${areaFullName}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

// 구(District) 전용 고유 본문 및 FAQ 생성 헬퍼
function getDistrictContent(cityName: string, districtName: string, patternDesc: string) {
  let hash = 0;
  for (let i = 0; i < districtName.length; i++) {
    hash = districtName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const absHash = Math.abs(hash);

  const bodies = [
    `${cityName} ${districtName} 전 지역을 아우르는 프리미엄 출장 케어 서비스입니다. ${patternDesc} 바쁜 일상에 지친 고객님들을 위해 ${districtName} 어디든 30분 이내에 빠르게 방문하여 최상의 휴식을 선사합니다. 검증된 전문 테라피스트의 손길로 뭉친 근육과 스트레스를 한 번에 날려보세요.`,
    `${cityName} ${districtName}에서 믿고 부를 수 있는 안심 출장 마사지 가이드입니다. 퇴근 후 집이나 머무시는 숙소(호텔, 모텔 등)에서 편안하게 ${districtName} 최고 수준의 힐링을 경험해 보시길 바랍니다. 내상 없는 철저한 관리 시스템과 정찰제 요금을 준수합니다.`,
    `다양한 상권과 주거지가 밀집한 ${cityName} ${districtName} 맞춤형 홈타이 & 스웨디시 안내 센터입니다. ${patternDesc} ${districtName} 내 전 지역에 빠른 이동망을 구축하여 기다림 없는 신속한 방문을 약속드립니다. 투명한 요금제와 차별화된 친절 마인드로 힐링의 시간을 완성해 드립니다.`
  ];

  const faqsList = [
    [
      { q: `${districtName} 전 지역 방문이 가능한가요?`, a: `네, ${districtName} 내 주요 동은 물론 외곽 주거 지역이나 숙박업소까지 모두 30분 내외로 신속하게 방문 가능합니다.` },
      { q: `결제 방식은 어떻게 되나요?`, a: `선입금 사기 피해를 방지하기 위해 100% 현장 후불제(현금, 계좌이체 등)로만 운영되고 있으니 안심하고 이용하세요.` }
    ],
    [
      { q: `${districtName} 매니저님들의 실력은 어떤가요?`, a: `전원 체계적인 마사지 교육을 이수한 20대 전문 테라피스트들로 구성되어 있어 차원이 다른 감성 케어를 제공합니다.` },
      { q: `영업시간은 어떻게 되나요?`, a: `고객님들의 편의를 위해 365일 연중무휴, 24시간 주야간 교대 시스템으로 상시 운영되고 있습니다.` }
    ]
  ];

  return {
    body: bodies[absHash % bodies.length],
    faqs: faqsList[absHash % faqsList.length]
  };
}

// 3. 구 페이지 본문
export default async function DistrictPage({
  params,
}: {
  params: Promise<{ city: string; district: string }> | { city: string; district: string };
}) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;

  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);

  if (!cityInfo || !districtInfo) return notFound();

  const areaFullName = `${cityInfo.name} ${districtInfo.name}`;
  const pattern = getSeoPattern(`${areaFullName}_district_seo`);
  
  // 구 단위 고유 텍스트 및 FAQ 가져오기
  const districtContent = getDistrictContent(cityInfo.name, districtInfo.name, pattern.d);

  return (
    <div className="bg-[#0b0914] text-white font-sans min-h-screen relative overflow-x-hidden pb-32">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-[#0b0914]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span className="w-2.5 h-6 bg-[#00ff88] rounded-full inline-block"></span>
              {BRAND_NAME}
            </span>
          </Link>
          <a
            href={`tel:${cityInfo.phone}`}
            className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black bg-[#00ff88] transition-transform hover:scale-105"
          >
            📞 {districtInfo.name} 예약 문의
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[960px] mx-auto text-center">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border border-[#00ff88]/40 bg-[#00ff88]/10 text-[#00ff88]">
          {areaFullName.toUpperCase()} HEALING & BODY CARE
        </span>

        {/* H1: 패턴 기반 타이틀 매핑 */}
        <h1 className="text-3xl sm:text-5xl font-black mb-6 word-keep-all">
          {areaFullName} {pattern.t}
        </h1>

        {/* 핵심 수정 1: 네이버 봇이 읽을 구 단위 고유 본문 텍스트 */}
        <div className="text-[#d8d2ea] text-base sm:text-lg mb-12 max-w-[750px] mx-auto leading-loose text-justify break-keep">
          <p>{districtContent.body}</p>
        </div>

        {/* 핵심 수정 2: 구 단위 고유 FAQ 추가 */}
        <section className="text-left bg-[#141024] p-6 sm:p-8 rounded-3xl border border-white/10 mb-12 max-w-[800px] mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-[#00ff88]">✓</span> {districtInfo.name} 자주 묻는 질문
          </h3>
          <div className="space-y-4">
            {districtContent.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="font-bold mb-1.5 text-base text-[#00ff88]">Q. {faq.q}</p>
                <p className="text-sm text-gray-300 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 동별 목록 */}
        <section className="mb-12 text-left">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#00ff88] rounded-full"></span>
              📍 {districtInfo.name} 동별 맞춤 서비스 선택
            </h2>
            <Link
              href={`/${city}`}
              className="text-xs text-gray-400 hover:text-white underline"
            >
              ← {cityInfo.name} 시 전체보기
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {districtInfo.dongs.map((dong) => {
              // 핵심 수정 3: data.ts에서 미리 만들어둔 고유 텍스트가 있다면 그것을 우선 사용
              const dongHeading = dong.contentHeading || `${dong.name} 출장 마사지`;
              const dongDesc = dong.seoDesc || `${dong.name} 전 지역 30분 신속 방문 및 프리미엄 케어.`;
              
              return (
                <Link
                  key={dong.slug}
                  href={`/${city}/${district}/${dong.slug}`}
                  className="p-5 rounded-2xl bg-[#141024] border border-white/10 hover:border-[#00ff88]/50 transition-all block group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-white text-base group-hover:text-[#00ff88] transition-colors truncate">
                      {dongHeading}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-white font-bold whitespace-nowrap ml-2">바로가기 →</span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{dongDesc}</p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      {/* 모바일 하단 고정바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[480px] bg-[#0b0914]/95 backdrop-blur-xl border border-white/20 p-2.5 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black bg-[#00ff88] text-sm flex items-center justify-center gap-1 active:scale-95 transition-all shadow-lg"
        >
          📞 {districtInfo.name} 빠른 예약 연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}
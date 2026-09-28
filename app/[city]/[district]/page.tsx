import Link from "next/link";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

// 50개 SEO 패턴 자체 내장 (단독 실행 보장)
export const SEO_PATTERNS = [
  { t: "출장 힐링 마사지 & 바디 스파", d: "출장 마사지 전문 안내. 엄선된 힐링 테라피 샵 정보 및 코스별 정찰제 가격 비교." },
  { t: "출장 센슈얼 마사지 & 프리미엄 림프", d: "출장 마사지 추천 코스. 부드러운 감성 릴렉싱과 쾌적한 전신 바디 컨디셔닝 케어." },
  { t: "출장 스웨디시 마사지 & 딥 릴렉스", d: "출장 마사지 예약 안내. 섬세한 림프 순환 케어와 안락한 프라이빗 룸 완비 매장." },
  { t: "출장 아로마 마사지 & 에센셜 케어", d: "출장 마사지 제휴 정보. 천연 에센셜 오일로 피로를 녹여내는 아로마 테라피 프로그램." },
  { t: "출장 건식 마사지 & 정통 스트레칭", d: "출장 마사지 가이드. 굳어있던 전신 근육을 시원하게 풀어주는 맞춤 건식 스트레칭." },
  { t: "출장 테라피 마사지 & 바디 밸런스", d: "출장 마사지 프로그램 안내. 무너진 신체 밸런스를 바로잡아주는 체계적인 전문 관리." },
  { t: "출장 힐링 스파 마사지 추천", d: "출장 마사지 엄선 리스트. 도심 속 안락한 휴식을 선사하는 고품격 스파 코스 안내." },
  { t: "출장 림프 마사지 & 웰니스 테라피", d: "출장 마사지 코스 안내. 가볍고 상쾌한 몸 상태를 유지해주는 순환 집중 케어." },
  { t: "출장 타이 마사지 & 피로회복 케어", d: "출장 마사지 전문 매장 안내. 정통 수기 압으로 전신의 묵은 피로를 말끔히 완화." },
  { t: "출장 바디 마사지 & 전신 릴렉싱", d: "출장 마사지 상세 정보. 지친 일상 속에서 온전히 나만을 위해 누리는 프라이빗 휴식." },
  { t: "출장 센슈얼 힐링 마사지 케어", d: "출장 마사지 힐링 안내. 따뜻한 감성과 부드러운 손길로 긴장된 신경을 풀어주는 케어." },
  { t: "출장 프리미엄 마사지 & 감성 에스테틱", d: "출장 마사지 프리미엄 안내. 호텔급 청결함과 정갈한 맞춤 매뉴얼을 준수하는 샵 정보." },
  { t: "출장 힐링 릴렉스 마사지 센터", d: "출장 마사지 실시간 상담. 일상의 과도한 스트레스를 부드럽게 완화해 드리는 테라피." },
  { t: "출장 소프트 마사지 & 스웨디시 코스", d: "출장 마사지 추천 가이드. 강한 압 대신 은은하고 부드러운 압으로 전신을 감싸는 케어." },
  { t: "출장 오일 마사지 & 보습 힐링 케어", d: "출장 마사지 샵 리스트. 건조하고 결리는 바디를 매끄럽게 가꿔주는 영양 오일 테라피." },
  { t: "출장 집중케어 마사지 & 힐링 솔루션", d: "출장 마사지 맞춤 프로그램. 뻐근한 목과 어깨, 허리를 집중적으로 다뤄주는 코스." },
  { t: "출장 프라이빗 마사지 & 1인 스파 샵", d: "출장 마사지 안심 예약. 독립된 공간에서 독립된 샤워 시설과 함께 즐기는 편안함." },
  { t: "출장 딥티슈 마사지 & 근육 이완", d: "출장 마사지 이용 안내. 속근육까지 전달되는 섬세한 수기 기법으로 긴장감 해소." },
  { t: "출장 힐링 테라피 마사지 명가", d: "출장 마사지 정식 등록 매장. 숙련된 테라피스트의 정성 어린 수기 관리를 안내합니다." },
  { t: "출장 센슈얼 테라피 마사지 코스", d: "출장 마사지 감성 코스 안내. 아늑하고 차분한 무드 속에서 진행되는 딥 릴렉싱 프로그램." },
  { t: "출장 로미로미 마사지 & 힐링 바디", d: "출장 마사지 추천 정보. 리드미컬하고 부드러운 동작으로 전신 피로를 부드럽게 씻어냅니다." },
  { t: "출장 활력충전 마사지 & 컨디셔닝", d: "출장 마사지 활력 가이드. 피로에 지친 분들을 위해 준비된 프리미엄 바디 컨디셔닝." },
  { t: "출장 안심정찰 마사지 & 스파 센터", d: "출장 마사지 정찰제 가격표. 불필요한 추가금 없이 투명하게 공개된 코스 요금 안내." },
  { t: "출장 수기힐링 마사지 & 전신 쉼터", d: "출장 마사지 힐링 추천. 기계 관리가 아닌 손끝으로 전해지는 따뜻한 릴렉스 시간." },
  { t: "출장 감성스웨디시 마사지 케어 샵", d: "출장 마사지 전문 가이드. 림프선을 따라 부드럽게 이어지는 프리미엄 스웨디시 코스." },
  { t: "출장 퇴근길힐링 마사지 & 야간 테라피", d: "출장 마사지 야간 매장 정보. 바쁜 일과를 마치고 여유롭게 피로를 풀 수 있는 쉼터." },
  { t: "출장 웰니스케어 마사지 & 아로마 스파", d: "출장 마사지 건강 케어. 몸과 마음의 안정을 돕는 허브 아로마 테라피 프로그램." },
  { t: "출장 정통스트레칭 마사지 & 바디케어", d: "출장 마사지 체계적 안내. 굳은 관절과 근육을 유연하게 이완시키는 전문 스트레칭." },
  { t: "출장 럭셔리힐링 마사지 & VIP 테라피", d: "출장 마사지 VIP 안내. 쾌적한 룸 환경과 최고급 수입 에센셜 오일을 사용하는 매장." },
  { t: "출장 릴렉세이션 마사지 & 수면 케어", d: "출장 마사지 수면 힐링 안내. 편안한 숙면을 취할 수 있도록 돕는 저자극 릴렉싱." },
  { t: "출장 센슈얼 림프 마사지 & 바디 샵", d: "출장 마사지 림프 관리. 정체된 신체 흐름을 원활하게 돕는 감성 림프 테라피." },
  { t: "출장 전신수기 마사지 & 피로 리셋", d: "출장 마사지 빠른 피로 회복. 뭉친 곳을 정확하게 짚어주는 맞춤 압 조절 테라피." },
  { t: "출장 허브테라피 마사지 & 힐링 스파", d: "출장 마사지 향기 테라피. 은은한 허브 향 속에서 누리는 최상의 심신 힐링 코스." },
  { t: "출장 밸런스케어 마사지 & 힐링 스팟", d: "출장 마사지 전문 비교. 신체 균형을 맞춰주는 꼼꼼한 관리 매뉴얼을 갖춘 매장." },
  { t: "출장 소프트힐링 마사지 & 맞춤 테라피", d: "출장 마사지 힐링 샵 정보. 고객의 컨디션에 맞춰 압 세기를 세심하게 조절하는 샵." },
  { t: "출장 뷰티바디 마사지 & 에스테틱 스파", d: "출장 마사지 에스테틱 안내. 매끄러운 바디 라인과 피부 결 케어를 동시에 만족." },
  { t: "출장 클린안심 마사지 & 1인 힐링 룸", d: "출장 마사지 위생 정보. 정기적인 살균과 소독을 거쳐 안심하고 머무는 청결 룸." },
  { t: "출장 감성릴렉스 마사지 & 스웨디시 샵", d: "출장 마사지 스웨디시 안내. 섬세하고 리드미컬한 터치로 전신 긴장감을 완화." },
  { t: "출장 스페셜케어 마사지 & 전신 테라피", d: "출장 마사지 풀코스 안내. 타이, 아로마, 발 관리를 결합한 종합 힐링 프로그램." },
  { t: "출장 쾌적힐링 마사지 & 바디 솔루션", d: "출장 마사지 매장 추천. 주차 공간과 독립 샤워실을 갖춘 쾌적한 테라피 공간." },
  { t: "출장 모던스파 마사지 & 힐링 테라피", d: "출장 마사지 모던 샵 안내. 세련된 인테리어와 정갈한 응대로 맞이하는 힐링 스팟." },
  { t: "출장 내추럴오일 마사지 & 딥 릴렉스", d: "출장 마사지 순수 테라피. 식물성 베이스 오일을 활용해 피부 자극 없이 부드러운 케어." },
  { t: "출장 원스톱힐링 마사지 & 예약 플랫폼", d: "출장 마사지 통합 정보. 권역별 제휴 매장 위치와 코스, 할인 정보를 한눈에 확인." },
  { t: "출장 활력케어 마사지 & 스트레스 해소", d: "출장 마사지 리프레시 안내. 일상의 번아웃과 누적된 피로를 상쾌하게 비워내는 코스." },
  { t: "출장 정통타이 힐링 마사지 & 수기 센터", d: "출장 마사지 정통 코스. 체계적인 수기 기법을 바탕으로 전신 에너지를 충전." },
  { t: "출장 센슈얼 스웨디시 마사지 & 스파", d: "출장 마사지 감성 힐링 샵. 림프 순환을 돕고 심신을 편안하게 감싸주는 테라피." },
  { t: "출장 딥릴렉싱 마사지 & 바디 컨디셔닝", d: "출장 마사지 정밀 케어. 굳은 관절을 부드럽게 풀고 신체 활력을 되찾아주는 프로그램." },
  { t: "출장 프리미엄힐링 마사지 & 1:1 스파", d: "출장 마사지 1인실 완비 매장. 오직 나만을 위한 집중 케어로 높은 만족도 제공." },
  { t: "출장 맞춤형 바디 마사지 & 힐링 가이드", d: "출장 마사지 맞춤 상담. 이용자 개개인의 몸 상태에 맞춘 최적의 코스 추천." },
  { t: "출장 토탈힐링 마사지 & 종합 테라피", d: "출장 마사지 종합 안내. 중부권 전역의 검증된 우수 매장 정보와 정찰제 요금 비교." }
];

export function getSeoPattern(seedText: string) {
  let hash = 0;
  for (let i = 0; i < seedText.length; i++) {
    hash = seedText.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % SEO_PATTERNS.length;
  return SEO_PATTERNS[index];
}

// 1. 구 단위 정적 경로 등록 (12개 시/군 하위 전 구 매핑)
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

// dynamicParams를 true로 변경하여 정적 목록 외에도 404 없이 즉시 렌더링되도록 보장
export const dynamicParams = true;

// 2. 구 단위 SEO 메타데이터 생성 (Next.js 15/16 await params 적용)
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

// 3. 구 페이지 본문 (Next.js 15/16 await params 적용)
export default async function DistrictPage({
  params,
}: {
  params: Promise<{ city: string; district: string }> | { city: string; district: string };
}) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;

  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);

  // 데이터가 없을 때만 404
  if (!cityInfo || !districtInfo) return notFound();

  const areaFullName = `${cityInfo.name} ${districtInfo.name}`;
  const pattern = getSeoPattern(`${areaFullName}_district_seo`);

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
            📞 {districtInfo.name} 제휴·예약 문의
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[960px] mx-auto text-center">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border border-[#00ff88]/40 bg-[#00ff88]/10 text-[#00ff88]">
          {areaFullName.toUpperCase()} HEALING & BODY CARE
        </span>

        {/* H1: 패턴 기반 타이틀 매핑 */}
        <h1 className="text-3xl sm:text-5xl font-black mb-4">
          {areaFullName} {pattern.t}
        </h1>
        <p className="text-[#d8d2ea] text-base sm:text-lg mb-8 max-w-[700px] mx-auto leading-relaxed">
          {areaFullName} {pattern.d}
        </p>

        {/* 동별 목록 (각 동마다 50개 패턴 분산 적용) */}
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
              const dongPattern = getSeoPattern(`${areaFullName}_${dong.name}_dong_item`);
              return (
                <Link
                  key={dong.slug}
                  href={`/${city}/${district}/${dong.slug}`}
                  className="p-5 rounded-2xl bg-[#141024] border border-white/10 hover:border-[#00ff88]/50 transition-all block group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-white text-base group-hover:text-[#00ff88] transition-colors">
                      {dong.name} {dongPattern.t}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-white font-bold">바로가기 →</span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">{dong.name} {dongPattern.d}</p>
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
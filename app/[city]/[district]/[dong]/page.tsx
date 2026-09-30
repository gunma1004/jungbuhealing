import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME, getKeywordModifier } from "@/app/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const paths: { city: string; district: string; dong: string }[] = [];

  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    city.districts.forEach((district) => {
      district.dongs.forEach((dong) => {
        paths.push({
          city: citySlug,
          district: district.slug,
          dong: dong.slug,
        });
      });
    });
  });

  return paths;
}

export const dynamicParams = false;

// 1. 메타데이터에 data.ts에서 만든 고유 seoTitle, seoDesc 적용
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string; dong: string }>;
}) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  const dongInfo = districtInfo?.dongs.find((d) => d.slug === dong);

  if (!cityInfo || !districtInfo || !dongInfo) return {};

  const areaFullName = `${cityInfo.name} ${districtInfo.name} ${dongInfo.name}`;
  const modifier = getKeywordModifier(areaFullName);

  // data.ts의 데이터 우선 적용, 없을 경우 백폴백
  const title = dongInfo.seoTitle || `${dongInfo.name} 출장 ${modifier.prefix} 마사지 | ${BRAND_NAME} ${cityInfo.name}`;
  const description = dongInfo.seoDesc || `${areaFullName} 24시간 출장 ${modifier.prefix} 마사지 전문. ${modifier.sub}.`;
  const url = `${DOMAIN}/${city}/${district}/${dong}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${dongInfo.name}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongPage({
  params,
}: {
  params: Promise<{ city: string; district: string; dong: string }>;
}) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  const dongInfo = districtInfo?.dongs.find((d) => d.slug === dong);

  if (!cityInfo || !districtInfo || !dongInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const areaFullName = `${cityInfo.name} ${districtInfo.name} ${dongInfo.name}`;
  const modifier = getKeywordModifier(areaFullName);

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* GNB */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt={`${BRAND_NAME} 홈케어`}
              width={300}
              height={80}
              className="h-8 sm:h-10 w-auto object-contain"
              priority
            />
          </Link>
          <a
            href={`tel:${cityInfo.phone}`}
            className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105"
            style={{ backgroundColor: mainColor }}
          >
            📞 {dongInfo.name} 상담 연결
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center">
        <span
          className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border"
          style={{
            color: mainColor,
            borderColor: `${mainColor}40`,
            backgroundColor: `${mainColor}15`,
          }}
        >
          {areaFullName} 24H CARE
        </span>

        {/* 2. H1 제목에 고유 contentHeading 적용 */}
        <h1 className="text-3xl sm:text-5xl font-black mb-6 word-keep-all">
          {dongInfo.contentHeading || `${dongInfo.name} 출장 ${modifier.prefix} 마사지`}
        </h1>
        
        {/* 3. 네이버 봇이 읽을 수 있는 고유 본문 텍스트 (SEO 핵심) */}
        <div className="text-[#e1d9f5] text-base sm:text-lg mb-10 max-w-[700px] mx-auto leading-loose text-justify break-keep">
          <p>{dongInfo.contentBody}</p>
        </div>

        {/* 케어 코스 안내 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-12">
          <div className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-gray-400">PROGRAM 01</span>
            <h3 className="font-extrabold text-white text-base">출장 타이 마사지</h3>
            <p className="text-xs text-gray-300">뭉친 근육을 부드럽게 풀어주는 스트레칭 중심 케어</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-gray-400">PROGRAM 02</span>
            <h3 className="font-extrabold text-white text-base">출장 아로마 마사지</h3>
            <p className="text-xs text-gray-300">천연 아로마 오일로 심신 안정 및 피로 해소</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-gray-400">PROGRAM 03</span>
            <h3 className="font-extrabold text-white text-base">출장 힐링 스웨디시</h3>
            <p className="text-xs text-gray-300">부드러운 터치와 림프 순환을 돕는 프리미엄 케어</p>
          </div>
        </div>

        {/* 4. 고유 FAQ 섹션 추가 (유사문서 회피용 치트키) */}
        {dongInfo.faqs && dongInfo.faqs.length > 0 && (
          <section className="text-left bg-[#140f24] p-6 sm:p-8 rounded-3xl border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">💡</span> {dongInfo.name} 자주 묻는 질문
            </h3>
            <div className="space-y-5">
              {dongInfo.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                  <p className="font-bold mb-2 text-lg" style={{ color: mainColor }}>Q. {faq.question}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">A. {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 인근 다른 동 링크 */}
        <section className="text-left bg-[#140f24] p-6 rounded-3xl border border-white/10">
          <h3 className="text-base font-bold text-white mb-3">
            📍 {districtInfo.name} 인근 다른 지역 안내
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {districtInfo.dongs
              .filter((d) => d.slug !== dong)
              .map((otherDong) => {
                const otherMod = getKeywordModifier(`${cityInfo.name} ${districtInfo.name} ${otherDong.name}`);
                return (
                  <Link
                    key={otherDong.slug}
                    href={`/${city}/${district}/${otherDong.slug}`}
                    className="py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-bold hover:bg-white/20 transition-all truncate text-center"
                  >
                    {otherDong.name} {otherMod.prefix}
                  </Link>
                );
              })}
          </div>
        </section>
      </main>

      {/* 모바일 하단 고정 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {dongInfo.name} 출장 {modifier.prefix} 마사지 문의 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}
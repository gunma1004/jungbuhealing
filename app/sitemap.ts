import { MetadataRoute } from "next";
import { CITIES_DATA, DOMAIN } from "@/app/data";

export default function sitemap(): MetadataRoute.Sitemap {
  // 검색엔진 XML 파싱 표준(ISO 8601 포맷) 적용
  const lastModified = new Date().toISOString();

  // 1. 메인 홈 페이지 (가장 높은 가중치)
  const routes: MetadataRoute.Sitemap = [
    {
      url: DOMAIN,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 2. 12개 시/군 전체 계층 동적 순회 (시 -> 구 -> 동)
  Object.values(CITIES_DATA).forEach((city) => {
    // 2-1. '시' 단위 URL (/daejeon, /cheongju, /cheonan 등)
    routes.push({
      url: `${DOMAIN}/${city.slug}`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    });

    city.districts.forEach((district) => {
      // 2-2. '구' 단위 URL (/daejeon/yuseong 등)
      routes.push({
        url: `${DOMAIN}/${city.slug}/${district.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // 2-3. '동' 단위 세부 URL (/daejeon/yuseong/bongmyeong 등)
      district.dongs.forEach((dong) => {
        routes.push({
          url: `${DOMAIN}/${city.slug}/${district.slug}/${dong.slug}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    });
  });

  return routes;
}
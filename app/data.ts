export interface DongData {
  slug: string;
  name: string;
  seoTitle?: string;
  seoDesc?: string;
  contentHeading?: string;
  contentBody?: string;
}

export interface DistrictData {
  slug: string;
  name: string;
  dongs: DongData[];
}

export interface CityData {
  slug: string;
  name: string;
  phone: string;
  title: string;
  districts: DistrictData[];
}

export const DOMAIN = "https://jungbuhealing.netlify.app";
export const BRAND_NAME = "중부건마힐링케어";

export const CITIES_DATA: Record<string, CityData> = {
  // 1. 대전광역시 (5개구 전역 핵심 상권)
  daejeon: {
    slug: "daejeon",
    name: "대전",
    phone: "0507-1280-3335",
    title: "대전 마사지 & 힐링 스파 안내",
    districts: [
      {
        slug: "yuseong",
        name: "유성구",
        dongs: [
          { slug: "bongmyeong", name: "봉명동" },
          { slug: "guam", name: "구암동" },
          { slug: "gundong", name: "궁동" },
          { slug: "jangdae", name: "장대동" },
          { slug: "sinsung", name: "신성동" },
          { slug: "jeonmin", name: "전민동" },
          { slug: "gwanpyeong", name: "관평동" },
          { slug: "wonsinheung", name: "원신흥동" },
          { slug: "jijok", name: "지족동" },
          { slug: "banseok", name: "반석동" }
        ]
      },
      {
        slug: "seo",
        name: "서구",
        dongs: [
          { slug: "dunsan", name: "둔산동" },
          { slug: "wolpyeong", name: "월평동" },
          { slug: "galma", name: "갈마동" },
          { slug: "tanbang", name: "탄방동" },
          { slug: "gwejeong", name: "괴정동" },
          { slug: "yongmun", name: "용문동" },
          { slug: "gwanjeo", name: "관저동" },
          { slug: "doan", name: "도안동" },
          { slug: "gasuwon", name: "가수원동" },
          { slug: "mannyeon", name: "만년동" }
        ]
      },
      {
        slug: "junggu",
        name: "중구",
        dongs: [
          { slug: "eunhaeng", name: "은행동" },
          { slug: "daeheung", name: "대흥동" },
          { slug: "seonhwa", name: "선화동" },
          { slug: "oryu", name: "오류동" },
          { slug: "taepyeong", name: "태평동" },
          { slug: "yuchoen", name: "유천동" },
          { slug: "munhwa", name: "문화동" }
        ]
      },
      {
        slug: "donggu",
        name: "동구",
        dongs: [
          { slug: "yongjeon", name: "용전동" },
          { slug: "gaya", name: "가양동" },
          { slug: "jayang", name: "자양동" },
          { slug: "hongdo", name: "홍도동" },
          { slug: "panam", name: "판암동" }
        ]
      },
      {
        slug: "daedeok",
        name: "대덕구",
        dongs: [
          { slug: "songchon", name: "송촌동" },
          { slug: "jungni", name: "중리동" },
          { slug: "birae", name: "비래동" },
          { slug: "sintanjin", name: "신탄진동" }
        ]
      }
    ]
  },

  // 2. 청주시 (4개구 전역 핵심 상권)
  cheongju: {
    slug: "cheongju",
    name: "청주",
    phone: "0507-1280-3336",
    title: "청주 마사지 & 스웨디시 정보",
    districts: [
      {
        slug: "heungdeok",
        name: "흥덕구",
        dongs: [
          { slug: "bokdae", name: "복대동" },
          { slug: "gagyeong", name: "가경동" },
          { slug: "biha", name: "비하동" },
          { slug: "bongmyeong-cj", name: "봉명동" },
          { slug: "songjeol", name: "송절동" },
          { slug: "gangseo", name: "강서동" },
          { slug: "osong", name: "오송읍" }
        ]
      },
      {
        slug: "cheongwon",
        name: "청원구",
        dongs: [
          { slug: "yullyang", name: "율량동" },
          { slug: "ochang", name: "오창읍" },
          { slug: "jujung", name: "주중동" },
          { slug: "udam", name: "우암동" },
          { slug: "nae-deok", name: "내덕동" }
        ]
      },
      {
        slug: "sangdang",
        name: "상당구",
        dongs: [
          { slug: "yongam", name: "용암동" },
          { slug: "geumcheon", name: "금천동" },
          { slug: "bukmun", name: "북문로" },
          { slug: "seomun", name: "서문동" },
          { slug: "yeongun", name: "영운동" }
        ]
      },
      {
        slug: "seowon",
        name: "서원구",
        dongs: [
          { slug: "sanchik", name: "산남동" },
          { slug: "bunpyeong", name: "분평동" },
          { slug: "sachang", name: "사창동" },
          { slug: "gae-sin", name: "개신동" },
          { slug: "sugok", name: "수곡동" }
        ]
      }
    ]
  },

  // 3. 세종특별자치시
  sejong: {
    slug: "sejong",
    name: "세종",
    phone: "0507-1280-3335",
    title: "세종 마사지 & 프리미엄 테라피",
    districts: [
      {
        slug: "central",
        name: "도심권",
        dongs: [
          { slug: "naseong", name: "나성동" },
          { slug: "boram", name: "보람동" },
          { slug: "eojin", name: "어진동" },
          { slug: "areum", name: "아름동" },
          { slug: "jongchon", name: "종촌동" },
          { slug: "dodam", name: "도담동" },
          { slug: "dajeong", name: "다정동" },
          { slug: "saerom", name: "새롬동" },
          { slug: "jochiwon", name: "조치원읍" }
        ]
      }
    ]
  },

  // 4. 천안시 (서북구, 동남구)
  cheonan: {
    slug: "cheonan",
    name: "천안",
    phone: "0507-1280-3335",
    title: "천안 마사지 & 에스테틱 포털",
    districts: [
      {
        slug: "seobuk",
        name: "서북구",
        dongs: [
          { slug: "buldang", name: "불당동" },
          { slug: "dujeong", name: "두정동" },
          { slug: "seongjeong", name: "성정동" },
          { slug: "ssangyong", name: "쌍용동" },
          { slug: "baekseok", name: "백석동" },
          { slug: "seongseong", name: "성성동" },
          { slug: "cha-am", name: "차암동" }
        ]
      },
      {
        slug: "dongnam",
        name: "동남구",
        dongs: [
          { slug: "shinbu", name: "신부동" },
          { slug: "cheongsu", name: "청수동" },
          { slug: "cheongdang", name: "청당동" },
          { slug: "bongmyeong-ca", name: "봉명동" },
          { slug: "wonseong", name: "원성동" }
        ]
      }
    ]
  },

  // 5. 아산시
  asan: {
    slug: "asan",
    name: "아산",
    phone: "0507-1280-3335",
    title: "아산 온천 & 마사지 케어",
    districts: [
      {
        slug: "main",
        name: "아산권",
        dongs: [
          { slug: "oncheon", name: "온천동" },
          { slug: "baebang", name: "배방읍" },
          { slug: "tangjeong", name: "탕정면" },
          { slug: "yonghwa", name: "용화동" },
          { slug: "mojong", name: "모종동" },
          { slug: "dungpo", name: "둔포면" }
        ]
      }
    ]
  },

  // 6. 공주시
  gongju: {
    slug: "gongju",
    name: "공주",
    phone: "0507-1280-3335",
    title: "공주 마사지 & 테라피 정보",
    districts: [
      {
        slug: "main",
        name: "공주권",
        dongs: [
          { slug: "singwan", name: "신관동" },
          { slug: "geumheung", name: "금흥동" },
          { slug: "sandeong", name: "산성동" },
          { slug: "jungdong", name: "중동" },
          { slug: "okryong", name: "옥룡동" }
        ]
      }
    ]
  },

  // 7. 계룡시
  gyeryong: {
    slug: "gyeryong",
    name: "계룡",
    phone: "0507-1280-3335",
    title: "계룡 힐링 마사지 & 바디케어",
    districts: [
      {
        slug: "main",
        name: "계룡권",
        dongs: [
          { slug: "eomsa", name: "엄사면" },
          { slug: "geumam", name: "금암동" },
          { slug: "sindoan", name: "신도안면" },
          { slug: "duma", name: "두마면" }
        ]
      }
    ]
  },

  // 8. 논산시
  nonsan: {
    slug: "nonsan",
    name: "논산",
    phone: "0507-1280-3335",
    title: "논산 마사지 & 아로마 테라피",
    districts: [
      {
        slug: "main",
        name: "논산권",
        dongs: [
          { slug: "chwiwon", name: "취암동" },
          { slug: "naedong", name: "내동" },
          { slug: "buhwang", name: "부창동" },
          { slug: "ganggyeong", name: "강경읍" },
          { slug: "yeonmu", name: "연무읍" }
        ]
      }
    ]
  },

  // 9. 옥천군
  okcheon: {
    slug: "okcheon",
    name: "옥천",
    phone: "0507-1280-3336",
    title: "옥천 힐링 마사지 안내",
    districts: [
      {
        slug: "main",
        name: "옥천권",
        dongs: [
          { slug: "okcheon-eup", name: "옥천읍" },
          { slug: "dongi", name: "동이면" },
          { slug: "iweon", name: "이원면" }
        ]
      }
    ]
  },

  // 10. 금산군
  geumsan: {
    slug: "geumsan",
    name: "금산",
    phone: "0507-1280-3335",
    title: "금산 힐링 테라피 & 바디케어",
    districts: [
      {
        slug: "main",
        name: "금산권",
        dongs: [
          { slug: "geumsan-eup", name: "금산읍" },
          { slug: "chubu", name: "추부면" },
          { slug: "jinsan", name: "진산면" }
        ]
      }
    ]
  },

  // 11. 익산시
  iksan: {
    slug: "iksan",
    name: "익산",
    phone: "0507-1280-3335",
    title: "익산 마사지 & 스웨디시 안내",
    districts: [
      {
        slug: "main",
        name: "익산권",
        dongs: [
          { slug: "yeongdeung", name: "영등동" },
          { slug: "mohyeon", name: "모현동" },
          { slug: "sindong", name: "신동" },
          { slug: "eoyang", name: "어양동" },
          { slug: "dongsan", name: "동산동" },
          { slug: "busong", name: "부송동" }
        ]
      }
    ]
  },

  // 12. 전주시 (완산구, 덕진구)
  jeonju: {
    slug: "jeonju",
    name: "전주",
    phone: "0507-1280-3335",
    title: "전주 마사지 & 힐링 에스테틱",
    districts: [
      {
        slug: "wansan",
        name: "완산구",
        dongs: [
          { slug: "hyoja", name: "효자동" },
          { slug: "jungwhasan", name: "중화산동" },
          { slug: "seosin", name: "서신동" },
          { slug: "samcheon", name: "삼천동" },
          { slug: "pyeonghwa", name: "평화동" },
          { slug: "gosan", name: "고사동" }
        ]
      },
      {
        slug: "deokjin",
        name: "덕진구",
        dongs: [
          { slug: "songcheon", name: "송천동" },
          { slug: "injeok", name: "인후동" },
          { slug: "deokjin-dong", name: "덕진동" },
          { slug: "geumam-jj", name: "금암동" },
          { slug: "ujeon", name: "우아동" },
          { slug: "hoban", name: "호성동" },
          { slug: "hyosung", name: "혁신도시" }
        ]
      }
    ]
  }
};
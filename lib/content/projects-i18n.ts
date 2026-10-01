import type { Locale } from "@/i18n";

/**
 * Per-locale text for the 20 projects in lib/projects.ts (keyed by slug).
 * Facts (years, amounts, contract numbers, clients, funders, roles) come from lib/projects.ts,
 * the company presentation (info/, pp. 5–6) and the tender form EXP-4.1 (info/EXP 4.1ST.docx).
 * Only text lives here; numbers, coordinates and status stay in lib/projects.ts.
 * Uzbek is Latin with oʻ/gʻ (U+02BB) and tutuq belgisi ʼ (U+02BC), no Cyrillic: the official contract
 * numbers 25-С and 20-СУВ/ОК-2022 are Cyrillic, so uz text writes them as 25-S / 20-SUV/OK-2022
 * (lib/format.ts contractLabel does the same for the fact table). Village names inside quotes
 * in the Koshrabad contracts are kept exactly as the contract spells them.
 */
export interface ProjectText {
  title: string;
  /** For <title>/og:title only, where the full title is > 55 characters. The H1 keeps `title`. */
  shortTitle?: string;
  location: string;
  client: string;
  funder?: string;
  description: string;
  scope: string[];
  role: string;
}

const ROLE = {
  gc: { uz: "Bosh pudratchi", ru: "Генеральный подрядчик", en: "General contractor", tr: "Ana yüklenici" },
  sub: { uz: "Subpudratchi", ru: "Субподрядчик", en: "Subcontractor", tr: "Alt yüklenici" },
} as const;

const UZKOMMUN = {
  uz: "“Oʻzkommunxizmat” agentligi",
  ru: "Агентство «Узкоммунхизмат»",
  en: "Uzkommunkhizmat Agency",
  tr: "Uzkommunhizmat Ajansı",
} as const;

const OPEC_SAUDI = {
  uz: "Xalqaro taraqqiyot uchun OPEK fondi, Saudiya taraqqiyot fondi",
  ru: "Фонд ОПЕК для международного развития, Саудовский фонд развития",
  en: "OPEC Fund for International Development, Saudi Fund for Development",
  tr: "OPEC Uluslararası Kalkınma Fonu, Suudi Kalkınma Fonu",
} as const;

/** Koshrabad W/3.1 and W/4.1: the deck (p.5, rows 12–13) names the agency, the tender form EXP-4.1 the employer. */
const KOSHRABAD_CLIENT = {
  uz: "“Oʻzkommunxizmat” agentligi; shartnoma boʻyicha buyurtmachi — “Samarqand suv taʼminoti” MChJ",
  ru: "Агентство «Узкоммунхизмат»; заказчик по контракту — ООО «Самарканд сув таъминоти»",
  en: "Uzkommunkhizmat Agency; employer under the contract: Samarqand Suv Ta’minoti LLC",
  tr: "Uzkommunhizmat Ajansı; sözleşmedeki işveren: Samarqand Suv Ta’minoti LLC",
} as const;

const RECLAMATION_FUND = {
  uz: "Oʻzbekiston Respublikasi Moliya vazirligi huzuridagi Sugʻoriladigan yerlarning meliorativ holatini yaxshilash jamgʻarmasi",
  ru: "Фонд мелиоративного улучшения орошаемых земель при Министерстве финансов Республики Узбекистан",
  en: "Irrigated Land Reclamation Fund under the Ministry of Finance of the Republic of Uzbekistan",
  tr: "Özbekistan Cumhuriyeti Maliye Bakanlığı bünyesindeki Sulanan Arazilerin Islahı Fonu",
} as const;

const KASHKADARYA_SCS = {
  uz: "Qashqadaryo viloyati Yagona buyurtmachi xizmati injiniring kompaniyasi",
  ru: "Инжиниринговая компания службы единого заказчика Кашкадарьинской области",
  en: "Engineering Company, Single Customer Service of Kashkadarya Region",
  tr: "Kaşkaderya Vilayeti Tek Müşteri Hizmeti Mühendislik Şirketi",
} as const;

export const projectText: Record<string, Record<Locale, ProjectText>> = {
  "uzgazoil-wells-drilling": {
    uz: {
      title: "Neft burgʻulash qurilmalari uchun 148 ta quduq burgʻulash",
      shortTitle: "148 ta quduq burgʻulash — neft burgʻulash qurilmalari",
      location: "Oʻzbekiston (bir nechta obyekt)",
      client: "“UzGazOil” MChJ / “GISSARNEFTIGAZ” QK",
      description:
        "Neft burgʻulash qurilmalarining texnik ehtiyojlari uchun 148 ta qidiruv va ekspluatatsiya qudugʻini burgʻulash hamda obyektlarda suv taʼminoti tizimlarini qurish. Ishlar hajmiga vaqtinchalik kirish yoʻllari, burgʻulash maydonchalari va vaxta shaharchalari, burgʻulash qurilmasi va yordamchi uskunalar poydevorlarini qurish kirdi.",
      scope: [
        "148 ta qidiruv va ekspluatatsiya qudugʻi",
        "Burgʻulash qurilmalari obyektlarida suv taʼminoti tizimlari",
        "Vaqtinchalik kirish yoʻllari va burgʻulash maydonchalari",
        "Vaxta shaharchalari va burgʻulash qurilmalari poydevorlari",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Бурение 148 скважин для нефтяных буровых установок",
      location: "Узбекистан (несколько объектов)",
      client: "ООО «UzGazOil» / СП «GISSARNEFTIGAZ»",
      description:
        "Бурение 148 разведочных и эксплуатационных скважин для технических нужд нефтяных буровых установок и строительство систем водоснабжения на объектах. В объём работ входило устройство временных подъездных дорог, буровых площадок и вахтовых посёлков, фундаментов под буровую установку и вспомогательное оборудование.",
      scope: [
        "148 разведочных и эксплуатационных скважин",
        "Системы водоснабжения на объектах буровых установок",
        "Временные подъездные дороги и буровые площадки",
        "Вахтовые посёлки и фундаменты буровых установок",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Drilling of 148 Wells for Oil Drilling Rigs",
      location: "Uzbekistan (multiple sites)",
      client: "UzGazOil LLC / GISSARNEFTIGAZ JV",
      description:
        "Drilling of 148 exploration and production wells for the technical needs of oil drilling rigs and construction of water supply systems at the facilities. Scope included construction of temporary access roads, drilling pads, rotational camps, and foundations for drilling rigs and auxiliary equipment.",
      scope: [
        "148 exploration and production wells",
        "Water supply systems at rig facilities",
        "Temporary access roads and drilling pads",
        "Rotational camps and rig foundations",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "Petrol sondaj kuleleri için 148 kuyu açılması",
      location: "Özbekistan (birden fazla saha)",
      client: "UzGazOil LLC / GISSARNEFTIGAZ Ortak Girişimi",
      description:
        "Petrol sondaj kulelerinin teknik ihtiyaçları için 148 arama ve üretim kuyusunun açılması ve tesislerde su temin sistemlerinin inşası. İş kapsamı; geçici erişim yollarını, sondaj sahalarını, vardiya kamplarını, sondaj kulesi ve yardımcı ekipman temellerini içermektedir.",
      scope: [
        "148 arama ve üretim kuyusu",
        "Sondaj tesislerinde su temin sistemleri",
        "Geçici erişim yolları ve sondaj sahaları",
        "Vardiya kampları ve sondaj kulesi temelleri",
      ],
      role: ROLE.gc.tr,
    },
  },

  "bayaut-vertical-drainage-reconstruction": {
    uz: {
      title: "Vertikal drenaj tizimlarini rekonstruksiya qilish — Boyovut tumani",
      shortTitle: "Vertikal drenaj rekonstruksiyasi — Boyovut tumani",
      location: "Boyovut tumani, Sirdaryo viloyati",
      client: RECLAMATION_FUND.uz,
      description:
        "Sirdaryo viloyati Boyovut tumanida qishloq xoʻjaligi yerlarini botqoqlanish va shoʻrlanishdan himoya qilish maqsadida Sugʻoriladigan yerlarning meliorativ holatini yaxshilash jamgʻarmasi dasturi doirasida 12 ta vertikal drenaj qudugʻini rekonstruksiya qilish.",
      scope: [
        "12 ta vertikal drenaj qudugʻi rekonstruksiya qilindi",
        "Nasos va mexanik uskunalarni almashtirish",
        "Elektr taʼminoti va boshqaruv tizimlari",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Реконструкция систем вертикального дренажа — Баяутский район",
      shortTitle: "Реконструкция вертикального дренажа — Баяутский район",
      location: "Баяутский район, Сырдарьинская область",
      client: RECLAMATION_FUND.ru,
      description:
        "Реконструкция 12 скважин вертикального дренажа в Баяутском районе Сырдарьинской области по программе Фонда мелиоративного улучшения орошаемых земель для защиты сельскохозяйственных угодий от подтопления и засоления.",
      scope: [
        "Реконструированы 12 скважин вертикального дренажа",
        "Замена насосного и механического оборудования",
        "Электроснабжение и системы управления",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Reconstruction of Vertical Drainage Systems — Bayaut District",
      shortTitle: "Vertical Drainage Reconstruction — Bayaut District",
      location: "Bayaut District, Syrdarya Region",
      client: RECLAMATION_FUND.en,
      description:
        "Reconstruction of 12 vertical drainage wells in Bayaut district, Syrdarya region, under the Irrigated Land Reclamation Fund programme to protect agricultural land from waterlogging and salinization.",
      scope: [
        "12 vertical drainage wells reconstructed",
        "Pump and mechanical equipment replacement",
        "Electrical and control systems",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "Dikey drenaj sistemlerinin yenilenmesi — Bayavut ilçesi",
      location: "Bayavut ilçesi, Sirderya vilayeti",
      client: RECLAMATION_FUND.tr,
      description:
        "Sirderya vilayeti Bayavut ilçesinde, tarım arazilerini su basması ve tuzlanmaya karşı korumak amacıyla Sulanan Arazilerin Islahı Fonu programı kapsamında 12 dikey drenaj kuyusunun yenilenmesi.",
      scope: [
        "12 dikey drenaj kuyusunun yenilenmesi",
        "Pompa ve mekanik ekipmanların yenilenmesi",
        "Elektrik ve kontrol sistemleri",
      ],
      role: ROLE.gc.tr,
    },
  },

  "bayaut-reclamation-wells-repair": {
    uz: {
      title: "Melioratsiya quduqlarini taʼmirlash va tiklash — Boyovut vertikal drenaji",
      shortTitle: "Melioratsiya quduqlarini taʼmirlash — Boyovut tumani",
      location: "Boyovut tumani, Sirdaryo viloyati",
      client: RECLAMATION_FUND.uz,
      description:
        "Sirdaryo viloyati Boyovut tumanida vertikal drenaj tizimining melioratsiya quduqlarini taʼmirlash va tiklash ishlari. Moliya vazirligi huzuridagi Sugʻoriladigan yerlarning meliorativ holatini yaxshilash jamgʻarmasi buyurtmasi boʻyicha subpudratchi sifatida bajarildi.",
      scope: ["Melioratsiya quduqlarini taʼmirlash va tiklash", "Vertikal drenajni qayta tiklash"],
      role: ROLE.sub.uz,
    },
    ru: {
      title: "Ремонтно-восстановительные работы мелиоративных скважин вертикального дренажа — Баяутский район",
      shortTitle: "Ремонт мелиоративных скважин — Баяутский район",
      location: "Баяутский район, Сырдарьинская область",
      client: RECLAMATION_FUND.ru,
      description:
        "Ремонтно-восстановительные работы мелиоративных скважин вертикального дренажа в Баяутском районе Сырдарьинской области. Выполнены в качестве субподрядчика для Фонда мелиоративного улучшения орошаемых земель при Министерстве финансов.",
      scope: ["Ремонт и восстановление мелиоративных скважин", "Восстановление вертикального дренажа"],
      role: ROLE.sub.ru,
    },
    en: {
      title: "Repair and Restoration of Reclamation Wells — Bayaut Vertical Drainage",
      shortTitle: "Reclamation Well Repair — Bayaut Vertical Drainage",
      location: "Bayaut District, Syrdarya Region",
      client: RECLAMATION_FUND.en,
      description:
        "Repair and restoration works of reclamation wells of the vertical drainage system in Bayaut district, Syrdarya region. Delivered as subcontractor to the Irrigated Land Reclamation Fund under the Ministry of Finance.",
      scope: ["Reclamation well repair and restoration", "Vertical drainage rehabilitation"],
      role: ROLE.sub.en,
    },
    tr: {
      title: "Islah kuyularının onarımı ve restorasyonu — Bayavut dikey drenajı",
      shortTitle: "Islah kuyularının onarımı — Bayavut dikey drenajı",
      location: "Bayavut ilçesi, Sirderya vilayeti",
      client: RECLAMATION_FUND.tr,
      description:
        "Sirderya vilayeti Bayavut ilçesinde dikey drenaj sistemine ait ıslah kuyularının onarım ve restorasyon işleri. Maliye Bakanlığı bünyesindeki Sulanan Arazilerin Islahı Fonu için alt yüklenici olarak gerçekleştirildi.",
      scope: ["Islah kuyularının onarımı ve restorasyonu", "Dikey drenajın rehabilitasyonu"],
      role: ROLE.sub.tr,
    },
  },

  "state-security-water-supply": {
    uz: {
      title: "Davlat xavfsizlik xizmatining 10 ta harbiy qismini suv bilan taʼminlash",
      shortTitle: "DXX 10 ta harbiy qismini suv bilan taʼminlash",
      location: "Oʻzbekiston",
      client: "Oʻzbekiston Respublikasi Davlat xavfsizlik xizmati KSSB",
      description:
        "Oʻzbekiston Respublikasi Davlat xavfsizlik xizmati KSSBga qarashli 10 ta harbiy qism uchun ichimlik suvi taʼminoti tizimlarini qurish. Ishlar bir nechta obyektda bajarildi.",
      scope: [
        "10 ta harbiy qism uchun suv taʼminoti tizimlari",
        "Quduqlar, nasos stansiyalari va taqsimlash tarmoqlari",
        "Loyiha boʻyicha toʻliq ishga tushirish-sozlash ishlari",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Водоснабжение 10 воинских частей Службы государственной безопасности",
      shortTitle: "Водоснабжение 10 воинских частей СГБ",
      location: "Узбекистан",
      client: "КССБ Службы государственной безопасности Республики Узбекистан",
      description:
        "Строительство систем питьевого водоснабжения 10 воинских частей КССБ Службы государственной безопасности Республики Узбекистан. Работы выполнены на нескольких объектах.",
      scope: [
        "Системы водоснабжения 10 воинских частей",
        "Скважины, насосные станции и распределительные сети",
        "Пусконаладочные работы по всему проекту",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Water Supply for 10 Military Units — State Security Service",
      shortTitle: "Water Supply for 10 State Security Military Units",
      location: "Uzbekistan",
      client: "KSSB of the State Security Service of the Republic of Uzbekistan",
      description:
        "Construction of drinking water supply systems for 10 military units of the KSSB of the State Security Service of the Republic of Uzbekistan, at several sites.",
      scope: [
        "10 military unit water supply systems",
        "Wells, pump houses and distribution",
        "Project-wide commissioning",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "Devlet Güvenlik Servisi’ne bağlı 10 askeri birliğin su temini",
      shortTitle: "10 askeri birliğe su temini — Devlet Güvenlik Servisi",
      location: "Özbekistan",
      client: "Özbekistan Cumhuriyeti Devlet Güvenlik Servisi KSSB",
      description:
        "Özbekistan Cumhuriyeti Devlet Güvenlik Servisi KSSB’ye bağlı 10 askeri birlik için içme suyu temin sistemlerinin inşası. İşler birden fazla sahada gerçekleştirildi.",
      scope: [
        "10 askeri birlik için su temin sistemleri",
        "Kuyular, pompa istasyonları ve dağıtım hatları",
        "Proje genelinde devreye alma",
      ],
      role: ROLE.gc.tr,
    },
  },

  "vu5-guzar-reconstruction": {
    uz: {
      title: "VU-5 suv olish inshootini rekonstruksiya qilish — Gʻuzor tumani",
      shortTitle: "VU-5 suv olish inshooti rekonstruksiyasi — Gʻuzor",
      location: "Gʻuzor tumani, Qashqadaryo viloyati",
      client: KASHKADARYA_SCS.uz,
      description:
        "Gʻuzor tumanidagi VU-5 suv olish inshootini toʻliq rekonstruksiya qilish. Isteʼmolchilarning barqaror suv taʼminotini tiklash maqsadida suv olish inshooti, nasos stansiyasi va tegishli infratuzilma yangilandi.",
      scope: [
        "Suv olish inshootini rekonstruksiya qilish",
        "Nasos stansiyasini modernizatsiya qilish",
        "Taqsimlash quvurlariga ulanishlar",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Реконструкция водозаборного сооружения ВУ-5 — Гузарский район",
      shortTitle: "Реконструкция водозабора ВУ-5 — Гузарский район",
      location: "Гузарский район, Кашкадарьинская область",
      client: KASHKADARYA_SCS.ru,
      description:
        "Полная реконструкция водозаборного сооружения ВУ-5 в Гузарском районе. Модернизированы водозабор, насосная станция и сопутствующая инфраструктура для восстановления надёжного водоснабжения потребителей.",
      scope: [
        "Реконструкция водозаборного сооружения",
        "Модернизация насосной станции",
        "Подключение к распределительным трубопроводам",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Reconstruction of Water Intake VU-5 — Guzar District",
      location: "Guzar District, Kashkadarya Region",
      client: KASHKADARYA_SCS.en,
      description:
        "Full reconstruction of water intake facility VU-5 in Guzar district. Upgraded intake, pump station and associated infrastructure to restore reliable water supply to downstream consumers.",
      scope: [
        "Water intake facility reconstruction",
        "Pump station upgrade",
        "Distribution pipeline connections",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "VU-5 su alma yapısının yenilenmesi — Guzar ilçesi",
      location: "Guzar ilçesi, Kaşkaderya vilayeti",
      client: KASHKADARYA_SCS.tr,
      description:
        "Guzar ilçesindeki VU-5 su alma tesisinin kapsamlı yenilenmesi. Tüketicilere güvenilir su temininin yeniden sağlanması için su alma yapısı, pompa istasyonu ve ilgili altyapı yenilendi.",
      scope: [
        "Su alma yapısının yenilenmesi",
        "Pompa istasyonunun modernizasyonu",
        "Dağıtım hattı bağlantıları",
      ],
      role: ROLE.gc.tr,
    },
  },

  "vu5-yakkabag-reconstruction": {
    uz: {
      title: "VU-5 suv olish inshootini rekonstruksiya qilish — Yakkabogʻ tumani",
      shortTitle: "VU-5 suv olish inshooti rekonstruksiyasi — Yakkabogʻ",
      location: "Yakkabogʻ tumani, Qashqadaryo viloyati",
      client: KASHKADARYA_SCS.uz,
      description:
        "Yakkabogʻ tumanidagi VU-5 suv olish inshootini rekonstruksiya qilish. Ishlar hajmiga suv olish inshootlarini toʻliq qayta tiklash, mexanik va elektr tizimlari hamda viloyat taqsimlash tarmogʻiga ulash kirdi.",
      scope: [
        "Suv olish inshootlarini qayta tiklash",
        "Mexanik va elektr montaj ishlari",
        "Viloyat taqsimlash tarmogʻiga ulash",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Реконструкция водозаборного сооружения ВУ-5 — Яккабагский район",
      shortTitle: "Реконструкция водозабора ВУ-5 — Яккабагский район",
      location: "Яккабагский район, Кашкадарьинская область",
      client: KASHKADARYA_SCS.ru,
      description:
        "Реконструкция водозаборного сооружения ВУ-5 в Яккабагском районе. В объём работ входили полное восстановление водозаборных сооружений, механических и электрических систем и подключение к региональной распределительной сети.",
      scope: [
        "Восстановление водозаборных сооружений",
        "Механомонтажные и электромонтажные работы",
        "Подключение к региональной распределительной сети",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Reconstruction of Water Intake VU-5 — Yakkabag District",
      location: "Yakkabag District, Kashkadarya Region",
      client: KASHKADARYA_SCS.en,
      description:
        "Reconstruction of VU-5 water intake facility in Yakkabag district. Scope included complete rehabilitation of intake structures, mechanical and electrical systems, and tie-in to the regional distribution network.",
      scope: [
        "Intake structure rehabilitation",
        "Mechanical and electrical works",
        "Tie-in to regional distribution",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "VU-5 su alma yapısının yenilenmesi — Yakkabağ ilçesi",
      location: "Yakkabağ ilçesi, Kaşkaderya vilayeti",
      client: KASHKADARYA_SCS.tr,
      description:
        "Yakkabağ ilçesindeki VU-5 su alma tesisinin yenilenmesi. Kapsam; su alma yapılarının tamamen rehabilitasyonunu, mekanik ve elektrik sistemlerini ve bölgesel dağıtım şebekesine bağlantıyı içermektedir.",
      scope: [
        "Su alma yapılarının rehabilitasyonu",
        "Mekanik ve elektrik işleri",
        "Bölgesel dağıtım şebekesine bağlantı",
      ],
      role: ROLE.gc.tr,
    },
  },

  "syrdarya-water-supply-systems": {
    uz: {
      title: "Suv taʼminoti tizimlarini qurish — Sirdaryo viloyati",
      location: "Sirdaryo viloyati",
      client: "Yagona buyurtmachi xizmati injiniring kompaniyasi",
      description:
        "Sirdaryo viloyati boʻylab suv olish, magistral va taqsimlash ishlarini qamrab olgan yangi suv taʼminoti tizimlarini qurish. Bosh pudratchi sifatida bajarildi.",
      scope: [
        "Yangi suv olish quduqlari va nasoslar",
        "Magistral quvurlar",
        "Taqsimlash tarmoqlari va xonadonlarga ulanishlar",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Строительство систем водоснабжения — Сырдарьинская область",
      shortTitle: "Системы водоснабжения — Сырдарьинская область",
      location: "Сырдарьинская область",
      client: "Инжиниринговая компания службы единого заказчика",
      description:
        "Строительство новых систем водоснабжения в Сырдарьинской области, включая водозаборные, магистральные и распределительные сооружения. Выполнено в качестве генерального подрядчика.",
      scope: [
        "Новые водозаборные скважины и насосы",
        "Магистральные водоводы",
        "Распределительные сети и подключение домов",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Construction of Water Supply Systems — Syrdarya Region",
      location: "Syrdarya Region",
      client: "Engineering Company, Single Customer Service",
      description:
        "Construction of new water supply systems across Syrdarya region covering intake, transmission, and distribution works. Delivered as general contractor.",
      scope: [
        "New intake wells and pumps",
        "Transmission pipelines",
        "Distribution networks and house connections",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "Su temin sistemlerinin inşası — Sirderya vilayeti",
      location: "Sirderya vilayeti",
      client: "Tek Müşteri Hizmeti Mühendislik Şirketi",
      description:
        "Sirderya vilayeti genelinde su alma, iletim ve dağıtım işlerini kapsayan yeni su temin sistemlerinin inşası. Ana yüklenici olarak gerçekleştirildi.",
      scope: [
        "Yeni su alma kuyuları ve pompalar",
        "İsale hatları",
        "Dağıtım şebekeleri ve konut bağlantıları",
      ],
      role: ROLE.gc.tr,
    },
  },

  "damkhodzha-pipeline-reconstruction": {
    uz: {
      title: "Damxoʻja viloyatlararo suv quvurini rekonstruksiya qilish",
      shortTitle: "Damxoʻja viloyatlararo suv quvuri rekonstruksiyasi",
      location: "Oʻzbekiston (viloyatlararo)",
      client: UZKOMMUN.uz,
      description:
        "“Oʻzkommunxizmat” agentligi buyurtmasi boʻyicha subpudratchi sifatida Damxoʻja viloyatlararo suv quvurini rekonstruksiya qilish. Ishlar hajmiga shikastlangan uchastkalarni almashtirish va gidravlik sinovdan soʻng qayta ishga tushirish kirdi.",
      scope: [
        "Shikastlangan quvur uchastkalarini almashtirish",
        "Bosim ostida sinash va qayta ishga tushirish",
      ],
      role: ROLE.sub.uz,
    },
    ru: {
      title: "Реконструкция межрегионального водовода «Дамходжа»",
      location: "Узбекистан (межрегиональный объект)",
      client: UZKOMMUN.ru,
      description:
        "Реконструкция межрегионального водовода «Дамходжа», выполненная в качестве субподрядчика агентства «Узкоммунхизмат». В объём работ входили замена повреждённых участков и повторный гидравлический ввод в эксплуатацию.",
      scope: [
        "Замена повреждённых участков трубопровода",
        "Гидравлические испытания и повторный ввод в эксплуатацию",
      ],
      role: ROLE.sub.ru,
    },
    en: {
      title: "Reconstruction of the Damkhodzha Interregional Water Pipeline",
      shortTitle: "Damkhodzha Interregional Pipeline Reconstruction",
      location: "Uzbekistan (interregional)",
      client: UZKOMMUN.en,
      description:
        "Reconstruction of the Damkhodzha interregional water pipeline, delivered as subcontractor to the Uzkommunkhizmat Agency. Scope covered replacement of damaged sections and hydraulic recommissioning.",
      scope: [
        "Damaged pipeline section replacement",
        "Pressure testing and recommissioning",
      ],
      role: ROLE.sub.en,
    },
    tr: {
      title: "Damhoca bölgelerarası su isale hattının yenilenmesi",
      location: "Özbekistan (bölgelerarası)",
      client: UZKOMMUN.tr,
      description:
        "Uzkommunhizmat Ajansı için alt yüklenici olarak yürütülen Damhoca bölgelerarası su isale hattının yenilenmesi. Kapsam, hasarlı hat kesimlerinin değiştirilmesini ve hidrolik olarak yeniden devreye almayı içermektedir.",
      scope: [
        "Hasarlı boru hattı kesimlerinin değiştirilmesi",
        "Basınç testi ve yeniden devreye alma",
      ],
      role: ROLE.sub.tr,
    },
  },

  "cng-wells-uztransgaz": {
    uz: {
      title: "Siqilgan gaz (CNG) quyish shoxobchalarida quduqlar burgʻulash",
      shortTitle: "CNG quyish shoxobchalarida quduqlar burgʻulash",
      location: "Oʻzbekiston (bir nechta obyekt)",
      client: "“Oʻztransgaz”",
      description:
        "Oʻzbekiston boʻylab “Oʻztransgaz” tomonidan boshqariladigan siqilgan gaz quyish shoxobchalarida ekspluatatsiya suv quduqlarini burgʻulash. Subpudratchi sifatida bajarildi.",
      scope: [
        "CNG shoxobchalarida ekspluatatsiya suv quduqlari",
        "Nasos uskunalarini oʻrnatish",
      ],
      role: ROLE.sub.uz,
    },
    ru: {
      title: "Бурение скважин на территории АГНКС",
      location: "Узбекистан (несколько объектов)",
      client: "«Узтрансгаз»",
      description:
        "Бурение эксплуатационных водозаборных скважин на автомобильных газонаполнительных компрессорных станциях (АГНКС) «Узтрансгаз» в различных регионах Узбекистана. Выполнено в качестве субподрядчика.",
      scope: [
        "Эксплуатационные водозаборные скважины на АГНКС",
        "Монтаж насосного оборудования",
      ],
      role: ROLE.sub.ru,
    },
    en: {
      title: "Drilling of Wells at CNG Filling Stations",
      location: "Uzbekistan (multiple sites)",
      client: "Uztransgaz",
      description:
        "Drilling of production water wells at CNG filling stations operated by Uztransgaz across Uzbekistan. Delivered as subcontractor.",
      scope: [
        "Production water wells at CNG stations",
        "Pumping equipment installation",
      ],
      role: ROLE.sub.en,
    },
    tr: {
      title: "CNG dolum istasyonlarında kuyu açılması",
      location: "Özbekistan (birden fazla saha)",
      client: "Uztransgaz",
      description:
        "Uztransgaz tarafından işletilen, Özbekistan genelindeki CNG dolum istasyonlarında üretim amaçlı su kuyularının açılması. Alt yüklenici olarak gerçekleştirildi.",
      scope: [
        "CNG istasyonlarında üretim su kuyuları",
        "Pompa ekipmanı montajı",
      ],
      role: ROLE.sub.tr,
    },
  },

  "orient-holding-water-supply": {
    uz: {
      title: "ORIENT ishlab chiqarish obyektlarida suv taʼminoti tizimlari va quduqlar burgʻulash",
      shortTitle: "ORIENT obyektlarida suv taʼminoti va quduq burgʻulash",
      location: "Oʻzbekiston",
      client: "ORIENT Holding",
      description:
        "ORIENT Holding sanoat obyektlari uchun suv taʼminoti tizimlarini qurish va ekspluatatsiya quduqlarini burgʻulash. Bosh pudratchi sifatida bajarildi.",
      scope: [
        "Sanoat ekspluatatsiya quduqlari",
        "Obyekt suv taʼminoti tizimlari",
        "Nasos uskunalari va suvni tozalash",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Системы водоснабжения и бурение скважин — производственные объекты ORIENT",
      shortTitle: "Водоснабжение и бурение скважин — объекты ORIENT",
      location: "Узбекистан",
      client: "ORIENT Holding",
      description:
        "Строительство систем водоснабжения и бурение эксплуатационных скважин для промышленных объектов ORIENT Holding. Выполнено в качестве генерального подрядчика.",
      scope: [
        "Промышленные эксплуатационные скважины",
        "Системы водоснабжения площадок",
        "Насосное оборудование и водоподготовка",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Water Supply Systems and Well Drilling — ORIENT Production Facilities",
      shortTitle: "Water Supply and Well Drilling — ORIENT Facilities",
      location: "Uzbekistan",
      client: "ORIENT Holding",
      description:
        "Construction of water supply systems and drilling of production wells for ORIENT Holding industrial facilities. Delivered as general contractor.",
      scope: [
        "Industrial production wells",
        "Site water supply systems",
        "Pumping and treatment",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "Su temin sistemleri ve kuyu açılması — ORIENT üretim tesisleri",
      shortTitle: "Su temini ve kuyu açılması — ORIENT üretim tesisleri",
      location: "Özbekistan",
      client: "ORIENT Holding",
      description:
        "ORIENT Holding sanayi tesisleri için su temin sistemlerinin inşası ve üretim kuyularının açılması. Ana yüklenici olarak gerçekleştirildi.",
      scope: [
        "Endüstriyel üretim kuyuları",
        "Saha su temin sistemleri",
        "Pompalama ve su arıtma",
      ],
      role: ROLE.gc.tr,
    },
  },

  "landscaping-wells": {
    uz: {
      title: "Shahar obodonlashtirish ishlari uchun quduqlar burgʻulash",
      shortTitle: "Shahar obodonlashtirishi uchun quduqlar burgʻulash",
      location: "Oʻzbekiston",
      client: "Oʻzbekiston Respublikasi Uy-joy kommunal xizmat koʻrsatish boshqarmasi",
      description:
        "Uy-joy kommunal xizmat koʻrsatish boshqarmasining shahar obodonlashtirish dasturlari uchun quduqlar burgʻulash. Bir nechta shahar obyektlarida subpudratchi sifatida bajarildi.",
      scope: ["Koʻkalamzorlashtirish uchun sugʻorish quduqlari", "Nasoslarni oʻrnatish"],
      role: ROLE.sub.uz,
    },
    ru: {
      title: "Бурение скважин для благоустройства",
      location: "Узбекистан",
      client: "Управление жилищно-коммунального обслуживания Республики Узбекистан",
      description:
        "Бурение скважин в рамках программ городского благоустройства Управления жилищно-коммунального обслуживания. Выполнено в качестве субподрядчика на нескольких городских объектах.",
      scope: ["Поливочные скважины для озеленения", "Монтаж насосов"],
      role: ROLE.sub.ru,
    },
    en: {
      title: "Drilling of Wells for Urban Landscaping",
      location: "Uzbekistan",
      client: "Housing and Communal Services Department of the Republic of Uzbekistan",
      description:
        "Drilling of wells supporting urban landscaping programmes of the Housing and Communal Services Department. Delivered as subcontractor across multiple municipal sites.",
      scope: ["Irrigation wells for landscaping", "Pump installation"],
      role: ROLE.sub.en,
    },
    tr: {
      title: "Kentsel peyzaj düzenlemesi için kuyu açılması",
      location: "Özbekistan",
      client: "Özbekistan Cumhuriyeti Konut ve Toplu Hizmetler Dairesi",
      description:
        "Konut ve Toplu Hizmetler Dairesi’nin kentsel peyzaj programları için kuyu açılması. Birden fazla belediye sahasında alt yüklenici olarak gerçekleştirildi.",
      scope: ["Peyzaj sulama kuyuları", "Pompa montajı"],
      role: ROLE.sub.tr,
    },
  },

  "koshrabad-water-w31": {
    uz: {
      title: "Ichimlik suvi taʼminotini yaxshilash — Qoʻshrabot tumani (W/3.1)",
      shortTitle: "Qoʻshrabot suv taʼminotini yaxshilash (W/3.1)",
      location: "Qoʻshrabot tumani, Samarqand viloyati",
      client: KOSHRABAD_CLIENT.uz,
      funder: OPEC_SAUDI.uz,
      description:
        "Qishloq aholi punktlarini suv bilan taʼminlash hamda “Tepalik”, “Uchyogoch”, “Chinok”, “Kora Kissa”, “Koratosh”, “Ejgenrt”, “Shurcha”, “Tozgora” va “Yangirabod” suv olish inshootlarini qurish. Loyiha Xalqaro taraqqiyot uchun OPEK fondi va Saudiya taraqqiyot fondi tomonidan moliyalashtirildi.",
      scope: [
        "9 ta qishloq suv olish inshooti",
        "Magistral va taqsimlash tarmoqlari",
        "Nasos stansiyalari va suv saqlash rezervuarlari",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Улучшение питьевого водоснабжения — Кошрабадский район (W/3.1)",
      shortTitle: "Улучшение водоснабжения — Кошрабадский район (W/3.1)",
      location: "Кошрабадский район, Самаркандская область",
      client: KOSHRABAD_CLIENT.ru,
      funder: OPEC_SAUDI.ru,
      description:
        "Водоснабжение сельских населённых пунктов и строительство водозаборов «Тепалик», «Учёгоч», «Чинок», «Кора Кисса», «Коратош», «Эжгенрт», «Шурча», «Тозгора» и «Янгирабод». Проект финансировался Фондом ОПЕК для международного развития и Саудовским фондом развития.",
      scope: [
        "9 сельских водозаборов",
        "Магистральные и распределительные сети",
        "Насосные станции и резервуары",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Improvement of Drinking Water Supply — Koshrabad District (W/3.1)",
      shortTitle: "Drinking Water Supply Improvement — Koshrabad (W/3.1)",
      location: "Koshrabad District, Samarkand Region",
      client: KOSHRABAD_CLIENT.en,
      funder: OPEC_SAUDI.en,
      description:
        "Water supply to rural settlements and construction of water intakes “Tepalik”, “Uchyogoch”, “Chinok”, “Kora Kissa”, “Koratosh”, “Ejgenrt”, “Shurcha”, “Tozgora”, and “Yangirabod”. Project financed by the OPEC Fund for International Development and the Saudi Fund for Development.",
      scope: [
        "9 rural water intakes",
        "Transmission and distribution networks",
        "Pumping stations and storage",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "İçme suyu temininin iyileştirilmesi — Koşrabat ilçesi (W/3.1)",
      shortTitle: "İçme suyu temininin iyileştirilmesi — Koşrabat (W/3.1)",
      location: "Koşrabat ilçesi, Semerkant vilayeti",
      client: KOSHRABAD_CLIENT.tr,
      funder: OPEC_SAUDI.tr,
      description:
        "Kırsal yerleşimlere su temini ve “Tepalik”, “Uchyogoch”, “Chinok”, “Kora Kissa”, “Koratosh”, “Ejgenrt”, “Shurcha”, “Tozgora” ve “Yangirabod” su alma yapılarının inşası. Proje, OPEC Uluslararası Kalkınma Fonu ve Suudi Kalkınma Fonu tarafından finanse edildi.",
      scope: [
        "9 kırsal su alma yapısı",
        "İsale ve dağıtım şebekeleri",
        "Pompa istasyonları ve depolar",
      ],
      role: ROLE.gc.tr,
    },
  },

  "koshrabad-water-w41": {
    uz: {
      title: "Ichimlik suvi taʼminotini yaxshilash — Qoʻshrabot tumani (W/4.1)",
      shortTitle: "Qoʻshrabot suv taʼminotini yaxshilash (W/4.1)",
      location: "Qoʻshrabot tumani, Samarqand viloyati",
      client: KOSHRABAD_CLIENT.uz,
      funder: OPEC_SAUDI.uz,
      description:
        "Qoʻshrabot suv taʼminoti loyihasi doirasida qishloq aholi punktlarini suv bilan taʼminlash hamda “Yukorijush”, “Yangikishlok”, “Korachokiya”, “Urganji”, “Yangihayot”, “Kanda” va “Kurgon” suv olish inshootlarini qurish. Xalqaro taraqqiyot uchun OPEK fondi va Saudiya taraqqiyot fondi tomonidan moliyalashtirildi.",
      scope: [
        "7 ta qishloq suv olish inshooti",
        "Magistral va taqsimlash tarmoqlari",
        "Nasos stansiyalari va suv saqlash rezervuarlari",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Улучшение питьевого водоснабжения — Кошрабадский район (W/4.1)",
      shortTitle: "Улучшение водоснабжения — Кошрабадский район (W/4.1)",
      location: "Кошрабадский район, Самаркандская область",
      client: KOSHRABAD_CLIENT.ru,
      funder: OPEC_SAUDI.ru,
      description:
        "Водоснабжение сельских населённых пунктов и строительство водозаборов «Юкорижуш», «Янгикишлок», «Корачокия», «Урганджи», «Янгихаёт», «Канда» и «Кургон» в рамках Проекта водоснабжения Кошрабадского района. Финансирование — Фонд ОПЕК для международного развития и Саудовский фонд развития.",
      scope: [
        "7 сельских водозаборов",
        "Магистральные и распределительные сети",
        "Насосные станции и резервуары",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Improvement of Drinking Water Supply — Koshrabad District (W/4.1)",
      shortTitle: "Drinking Water Supply Improvement — Koshrabad (W/4.1)",
      location: "Koshrabad District, Samarkand Region",
      client: KOSHRABAD_CLIENT.en,
      funder: OPEC_SAUDI.en,
      description:
        "Water supply to rural settlements and construction of water intakes “Yukorijush”, “Yangikishlok”, “Korachokiya”, “Urganji”, “Yangihayot”, “Kanda”, and “Kurgon” under the Koshrabad Water Supply Project. Financed by the OPEC Fund for International Development and the Saudi Fund for Development.",
      scope: [
        "7 rural water intakes",
        "Transmission and distribution networks",
        "Pumping stations and storage",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "İçme suyu temininin iyileştirilmesi — Koşrabat ilçesi (W/4.1)",
      shortTitle: "İçme suyu temininin iyileştirilmesi — Koşrabat (W/4.1)",
      location: "Koşrabat ilçesi, Semerkant vilayeti",
      client: KOSHRABAD_CLIENT.tr,
      funder: OPEC_SAUDI.tr,
      description:
        "Koşrabat Su Temini Projesi kapsamında kırsal yerleşimlere su temini ve “Yukorijush”, “Yangikishlok”, “Korachokiya”, “Urganji”, “Yangihayot”, “Kanda” ve “Kurgon” su alma yapılarının inşası. OPEC Uluslararası Kalkınma Fonu ve Suudi Kalkınma Fonu tarafından finanse edildi.",
      scope: [
        "7 kırsal su alma yapısı",
        "İsale ve dağıtım şebekeleri",
        "Pompa istasyonları ve depolar",
      ],
      role: ROLE.gc.tr,
    },
  },

  "akkurgan-olimzhon-water-supply": {
    uz: {
      title: "Suv taʼminoti tizimlarini rekonstruksiya qilish — X. Olimjon MFY, Oqqoʻrgʻon tumani",
      shortTitle: "Suv taʼminoti rekonstruksiyasi — X. Olimjon, Oqqoʻrgʻon",
      location: "X. Olimjon MFY, Oqqoʻrgʻon tumani, Toshkent viloyati",
      client: "“SAINSUVINSHOATLARI” QK MChJ",
      description:
        "Toshkent viloyati Oqqoʻrgʻon tumanidagi X. Olimjon MFY suv taʼminoti tizimlarini rekonstruksiya qilish. 25-S-son shartnoma boʻyicha “SAINSUVINSHOATLARI” QK MChJ subpudratchisi sifatida bajarildi.",
      scope: [
        "Taqsimlash quvurlarini almashtirish",
        "Nasos stansiyasini qayta tiklash",
        "Xonadonlarga ulanish ishlari",
      ],
      role: ROLE.sub.uz,
    },
    ru: {
      title: "Реконструкция систем водоснабжения — МСГ «Х. Олимжон», Аккурганский район",
      shortTitle: "Реконструкция водоснабжения — «Х. Олимжон», Аккурган",
      location: "МСГ «Х. Олимжон», Аккурганский район, Ташкентская область",
      client: "СП ООО «SAINSUVINSHOATLARI»",
      description:
        "Реконструкция систем водоснабжения МСГ «Х. Олимжон» в Аккурганском районе Ташкентской области. Выполнено в качестве субподрядчика СП ООО «SAINSUVINSHOATLARI» по договору № 25-С.",
      scope: [
        "Замена распределительных трубопроводов",
        "Восстановление насосной станции",
        "Работы по подключению домов",
      ],
      role: ROLE.sub.ru,
    },
    en: {
      title: "Reconstruction of Water Supply Systems — Kh. Olimzhon MFY, Akkurgan District",
      shortTitle: "Water Supply Reconstruction — Kh. Olimzhon, Akkurgan",
      location: "Kh. Olimzhon MFY, Akkurgan District, Tashkent Region",
      client: "JV LLC SAINSUVINSHOATLARI",
      description:
        "Reconstruction of water supply systems serving Kh. Olimzhon MFY in Akkurgan district, Tashkent region. Delivered as subcontractor to JV LLC SAINSUVINSHOATLARI under contract 25-С.",
      scope: [
        "Distribution pipeline replacement",
        "Pump station rehabilitation",
        "House connection works",
      ],
      role: ROLE.sub.en,
    },
    tr: {
      title: "Su temin sistemlerinin yenilenmesi — H. Olimjon Mahallesi, Akkurgan ilçesi",
      shortTitle: "Su temini yenilenmesi — H. Olimjon Mahallesi, Akkurgan",
      location: "H. Olimjon Mahallesi, Akkurgan ilçesi, Taşkent vilayeti",
      client: "SAINSUVINSHOATLARI Ortak Girişimi Ltd. Şti.",
      description:
        "Taşkent vilayeti Akkurgan ilçesindeki H. Olimjon Mahallesi’ne hizmet veren su temin sistemlerinin yenilenmesi. 25-С sayılı sözleşme kapsamında SAINSUVINSHOATLARI Ortak Girişimi’nin alt yüklenicisi olarak gerçekleştirildi.",
      scope: [
        "Dağıtım hattının yenilenmesi",
        "Pompa istasyonu rehabilitasyonu",
        "Konut bağlantı işleri",
      ],
      role: ROLE.sub.tr,
    },
  },

  "zhiydakapa-water-intake-namangan": {
    uz: {
      title: "Jiydakapa suv olish inshootini rekonstruksiya qilish — Namangan viloyati",
      shortTitle: "Jiydakapa suv olish inshooti rekonstruksiyasi, Namangan",
      location: "Namangan viloyati",
      client: "“Oʻzsuvtaʼminot” AJ",
      funder: "Yevropa tiklanish va taraqqiyot banki (YeTTB)",
      description:
        "NWP-6 shartnomasi boʻyicha Namangan viloyatidagi Jiydakapa suv olish inshootini rekonstruksiya qilish. Yevropa tiklanish va taraqqiyot banki (YeTTB) mablagʻlari hisobidan “Oʻzsuvtaʼminot” AJ uchun bosh pudratchi sifatida amalga oshirilmoqda.",
      scope: [
        "Suv olish inshootini rekonstruksiya qilish",
        "Nasos va filtrlash tizimlarini modernizatsiya qilish",
        "SCADA va telemetriya",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Реконструкция водозабора «Жийдакапа» — Наманганская область",
      shortTitle: "Реконструкция водозабора «Жийдакапа», Наманган",
      location: "Наманганская область",
      client: "АО «Узсувтаъминот»",
      funder: "Европейский банк реконструкции и развития (ЕБРР)",
      description:
        "Реконструкция водозабора «Жийдакапа» в Наманганской области по контракту NWP-6. Работы выполняются в качестве генерального подрядчика для АО «Узсувтаъминот» при финансировании Европейского банка реконструкции и развития (ЕБРР).",
      scope: [
        "Реконструкция водозаборного сооружения",
        "Модернизация насосного и фильтровального оборудования",
        "SCADA и телеметрия",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Reconstruction of the Zhiydakapa Water Intake — Namangan Region",
      shortTitle: "Zhiydakapa Water Intake Reconstruction — Namangan",
      location: "Namangan Region",
      client: "Uzsuvtaminot JSC",
      funder: "European Bank for Reconstruction and Development (EBRD)",
      description:
        "Reconstruction of the Zhiydakapa water intake in Namangan region under contract NWP-6, carried out as general contractor for Uzsuvtaminot JSC and financed by the European Bank for Reconstruction and Development (EBRD).",
      scope: [
        "Intake structure reconstruction",
        "Pumping and filtration upgrade",
        "SCADA and telemetry",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "Jiydakapa su alma yapısının yenilenmesi — Namangan vilayeti",
      shortTitle: "Jiydakapa su alma yapısının yenilenmesi — Namangan",
      location: "Namangan vilayeti",
      client: "Uzsuvtaminot AŞ",
      funder: "Avrupa İmar ve Kalkınma Bankası (EBRD)",
      description:
        "NWP-6 sözleşmesi kapsamında Namangan vilayetindeki Jiydakapa su alma yapısının yenilenmesi. Avrupa İmar ve Kalkınma Bankası (EBRD) finansmanıyla Uzsuvtaminot AŞ için ana yüklenici olarak yürütülmektedir.",
      scope: [
        "Su alma yapısının yenilenmesi",
        "Pompalama ve filtrasyon sistemlerinin modernizasyonu",
        "SCADA ve telemetri",
      ],
      role: ROLE.gc.tr,
    },
  },

  "kasbi-tolishbe-water-supply": {
    uz: {
      title: "Ichimlik suvi tarmoqlari — Tolishbe MFY, Kasbi tumani",
      location: "Tolishbe MFY, Kasbi tumani, Qashqadaryo viloyati",
      client: "Qashqadaryo viloyat hokimligi Yagona buyurtmachi xizmati injiniring kompaniyasi",
      description:
        "Qashqadaryo viloyati Kasbi tumanidagi Tolishbe MFY uchun ichimlik suvi tarmoqlari hamda suv yigʻish va taqsimlash inshootlarini qurish. 283-son shartnoma boʻyicha bosh pudratchi sifatida bajarildi.",
      scope: [
        "Taqsimlash quvur tarmoqlari",
        "Suv yigʻish va taqsimlash inshootlari",
        "Isteʼmolchilarga ulanishlar",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Сети питьевого водоснабжения — МСГ «Толишбе», Касбийский район",
      shortTitle: "Водопроводные сети — МСГ «Толишбе», Касбийский район",
      location: "МСГ «Толишбе», Касбийский район, Кашкадарьинская область",
      client: "Инжиниринговая компания службы единого заказчика при хокимияте Кашкадарьинской области",
      description:
        "Строительство сетей питьевого водоснабжения, а также сборных и распределительных сооружений для МСГ «Толишбе» Касбийского района Кашкадарьинской области. Выполнено в качестве генерального подрядчика по договору № 283.",
      scope: [
        "Распределительные трубопроводные сети",
        "Сборные и распределительные сооружения",
        "Абонентские подключения",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Drinking Water Networks — Tolishbe MFY, Kasbi District",
      location: "Tolishbe MFY, Kasbi District, Kashkadarya Region",
      client: "Kashkadarya Regional Government Single Customer Service Engineering Company",
      description:
        "Construction of drinking water networks together with collection and distribution facilities for Tolishbe MFY in Kasbi district, Kashkadarya region. Delivered as general contractor under contract 283.",
      scope: [
        "Distribution pipeline networks",
        "Collection and distribution facilities",
        "Service connections",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "İçme suyu şebekeleri — Tolishbe Mahallesi, Kasbi ilçesi",
      location: "Tolishbe Mahallesi, Kasbi ilçesi, Kaşkaderya vilayeti",
      client: "Kaşkaderya Vilayet Valiliği Tek Müşteri Hizmeti Mühendislik Şirketi",
      description:
        "Kaşkaderya vilayeti Kasbi ilçesindeki Tolishbe Mahallesi için içme suyu şebekeleri ile toplama ve dağıtım tesislerinin inşası. 283 sayılı sözleşme kapsamında ana yüklenici olarak gerçekleştirildi.",
      scope: [
        "Dağıtım boru şebekeleri",
        "Toplama ve dağıtım tesisleri",
        "Abone bağlantıları",
      ],
      role: ROLE.gc.tr,
    },
  },

  "bektemir-new-nurafshon-water-supply": {
    uz: {
      title: "Ichimlik suvi tarmoqlari — Yangi Nurafshon MFY, Bektemir tumani",
      shortTitle: "Ichimlik suvi tarmoqlari — Yangi Nurafshon, Bektemir",
      location: "Yangi Nurafshon MFY, Bektemir tumani, Toshkent shahri",
      client: "Suv taʼminoti va kanalizatsiya inshootlari qurilishi injiniring kompaniyasi",
      description:
        "Toshkent shahri Bektemir tumanidagi Yangi Nurafshon MFY uchun ichimlik suvi taqsimlash tarmoqlarini qurish. 6/22-son shartnoma boʻyicha bosh pudratchi sifatida bajarildi.",
      scope: [
        "Taqsimlash quvur tarmoqlari",
        "Isteʼmolchilarga ulanishlar",
        "Bosim ostida sinash va ishga tushirish",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Сети питьевого водоснабжения — МСГ «Янги Нурафшон», Бектемирский район",
      shortTitle: "Водопроводные сети — МСГ «Янги Нурафшон», Бектемир",
      location: "МСГ «Янги Нурафшон», Бектемирский район, г. Ташкент",
      client: "Инжиниринговая компания по строительству объектов водоснабжения и канализации",
      description:
        "Строительство распределительных сетей питьевого водоснабжения для МСГ «Янги Нурафшон» Бектемирского района г. Ташкента. Выполнено в качестве генерального подрядчика по договору № 6/22.",
      scope: [
        "Распределительные трубопроводные сети",
        "Абонентские подключения",
        "Гидравлические испытания и ввод в эксплуатацию",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Drinking Water Networks — New Nurafshon MFY, Bektemir District",
      shortTitle: "Drinking Water Networks — New Nurafshon MFY, Bektemir",
      location: "New Nurafshon MFY, Bektemir District, Tashkent",
      client: "Construction of Water Supply and Wastewater Facilities Engineering Company",
      description:
        "Construction of drinking water distribution networks for New Nurafshon MFY in Tashkent’s Bektemir district. Delivered as general contractor under contract 6/22.",
      scope: [
        "Distribution pipeline networks",
        "Service connections",
        "Pressure testing and commissioning",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "İçme suyu şebekeleri — Yangi Nurafshon Mahallesi, Bektemir ilçesi",
      shortTitle: "İçme suyu şebekeleri — Yangi Nurafshon, Bektemir",
      location: "Yangi Nurafshon Mahallesi, Bektemir ilçesi, Taşkent",
      client: "Su Temini ve Kanalizasyon Tesisleri İnşaatı Mühendislik Şirketi",
      description:
        "Taşkent’in Bektemir ilçesindeki Yangi Nurafshon Mahallesi için içme suyu dağıtım şebekelerinin inşası. 6/22 sayılı sözleşme kapsamında ana yüklenici olarak gerçekleştirildi.",
      scope: [
        "Dağıtım boru şebekeleri",
        "Abone bağlantıları",
        "Basınç testi ve devreye alma",
      ],
      role: ROLE.gc.tr,
    },
  },

  "payarik-beshkurgon-water-systems": {
    uz: {
      title: "Ichimlik suvi tizimlari — Beshqoʻrgʻon MFY Guliston qishlogʻi, Payariq tumani",
      shortTitle: "Ichimlik suvi tizimlari — Guliston qishlogʻi, Payariq",
      location: "Beshqoʻrgʻon MFY Guliston qishlogʻi, Payariq tumani, Samarqand viloyati",
      client: "Samarqand viloyat hokimligi injiniring kompaniyasi",
      description:
        "Samarqand viloyati Payariq tumani Beshqoʻrgʻon MFY Guliston qishlogʻida ichimlik suvi tizimlarini qurish va rekonstruksiya qilish. Bosh pudratchi sifatida bajarildi.",
      scope: [
        "Yangi va rekonstruksiya qilingan taqsimlash tarmoqlari",
        "Nasos va armatura montaji",
        "Isteʼmolchilarga ulanishlar",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Системы питьевого водоснабжения — кишлак Гулистан МСГ «Бешкурган», Пайарыкский район",
      shortTitle: "Питьевое водоснабжение — кишлак Гулистан, Пайарык",
      location: "кишлак Гулистан, МСГ «Бешкурган», Пайарыкский район, Самаркандская область",
      client: "Инжиниринговая компания хокимията Самаркандской области",
      description:
        "Строительство и реконструкция систем питьевого водоснабжения в кишлаке Гулистан МСГ «Бешкурган» Пайарыкского района Самаркандской области. Выполнено в качестве генерального подрядчика.",
      scope: [
        "Новые и реконструированные распределительные сети",
        "Монтаж насосов и запорной арматуры",
        "Абонентские подключения",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Drinking Water Systems — Beshkurgon MFY Guliston, Payarik District",
      shortTitle: "Drinking Water Systems — Guliston, Payarik District",
      location: "Beshkurgon MFY Guliston, Payarik District, Samarkand Region",
      client: "Samarkand Regional Government Engineering Company",
      description:
        "Construction and reconstruction of drinking water systems in Beshkurgon MFY of Guliston, Payarik district, Samarkand region. Delivered as general contractor.",
      scope: [
        "New and reconstructed distribution networks",
        "Pump and valve installations",
        "Service connections",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "İçme suyu sistemleri — Beşkurgan Mahallesi Gulistan köyü, Payarık ilçesi",
      shortTitle: "İçme suyu sistemleri — Gulistan köyü, Payarık ilçesi",
      location: "Beşkurgan Mahallesi Gulistan köyü, Payarık ilçesi, Semerkant vilayeti",
      client: "Semerkant Vilayet Valiliği Mühendislik Şirketi",
      description:
        "Semerkant vilayeti Payarık ilçesi Beşkurgan Mahallesi Gulistan köyünde içme suyu sistemlerinin inşası ve yenilenmesi. Ana yüklenici olarak gerçekleştirildi.",
      scope: [
        "Yeni ve yenilenen dağıtım şebekeleri",
        "Pompa ve vana montajları",
        "Abone bağlantıları",
      ],
      role: ROLE.gc.tr,
    },
  },

  "yangiyul-water-supply": {
    uz: {
      title: "Suv taʼminoti tizimini rekonstruksiya qilish — Yangiyoʻl shahri",
      shortTitle: "Yangiyoʻl shahri suv taʼminoti rekonstruksiyasi",
      location: "Yangiyoʻl shahri",
      client:
        "Iqtisodiyot va moliya vazirligi huzuridagi Oʻrta shaharlarni kompleks rivojlantirish loyihasini amalga oshirish guruhi",
      funder: "Jahon banki (XTTB)",
      description:
        "MSC-Y/W/1.2 shartnomasi boʻyicha Yangiyoʻl shahri suv taʼminoti tizimini rekonstruksiya qilish. Iqtisodiyot va moliya vazirligi huzuridagi Oʻrta shaharlarni kompleks rivojlantirish loyihasini amalga oshirish guruhi uchun bosh pudratchi sifatida bajarildi.",
      scope: [
        "Shahar boʻylab taqsimlash tarmogʻini rekonstruksiya qilish",
        "Nasos stansiyalari va suv saqlash rezervuarlari",
        "Isteʼmolchilarga ulanishlar",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Реконструкция системы водоснабжения — г. Янгиюль",
      location: "г. Янгиюль",
      client:
        "Группа реализации проекта комплексного городского развития средних городов при Министерстве экономики и финансов",
      funder: "Всемирный банк (МБРР)",
      description:
        "Реконструкция системы водоснабжения г. Янгиюль по контракту MSC-Y/W/1.2. Выполнено в качестве генерального подрядчика для Группы реализации проекта комплексного городского развития средних городов при Министерстве экономики и финансов.",
      scope: [
        "Реконструкция распределительной сети города",
        "Насосные станции и резервуары",
        "Абонентские подключения",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Reconstruction of the Water Supply System — Yangiyul",
      location: "Yangiyul City",
      client:
        "Medium-Size Cities Integrated Urban Development PIU, Ministry of Economy and Finance",
      funder: "World Bank (IBRD)",
      description:
        "Reconstruction of the water supply system in Yangiyul city under contract MSC-Y/W/1.2. Delivered as general contractor for the Medium-Size Cities Integrated Urban Development Project Implementation Unit of the Ministry of Economy and Finance.",
      scope: [
        "City-wide distribution network reconstruction",
        "Pump stations and storage",
        "Service connections",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "Su temin sisteminin yenilenmesi — Yangiyol",
      location: "Yangiyol şehri",
      client:
        "Orta Ölçekli Şehirler Entegre Kentsel Kalkınma Projesi Uygulama Birimi, Ekonomi ve Maliye Bakanlığı",
      funder: "Dünya Bankası (IBRD)",
      description:
        "MSC-Y/W/1.2 sözleşmesi kapsamında Yangiyol şehrinin su temin sisteminin yenilenmesi. Ekonomi ve Maliye Bakanlığı’na bağlı Orta Ölçekli Şehirler Entegre Kentsel Kalkınma Projesi Uygulama Birimi için ana yüklenici olarak gerçekleştirildi.",
      scope: [
        "Şehir genelinde dağıtım şebekesinin yenilenmesi",
        "Pompa istasyonları ve depolar",
        "Abone bağlantıları",
      ],
      role: ROLE.gc.tr,
    },
  },

  "namangan-water-supply-phase2": {
    uz: {
      title: "Namangan shahrining shimoliy qismini suv bilan taʼminlash — 2-bosqich",
      shortTitle: "Namangan shimoliy qismi suv taʼminoti — 2-bosqich",
      location: "Namangan shahri",
      client: "“Namangan suv taʼminoti”",
      funder: "Xalqaro taraqqiyot uchun OPEK fondi",
      description:
        "NWSP/ICB/W-4-2 shartnomasi boʻyicha dasturning 2-bosqichi doirasida Namangan shahrining shimoliy qismini suv bilan taʼminlash. Xalqaro taraqqiyot uchun OPEK fondi mablagʻlari hisobidan “Namangan suv taʼminoti” uchun bosh pudratchi sifatida amalga oshirilmoqda.",
      scope: [
        "Namangan shimoliy qismiga magistral quvurlar",
        "Taqsimlash tarmogʻini kengaytirish",
        "Nasos stansiyalari va suv saqlash rezervuarlari",
      ],
      role: ROLE.gc.uz,
    },
    ru: {
      title: "Водоснабжение северной части г. Наманган — 2-я очередь",
      location: "г. Наманган",
      client: "«Наманган сув таъминоти»",
      funder: "Фонд ОПЕК для международного развития",
      description:
        "Водоснабжение северной части г. Наманган в рамках 2-й очереди программы, контракт NWSP/ICB/W-4-2. Работы выполняются в качестве генерального подрядчика для «Наманган сув таъминоти» при финансировании Фонда ОПЕК для международного развития.",
      scope: [
        "Магистральные водоводы в северную часть Намангана",
        "Расширение распределительной сети",
        "Насосные станции и резервуары",
      ],
      role: ROLE.gc.ru,
    },
    en: {
      title: "Water Supply to the Northern Part of Namangan City — Phase 2",
      shortTitle: "Water Supply to Northern Namangan — Phase 2",
      location: "Namangan City",
      client: "Namangan Suv Taminoti",
      funder: "OPEC Fund for International Development",
      description:
        "Water supply to the northern part of Namangan city under Phase 2 of the programme, contract NWSP/ICB/W-4-2, carried out as general contractor for Namangan Suv Taminoti and financed by the OPEC Fund for International Development.",
      scope: [
        "Transmission mains to northern Namangan",
        "Distribution network extension",
        "Pumping and storage",
      ],
      role: ROLE.gc.en,
    },
    tr: {
      title: "Namangan şehrinin kuzey kesimine su temini — 2. etap",
      location: "Namangan şehri",
      client: "Namangan Suv Taminoti",
      funder: "OPEC Uluslararası Kalkınma Fonu",
      description:
        "Programın 2. etabı kapsamında, NWSP/ICB/W-4-2 sözleşmesiyle Namangan şehrinin kuzey kesimine su temini. OPEC Uluslararası Kalkınma Fonu finansmanıyla Namangan Suv Taminoti için ana yüklenici olarak yürütülmektedir.",
      scope: [
        "Namangan’ın kuzeyine isale hatları",
        "Dağıtım şebekesinin genişletilmesi",
        "Pompalama ve depolama",
      ],
      role: ROLE.gc.tr,
    },
  },
};

export function getProjectText(slug: string, locale: Locale): ProjectText {
  const entry = projectText[slug];
  if (!entry) throw new Error(`projects-i18n: no text for slug "${slug}"`);
  return entry[locale] ?? entry.en;
}

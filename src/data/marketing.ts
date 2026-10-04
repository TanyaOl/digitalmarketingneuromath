// Central forecast config. Replace `actual: null` with real values after campaigns launch.
export type Metric = { value: string; label: string };

export const forecastKPIs: Metric[] = [
  { value: "300–500", label: "Leads / year" },
  { value: "15–25%", label: "Lead → Paid conversion" },
  { value: "45–125", label: "Students / year" },
  { value: "100–250K UAH", label: "Expected monthly revenue" },
  { value: "30–50", label: "Reviews / cases" },
  { value: "40–60%", label: "Repeat sales" },
];

export type FunnelStage = {
  id: string;
  num: string;
  name: string;
  title: string;
  kpis: Metric[];
  actions: string[];
  extra?: { title: string; items: string[] };
};

export const funnelStages: FunnelStage[] = [
  {
    id: "awareness",
    num: "01",
    name: "Awareness",
    title: "Усвідомлення потреби",
    kpis: [
      { value: "10 000", label: "Охоплення контенту" },
      { value: "20%", label: "Взаємодія з контентом" },
      { value: "5%", label: "Переходи на сайт" },
    ],
    actions: [
      "Блог «Як підготуватися до НМТ»",
      "Тематичні публікації",
      "Reels",
      "TikTok",
      "Instagram",
      "Facebook",
      "Безкоштовні вебінари",
      "Чек-листи для батьків",
      "Партнерство з освітніми блогерами",
      "Корисний освітній контент",
      "Акції та розіграші",
    ],
  },
  {
    id: "consideration",
    num: "02",
    name: "Consideration",
    title: "Пошук рішення",
    kpis: [
      { value: "500", label: "Відвідувачів сайту" },
      { value: "150", label: "Записів на пробний урок" },
      { value: "30%", label: "Конверсія сайт → запис" },
    ],
    actions: [
      "SEO",
      "Google Ads",
      "Meta Ads",
      "Landing pages",
      "AI-діагностика",
      "Безкоштовний пробний урок",
      "Відгуки",
      "Кейси учнів",
      "Демонстрація переваг NeuroMath Academy",
    ],
    extra: {
      title: "SEO keywords",
      items: [
        "підготовка до НМТ з математики",
        "математика онлайн",
        "репетитор з математики онлайн",
        "підготовка до НМТ онлайн",
      ],
    },
  },
  {
    id: "conversion",
    num: "03",
    name: "Conversion",
    title: "Дія",
    kpis: [
      { value: "105", label: "Відвідали пробний урок" },
      { value: "40", label: "Оплатили курс" },
      { value: "8%", label: "Website → Paid Customer" },
    ],
    actions: [
      "Безкоштовна AI-діагностика",
      "Пробний урок",
      "Персональна консультація",
      "Індивідуальний план",
      "Демонстрація AI-платформи",
      "Аналіз прогалин",
      "Консультація для батьків",
      "Проста онлайн-оплата",
      "Можливість розстрочки",
      "Бонус після пробного уроку",
    ],
  },
  {
    id: "loyalty",
    num: "04",
    name: "Loyalty",
    title: "Лояльність",
    kpis: [
      { value: "80%", label: "Активність учнів на платформі" },
      { value: "70%", label: "Виконання домашніх завдань" },
      { value: "60%", label: "Продовження навчання" },
      { value: "95%", label: "Позитивні відгуки" },
    ],
    actions: [
      "AI-консультант 24/7",
      "Підтримка викладача",
      "Персональні рекомендації",
      "Аналіз прогресу",
      "Щотижневі звіти для батьків",
      "Контроль домашніх завдань",
      "Telegram-канал",
      "Нагадування",
      "Спеціальні пропозиції на продовження",
      "Робота з негативними відгуками",
    ],
  },
  {
    id: "advocacy",
    num: "05",
    name: "Advocacy",
    title: "Адвокатування",
    kpis: [
      { value: "20%", label: "Рекомендації друзям" },
      { value: "10%", label: "Згадки в соціальних мережах" },
    ],
    actions: [
      "Реферальна програма «Запроси друга»",
      "Бонуси за рекомендації",
      "Збір відгуків",
      "Історії успіху",
      "Відеовідгуки",
      "Кейси учнів",
      "Соціальні згадки",
      "Публікація результатів",
    ],
  },
];

export const conversionModel = {
  visitors: 500,
  trialRate: 0.3,
  attendanceRate: 0.7,
  paymentRate: 40 / 105,
};

export const fullFunnel = [
  { value: "10 000", label: "Reach" },
  { value: "500", label: "Website visitors" },
  { value: "150", label: "Trial registrations" },
  { value: "105", label: "Trial attendance" },
  { value: "40", label: "Paid students" },
  { value: "60%", label: "Retention" },
  { value: "20%", label: "Referrals" },
];

export const aiDiagnostic = {
  value: "120",
  roles: [
    "Первинна діагностика знань",
    "Визначення слабких тем",
    "Рекомендація формату навчання",
    "Допомога батькам у виборі програми",
    "Персоналізація навчального плану",
  ],
};

export const segments = [
  {
    name: "Grades 5–9",
    problem: ["Дитина не розуміє математику", "Прогалини в знаннях", "Низькі оцінки", "Проблеми з домашніми завданнями", "Втрата інтересу"],
    solution: ["Зрозумілі пояснення", "Індивідуальний темп", "Міні-групи 4–6 або індивідуальні заняття", "Інтерактивні тренажери", "Mind maps", "Регулярний контроль знань", "Звіти для батьків"],
    result: "Розуміння → самостійність → впевненість",
  },
  {
    name: "Grades 10–11 / NMT",
    problem: ["Прогалини", "Низькі результати пробних тестів", "Страх НМТ", "Відсутність системної підготовки"],
    solution: ["Структурована підготовка", "Реальні типи НМТ-завдань", "Регулярні тести", "Аналіз помилок", "Персональний трек слабких тем", "Симуляції НМТ", "Підтримка викладача та AI"],
    result: "Система → контроль прогресу → впевненість → готовність до НМТ",
  },
];

export const pillars = [
  { name: "Understand", desc: "Зрозуміла математика" },
  { name: "Personalize", desc: "Персональний підхід" },
  { name: "Practice", desc: "Регулярна практика" },
  { name: "Track", desc: "Контроль прогресу" },
  { name: "Support", desc: "Викладач + AI 24/7" },
];

export const beforeAfter = [
  ["Не розумію", "Знаю, як розв'язати"],
  ["Прогалини", "Системні знання"],
  ["Страх помилки", "Впевненість"],
  ["Хаотична підготовка", "Чіткий план"],
  ["Низький результат пробних тестів", "Контроль прогресу"],
];

export const trustFacts = [
  "Понад 20 років педагогічного досвіду",
  "Досвід викладання математики та інформатики",
  "Авторські навчальні матеріали",
  "Підготовка учнів до НМТ",
  "Підтверджені високі результати окремих учнів",
  "Досвід олімпіадної підготовки",
];

export const trustFlow = ["Expertise", "Methodology", "Technology", "Progress Tracking", "Trust"];

export const channels = [
  { name: "Google Ads", role: "Intent-based acquisition", focus: ["НМТ", "Математика онлайн", "Репетитор", "Пробний урок"], kpis: ["Impressions", "Clicks", "CTR", "CPC", "Conversions", "CPL"] },
  { name: "Meta Ads", role: "Audience acquisition", focus: ["Parents", "Students", "Retargeting", "Awareness"], kpis: ["Reach", "Engagement", "Clicks", "Leads", "CPL"] },
  { name: "SEO", role: "Organic acquisition", focus: ["Educational content", "NMT topics", "Math explanations"], kpis: ["Organic traffic", "Impressions", "Clicks", "CTR", "Positions"] },
  { name: "Social Media", role: "Awareness + Trust", focus: ["Instagram", "Facebook", "TikTok", "Розбір задач", "Mini lessons", "NMT tips"], kpis: ["Reach", "Engagement", "Followers"] },
  { name: "Email Marketing", role: "Retention + Repeat sales", focus: ["Useful content", "Progress", "Reminders", "Offers", "Reactivation"], kpis: ["Open rate", "CTR", "Repeat sales"] },
];

export const messageMatrix = [
  ["Підготовка до НМТ онлайн", "Google Ads", "Free diagnostic"],
  ["Складну математику можна зрозуміти", "SEO", "Visit website"],
  ["Реальні результати та корисні пояснення", "Social Media", "Follow / Visit"],
  ["Підтримка та корисний контент", "Email", "Return / Continue"],
  ["Рекомендуй NeuroMath", "Referral", "Invite a friend"],
];

export const differentiators = [
  { name: "Personalization", desc: "Індивідуальний навчальний маршрут" },
  { name: "AI 24/7", desc: "Постійна цифрова підтримка" },
  { name: "Measurable progress", desc: "Прозорий контроль результатів" },
];

export const growthStrategy = [
  { num: "01", name: "Acquisition", items: ["Google Ads", "Meta Ads", "SEO"] },
  { num: "02", name: "Trust", items: ["Reviews", "Student cases", "Content", "Results"] },
  { num: "03", name: "Scale", items: ["Referral program", "Ukrainians abroad", "Repeat sales", "Partnerships"] },
];

export const swot = {
  Strengths: ["Персоналізація", "AI consultant 24/7", "Online format", "Безкоштовний пробний урок", "Аналіз прогресу", "Сучасна методика"],
  Weaknesses: ["Новий бренд", "Мало відгуків на старті", "Залежність від paid acquisition", "Низька початкова впізнаваність"],
  Opportunities: ["Зростання онлайн-освіти", "Високий попит на НМТ", "Українці за кордоном", "AI як конкурентна перевага", "Referral marketing"],
  Threats: ["Висока конкуренція", "Цінова чутливість", "Недовіра до нового бренду", "Зростання вартості реклами", "Зміни формату НМТ"],
};

export const forecastVsTarget = [
  ["Leads / year", "300–500", "300+"],
  ["Conversion", "15–25%", "≥15%"],
  ["Students", "45–125", "45+"],
  ["Monthly revenue", "100–250K UAH", "≥100K"],
  ["Reviews / cases", "30–50", "30+"],
  ["Repeat sales", "40–60%", "≥40%"],
];

// actual: null → rendered as "—" until real data is connected
export const forecastVsActual: { kpi: string; forecast: string; actual: string | null }[] = [
  { kpi: "Website visitors", forecast: "500", actual: null },
  { kpi: "Trial registrations", forecast: "150", actual: null },
  { kpi: "AI diagnostics", forecast: "120", actual: null },
  { kpi: "Trial attendance", forecast: "105", actual: null },
  { kpi: "Paid students", forecast: "40", actual: null },
  { kpi: "Retention", forecast: "60%", actual: null },
  { kpi: "Positive reviews", forecast: "95%", actual: null },
  { kpi: "Referrals", forecast: "20%", actual: null },
];

export const measurement = [
  { area: "Website", tool: "Google Analytics 4", metrics: ["Sessions", "Traffic sources", "Users", "Leads", "Conversion rate"] },
  { area: "Google Ads", tool: "Google Ads", metrics: ["Impressions", "Clicks", "CTR", "CPC", "Conversions", "CPL"] },
  { area: "SEO", tool: "Google Search Console", metrics: ["Impressions", "Clicks", "CTR", "Organic traffic", "Average position"] },
  { area: "Email", tool: "Email platform", metrics: ["Delivery", "Open rate", "CTR", "Conversions", "Repeat sales"] },
];

export const futureIntegrations = ["Google Analytics", "Google Ads", "Google Search Console", "Meta Ads", "Email marketing platform"];

export const roadmap = ["Launch", "Acquisition", "Trust", "Optimization", "Scale"];

export const nextSteps = ["Launch campaigns", "Collect real data", "Measure funnel", "Compare Forecast vs Actual", "Optimize campaigns", "Scale successful channels"];

export const navItems = [
  ["overview", "Overview"],
  ["kpi", "Forecast KPIs"],
  ["funnel", "Sales Funnel"],
  ["value", "Value Proposition"],
  ["audience", "Target Audience"],
  ["channels", "Channels"],
  ["competitive", "Competitive Strategy"],
  ["growth", "Growth Strategy"],
  ["swot", "SWOT"],
  ["actual", "Forecast vs Actual"],
  ["measurement", "Measurement"],
  ["next", "Next Steps"],
] as const;

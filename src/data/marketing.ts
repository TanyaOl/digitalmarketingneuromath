// Central forecast config. Replace `actual: null` with real values after campaigns launch.
export type Metric = { value: string; label: string };

export const forecastKPIs: Metric[] = [
  { value: "300–500", label: "Лідів на рік" },
  { value: "15–25%", label: "Конверсія лід → оплата" },
  { value: "45–125", label: "Учнів на рік" },
  { value: "100–250 тис. грн", label: "Очікуваний дохід на місяць" },
  { value: "30–50", label: "Відгуків / кейсів" },
  { value: "40–60%", label: "Повторні продажі" },
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
    name: "Впізнаваність",
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
    name: "Розгляд",
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
      "Лендинги",
      "AI-діагностика",
      "Безкоштовний пробний урок",
      "Відгуки",
      "Кейси учнів",
      "Демонстрація переваг NeuroMath Academy",
    ],
    extra: {
      title: "Ключові слова SEO",
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
    name: "Конверсія",
    title: "Дія",
    kpis: [
      { value: "105", label: "Відвідали пробний урок" },
      { value: "40", label: "Оплатили курс" },
      { value: "8%", label: "Сайт → оплата" },
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
    name: "Лояльність",
    title: "Лояльність",
    kpis: [
      { value: "80%", label: "Активність учнів на платформі" },
      { value: "70%", label: "Виконання домашніх завдань" },
      { value: "60%", label: "Продовження навчання" },
      { value: "95%", label: "Позитивні відгуки" },
    ],
    actions: [
      "AI-підтримка навчання",
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
    name: "Адвокатування",
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
  { value: "10 000", label: "Охоплення" },
  { value: "500", label: "Відвідувачі сайту" },
  { value: "150", label: "Записи на пробний урок" },
  { value: "105", label: "Відвідали пробний урок" },
  { value: "40", label: "Оплатили курс" },
  { value: "60%", label: "Утримання" },
  { value: "20%", label: "Рекомендації" },
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
    name: "5–9 класи",
    problem: ["Дитина не розуміє математику", "Прогалини в знаннях", "Низькі оцінки", "Проблеми з домашніми завданнями", "Втрата інтересу"],
    solution: ["Зрозумілі пояснення", "Індивідуальний темп", "Міні-групи 4–6 або індивідуальні заняття", "Інтерактивні тренажери", "Mind maps", "Регулярний контроль знань", "Звіти для батьків"],
    result: "Розуміння → самостійність → впевненість",
  },
  {
    name: "10–11 класи / НМТ",
    problem: ["Прогалини", "Низькі результати пробних тестів", "Страх НМТ", "Відсутність системної підготовки"],
    solution: ["Структурована підготовка", "Реальні типи НМТ-завдань", "Регулярні тести", "Аналіз помилок", "Персональний трек слабких тем", "Симуляції НМТ", "Підтримка викладача та AI"],
    result: "Система → контроль прогресу → впевненість → готовність до НМТ",
  },
];

export const pillars = [
  { name: "Розуміння", desc: "Зрозуміла математика" },
  { name: "Персоналізація", desc: "Персональний підхід" },
  { name: "Практика", desc: "Регулярна практика" },
  { name: "Контроль", desc: "Контроль прогресу" },
  { name: "Підтримка", desc: "Викладач + AI-підтримка" },
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

export const trustFlow = ["Експертність", "Методика", "Технології", "Контроль прогресу", "Довіра"];

export const channels = [
  { name: "Google Ads", role: "Залучення за пошуковим наміром", focus: ["НМТ", "Математика онлайн", "Репетитор", "Пробний урок"], kpis: ["Покази", "Кліки", "CTR", "CPC", "Конверсії", "CPL"] },
  { name: "Meta Ads", role: "Залучення аудиторії", focus: ["Батьки", "Учні", "Ретаргетинг", "Впізнаваність"], kpis: ["Охоплення", "Engagement", "Clicks", "Leads", "CPL"] },
  { name: "SEO", role: "Органічне залучення", focus: ["Освітній контент", "Теми НМТ", "Пояснення з математики"], kpis: ["Органічний трафік", "Покази", "Кліки", "CTR", "Позиції"] },
  { name: "Соцмережі", role: "Впізнаваність + довіра", focus: ["Instagram", "Facebook", "TikTok", "Розбір задач", "Міні-уроки", "Поради до НМТ"], kpis: ["Охоплення", "Engagement", "Followers"] },
  { name: "Email-маркетинг", role: "Retention + Повторні продажі", focus: ["Корисний контент", "Прогрес", "Нагадування", "Пропозиції", "Реактивація"], kpis: ["Open rate", "CTR", "Повторні продажі"] },
];

export const messageMatrix = [
  ["Підготовка до НМТ онлайн", "Google Ads", "Безкоштовна діагностика"],
  ["Складну математику можна зрозуміти", "SEO", "Перейти на сайт"],
  ["Реальні результати та корисні пояснення", "Соцмережі", "Підписатися / Перейти"],
  ["Підтримка та корисний контент", "Email", "Повернутися / Продовжити"],
  ["Рекомендуй NeuroMath", "Реферальна програма", "Запросити друга"],
];

export const differentiators = [
  { name: "Персоналізація", desc: "Індивідуальний навчальний маршрут" },
  { name: "AI-підтримка", desc: "AI-інструменти та цифрова підтримка" },
  { name: "Вимірюваний прогрес", desc: "Прозорий контроль результатів" },
];

export const growthStrategy = [
  { num: "01", name: "Залучення", items: ["Google Ads", "Meta Ads", "SEO"] },
  { num: "02", name: "Довіра", items: ["Відгуки", "Кейси учнів", "Контент", "Результати"] },
  { num: "03", name: "Масштабування", items: ["Реферальна програма", "Українці за кордоном", "Повторні продажі", "Партнерства"] },
];

export const swot = {
  "Сильні сторони": ["Персоналізація", "AI-підтримка навчання", "Онлайн-формат", "Безкоштовний пробний урок", "Аналіз прогресу", "Сучасна методика"],
  "Слабкі сторони": ["Новий бренд", "Мало відгуків на старті", "Залежність від платної реклами", "Низька початкова впізнаваність"],
  "Можливості": ["Зростання онлайн-освіти", "Високий попит на НМТ", "Українці за кордоном", "AI як конкурентна перевага", "Реферальний маркетинг"],
  "Загрози": ["Висока конкуренція", "Цінова чутливість", "Недовіра до нового бренду", "Зростання вартості реклами", "Зміни формату НМТ"],
};

export const forecastVsTarget = [
  ["Лідів на рік", "300–500", "300+"],
  ["Конверсія", "15–25%", "≥15%"],
  ["Учні", "45–125", "45+"],
  ["Дохід на місяць", "100–250 тис. грн", "≥100 тис."],
  ["Відгуків / кейсів", "30–50", "30+"],
  ["Повторні продажі", "40–60%", "≥40%"],
];

// actual: null → rendered as "—" until real data is connected
export const forecastVsActual: { kpi: string; forecast: string; actual: string | null }[] = [
  { kpi: "Відвідувачі сайту", forecast: "500", actual: null },
  { kpi: "Записи на пробний урок", forecast: "150", actual: null },
  { kpi: "AI-діагностики", forecast: "120", actual: null },
  { kpi: "Відвідали пробний урок", forecast: "105", actual: null },
  { kpi: "Оплатили курс", forecast: "40", actual: null },
  { kpi: "Утримання", forecast: "60%", actual: null },
  { kpi: "Позитивні відгуки", forecast: "95%", actual: null },
  { kpi: "Рекомендації", forecast: "20%", actual: null },
];

export const measurement = [
  { area: "Сайт", tool: "Google Analytics 4", metrics: ["Сесії", "Джерела трафіку", "Користувачі", "Ліди", "Конверсія"] },
  { area: "Google Ads", tool: "Google Ads", metrics: ["Покази", "Кліки", "CTR", "CPC", "Конверсії", "CPL"] },
  { area: "SEO", tool: "Google Search Console", metrics: ["Покази", "Кліки", "CTR", "Органічний трафік", "Середня позиція"] },
  { area: "Email", tool: "Email-платформа", metrics: ["Delivery", "Open rate", "CTR", "Conversions", "Повторні продажі"] },
];

export const futureIntegrations = ["Google Analytics", "Google Ads", "Google Search Console", "Meta Ads", "Email-платформа"];

export const roadmap = ["Запуск", "Залучення", "Довіра", "Оптимізація", "Масштабування"];

export const nextSteps = ["Запуск кампаній", "Збір реальних даних", "Вимірювання воронки", "Порівняння прогнозу й факту", "Оптимізація кампаній", "Масштабування успішних каналів"];

export const navItems = [
  ["overview", "Огляд"],
  ["kpi", "Прогнозні KPI"],
  ["funnel", "Воронка продажів"],
  ["value", "Ціннісна пропозиція"],
  ["audience", "Цільова аудиторія"],
  ["channels", "Канали"],
  ["competitive", "Конкурентна стратегія"],
  ["growth", "Стратегія зростання"],
  ["swot", "SWOT"],
  ["creatives", "Креативи"],
  ["pages", "Приклади сторінок"],
  ["actual", "Прогноз і факт"],
  ["measurement", "Вимірювання"],
  ["next", "Наступні кроки"],
] as const;

// Креативи для соцмереж та приклади сторінок (з Google Drive)
import car1 from "@/assets/creatives/car1.png.asset.json";
import car2 from "@/assets/creatives/car2.png.asset.json";
import car3 from "@/assets/creatives/car3.png.asset.json";
import car4 from "@/assets/creatives/car4.png.asset.json";
import car5 from "@/assets/creatives/car5.png.asset.json";
import car6 from "@/assets/creatives/car6.png.asset.json";
import car7 from "@/assets/creatives/car7.png.asset.json";
import fbH from "@/assets/creatives/fb_h.png.asset.json";
import fbSq from "@/assets/creatives/fb_sq.png.asset.json";
import gSerp from "@/assets/creatives/g_serp.png.asset.json";
import gStrat from "@/assets/creatives/g_strat.png.asset.json";
import tiktok from "@/assets/creatives/tiktok.png.asset.json";
import fbPage from "@/assets/creatives/fb_page.png.asset.json";
import igPage1 from "@/assets/creatives/ig_page1.png.asset.json";
import igPage2 from "@/assets/creatives/ig_page2.png.asset.json";

export const carousel = [
  { src: car1.url, title: "5 типових помилок на НМТ" },
  { src: car2.url, title: "Поспіх у розв’язуванні" },
  { src: car3.url, title: "Помилки у формулах" },
  { src: car4.url, title: "Помилки з графіками" },
  { src: car5.url, title: "Неуважне читання" },
  { src: car6.url, title: "Нестача часу" },
  { src: car7.url, title: "Безкоштовний пробний урок" },
];

export const creatives = [
  { channel: "Facebook", title: "Горизонтальний пост", src: fbH.url },
  { channel: "Facebook", title: "Квадратний пост", src: fbSq.url },
  { channel: "TikTok", title: "Мокап TikTok", src: tiktok.url },
  { channel: "Google Ads", title: "Пошукова видача «підготовка до НМТ»", src: gSerp.url },
  { channel: "Google Ads", title: "Стратегія Google Ads", src: gStrat.url },
];

export const pageExamples = [
  { channel: "Instagram", title: "Профіль «Математика для майбутнього»", src: igPage1.url },
  { channel: "Instagram", title: "Профіль «Математика легко й сучасно»", src: igPage2.url },
  { channel: "Facebook", title: "Сторінка NeuroMath Academy у Facebook", src: fbPage.url },
];

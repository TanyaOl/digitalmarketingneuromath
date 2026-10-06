import { createFileRoute } from "@tanstack/react-router";
import { createContext, Fragment, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Brain, ChevronLeft, ChevronRight, Maximize2, Minimize2, Printer, Check, AlertCircle, CircleDot, Mail, FileText, Search, Users, Target, Sparkles, ExternalLink, LayoutGrid, RefreshCw, Paperclip, X } from "lucide-react";
import * as D from "@/data/marketing";
import siteShot from "@/assets/creatives/site2.png.asset.json";
import report1 from "@/assets/creatives/report1.png.asset.json";

export const Route = createFileRoute("/marketing")({
  head: () => ({
    meta: [
      { title: "Запуск бренду NeuroMath Academy — маркетингова презентація" },
      { name: "description", content: "Від маркетингового дослідження до системи залучення перших клієнтів NeuroMath Academy: стратегія, канали, шлях клієнта, прогноз KPI." },
      { property: "og:title", content: "Запуск бренду NeuroMath Academy" },
      { property: "og:description", content: "Маркетингова презентація: дослідження, стратегія, канали, прогрів ліда та прогнозна KPI-модель." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

/* ---------- primitives ---------- */
const W = 1600;
const H = 900;

const rise = (i: number): CSSProperties => ({ animationDelay: `${i * 90}ms` });
const R = "animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both";

function Scaled({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0.5);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      if (!e) return;
      const { width, height } = e.contentRect;
      setS(Math.min(width / W, height > 0 ? height / H : Infinity));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative h-full w-full">
      <div className="absolute top-1/2 left-1/2" style={{ width: W, height: H, transform: `translate(-50%,-50%) scale(${s})` }}>
        {children}
      </div>
    </div>
  );
}

const SITE = "https://neuromath-academydg.vercel.app/";
const STAGES = [
  ["RESEARCH", "ДОСЛІДЖЕННЯ", 2, "Ринок · Конкуренти · Аудиторія"],
  ["STRATEGY", "СТРАТЕГІЯ", 4, "Позиціонування · Цінність"],
  ["PROMOTION", "ПРОСУВАННЯ", 5, "Google · Meta · Social · SEO"],
  ["CUSTOMER JOURNEY", "ШЛЯХ КЛІЄНТА", 8, "Тест · Email · PDF · Пробний урок"],
  ["ANALYTICS", "АНАЛІТИКА", 10, "KPI-дерево · План / факт"],
  ["LAUNCH", "ЗАПУСК", 11, "0–3 міс · перші фактичні дані"],
  ["SCALING", "МАСШТАБУВАННЯ", 11, "6–12 міс · лише перевірене"],
] as const;
const stageOf = (n: number) => (n <= 3 ? 0 : n === 4 ? 1 : n <= 7 ? 2 : n <= 9 ? 3 : n === 10 ? 4 : n === 11 ? 5 : 6);
const GoCtx = createContext<(n: number) => void>(() => {});
const TITLES = ["Запуск бренду", "Дослідження", "Цільова аудиторія", "Стратегія", "Канали", "Social Media", "Paid Media", "Шлях клієнта", "Прогрів ліда", "KPI", "Roadmap", "Готова система"];

function StageNav({ n }: { n: number }) {
  const go = useContext(GoCtx);
  const a = stageOf(n);
  return (
    <nav className="flex min-w-0 flex-1 items-center gap-1">
      {STAGES.map(([en, ua, t], k) => {
        const st = k < a ? "done" : k === a ? "active" : "future";
        return (
          <Fragment key={en}>
            {k > 0 && <span className={`h-0.5 min-w-2 flex-1 rounded-full ${k <= a ? "bg-primary" : "bg-border"}`} />}
            <button onClick={() => go(t)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-1.5 py-1 text-[11px] whitespace-nowrap transition hover:bg-accent ${st === "active" ? "font-extrabold text-primary" : st === "done" ? "font-semibold text-primary/60" : "font-medium text-muted-foreground/70"}`}>
              <span className={`grid size-[18px] place-items-center rounded-full text-[9px] font-bold ${st === "active" ? "bg-brand text-primary-foreground ring-4 ring-primary/15" : st === "done" ? "bg-primary/15 text-primary" : "border bg-card"}`}>{st === "done" ? <Check className="size-3" /> : String(k + 1).padStart(2, "0")}</span>
              {en} / {ua}
            </button>
          </Fragment>
        );
      })}
    </nav>
  );
}

function Frame({ n, kicker, title, sub, badge, children }: { n: number; kicker: string; title: ReactNode; sub?: string; badge?: ReactNode; children: ReactNode }) {
  return (
    <div className="slide-canvas relative flex h-full w-full flex-col overflow-hidden bg-background px-20 pt-14 pb-12">
      <div className="slide-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-primary/10 blur-3xl" />
      <div className="relative -mx-6 -mt-6 flex items-center gap-4">
        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-primary-foreground"><Brain className="size-4" /></div>
        <StageNav n={n} />
        <span className="shrink-0 text-sm font-bold text-muted-foreground">{String(n).padStart(2, "0")} / 12</span>
      </div>
      <div className="relative mt-7">
        <div className="mb-2 flex items-center gap-3"><span className="text-sm font-bold tracking-[0.14em] text-primary uppercase">{kicker}</span>{badge}</div>
        <h2 className={`max-w-[1200px] text-[52px] leading-[1.05] font-extrabold tracking-tight ${R}`}>{title}</h2>
        {sub && <p className={`mt-3 max-w-[1100px] text-xl text-muted-foreground ${R}`} style={rise(1)}>{sub}</p>}
      </div>
      <div className="relative mt-8 min-h-0 flex-1">{children}</div>
    </div>
  );
}

const Badge = ({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "warn" }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold tracking-wider uppercase ${tone === "warn" ? "bg-spark/20 text-spark-foreground" : "bg-accent text-accent-foreground"}`}>{children}</span>
);

const Box = ({ children, className = "", i = 0 }: { children: ReactNode; className?: string; i?: number }) => (
  <div className={`rounded-3xl border bg-card p-6 shadow-card ${R} ${className}`} style={rise(i + 2)}>{children}</div>
);

const Flow = ({ items, className = "" }: { items: string[]; className?: string }) => (
  <div className={`flex flex-wrap items-center gap-2 ${className}`}>
    {items.map((t, i) => (
      <span key={t} className={`flex items-center gap-2 ${R}`} style={rise(i + 4)}>
        <span className={`rounded-full px-4 py-2 text-sm font-semibold ${i === items.length - 1 ? "bg-brand text-primary-foreground" : "border bg-card"}`}>{t}</span>
        {i < items.length - 1 && <ChevronRight className="size-4 text-primary" />}
      </span>
    ))}
  </div>
);

function Browser({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <a href={SITE} target="_blank" rel="noopener noreferrer" className={`group/br relative block overflow-hidden rounded-2xl border bg-card shadow-glow transition duration-300 hover:-translate-y-0.5 hover:border-primary/50 ${className}`}>
      <span className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-primary/0 opacity-0 transition duration-300 group-hover/br:bg-primary/10 group-hover/br:opacity-100"><span className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 text-lg font-bold text-primary shadow-glow">Відкрити сайт NeuroMath <ExternalLink className="size-4" /></span></span>
      <div className="flex items-center gap-2 border-b bg-muted px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-destructive/60" /><span className="size-2.5 rounded-full bg-spark/70" /><span className="size-2.5 rounded-full bg-teal/60" />
        <span className="ml-3 rounded-md bg-card px-3 py-0.5 text-xs text-muted-foreground">neuromath-academydg.vercel.app</span>
      </div>
      <img src={src} alt={alt} className="block w-full" />
    </a>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(to);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1200);
      setV(Math.round(to * (0.6 + 0.4 * (1 - Math.pow(1 - p, 3)))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v.toLocaleString("uk-UA")}{suffix}</>;
}

/* ---------- slides ---------- */
const Img = ({ src, alt, label, i = 0, className = "", fit = "contain" }: { src: string; alt: string; label?: string; i?: number; className?: string; fit?: "contain" | "cover-top" }) => (
  <figure className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-card ${R} ${className}`} style={rise(i)}>
    <div className="min-h-0 flex-1 bg-muted">
      <img src={src} alt={alt} className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover object-top"}`} />
    </div>
    {label && <figcaption className="border-t px-4 py-2 text-[15px] font-semibold">{label}</figcaption>}
  </figure>
);

function S1() {
  const chips = ["Дослідження", "Стратегія", "Digital", "Конверсія", "Аналітика"];
  return (
    <Frame n={1} kicker="Запуск бренду" badge={<Badge>Новий проєкт · підготовка до запуску</Badge>} title={<>Запуск нового бренду <span className="text-brand">NeuroMath Academy</span></>} sub="Від маркетингового дослідження до системи залучення перших клієнтів">
      <div className="grid h-full grid-cols-[300px_1fr] gap-10">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            {chips.map((c, i) => (
              <div key={c} className={`flex items-center gap-3 rounded-2xl border bg-card px-5 py-3.5 shadow-card ${R}`} style={rise(i + 3)}>
                <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-bold text-primary-foreground">{i + 1}</span>
                <span className="text-lg font-semibold">{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`flex min-h-0 flex-col gap-5 ${R}`} style={rise(3)}>
          <Browser src={siteShot.url} alt="Актуальний сайт NeuroMath Academy" className="min-h-0" />
          <Flow className="justify-center" items={["Дослідження", "Стратегія", "Запуск"]} />
        </div>
      </div>
    </Frame>
  );
}

function S2() {
  const nums = [
    { v: 213850, l: "потенційна аудиторія / місяць", I: Users },
    { v: 55500, l: "потенційна аудиторія Google Ads", I: Search },
    { v: 158350, l: "потенційна аудиторія Facebook Ads", I: Target },
  ];
  const facts = [["Попит", "Сформований / стабільний"], ["Конкуренція", "Висока"], ["Пріоритет запуску", "10–11 класи / НМТ"], ["Наступне масштабування", "5–9 класи"]];
  const comp = ["Mathema", "BUKI", "SuperProf", "Ispyt", "Math Corporation"];
  return (
    <Frame n={2} kicker="Дослідження ринку" title="Що показало маркетингове дослідження?">
      <div className="grid h-full grid-cols-[1.55fr_1fr] gap-6">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-4">
            {nums.map(({ v, l, I }, i) => (
              <Box key={l} i={i}>
                <I className="size-7 text-primary" />
                <div className="mt-3 text-[52px] leading-none font-extrabold text-brand"><Counter to={v} /></div>
                <div className="mt-3 text-lg font-medium">{l}</div>
              </Box>
            ))}
          </div>
          <p className={`text-[15px] text-muted-foreground ${R}`} style={rise(4)}>Оцінки за результатами маркетингового дослідження · не фактичний трафік NeuroMath</p>
          <div className="grid grid-cols-4 gap-4">
            {facts.map(([k, v], i) => (
              <Box key={k} i={i + 4} className="p-5"><div className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">{k}</div><div className="mt-2 text-xl font-bold">{v}</div></Box>
            ))}
          </div>
          <Box i={8} className="flex items-center gap-5 py-5">
            <span className="shrink-0 text-sm font-bold tracking-wider text-muted-foreground uppercase">Конкуренти</span>
            <div className="flex flex-wrap gap-2">{comp.map((c) => <span key={c} className="rounded-full border px-4 py-1.5 text-base font-medium">{c}</span>)}</div>
          </Box>
        </div>
        <div className={`flex flex-col justify-center rounded-3xl bg-hero p-10 text-night-foreground ${R}`} style={rise(6)}>
          <Badge>Головний висновок</Badge>
          <p className="mt-6 text-[44px] leading-tight font-extrabold">Не конкурувати ціною.</p>
          <p className="mt-4 text-[28px] leading-snug font-semibold text-cyan">Конкурувати результатом, персоналізацією, методикою та довірою.</p>
        </div>
      </div>
    </Frame>
  );
}

function S3() {
  const segs = [
    { n: "01", tag: "Пріоритет на старті", t: "10–11 класи / НМТ", buyer: "батьки + учень", need: "системна підготовка та високий результат НМТ", p: ["Прогалини", "Низькі результати тестів", "Страх НМТ"], s: ["Структурована підготовка", "Практика НМТ", "Аналіз помилок", "Персональний прогрес"] },
    { n: "02", tag: "Масштабування", t: "5–9 класи", buyer: "батьки", need: "зрозуміла математика та впевненість дитини", p: ["Нерозуміння", "Прогалини", "Низька впевненість"], s: ["Зрозуміле пояснення", "Практика", "Індивідуальний темп", "Контроль прогресу"] },
  ];
  const Chain = ({ items, tone }: { items: string[]; tone: string }) => (
    <div className="flex flex-wrap items-center gap-1.5">{items.map((x, i) => <span key={x} className="flex items-center gap-1.5"><span className={`rounded-lg px-3 py-1 text-[15px] font-medium ${tone}`}>{x}</span>{i < items.length - 1 && <ChevronRight className="size-4 text-muted-foreground" />}</span>)}</div>
  );
  return (
    <Frame n={3} kicker="Цільова аудиторія" title="Кого залучаємо і яку проблему вирішуємо?">
      <div className="grid h-full grid-cols-[1fr_1fr_0.8fr] gap-6">
        {segs.map((g, i) => (
          <Box key={g.t} i={i} className="flex flex-col gap-4 p-7">
            <div className="flex items-center justify-between"><span className="text-4xl font-extrabold text-brand">{g.n}</span><Badge>{g.tag}</Badge></div>
            <div className="text-[30px] font-extrabold">{g.t}</div>
            <div className="text-lg"><b>Покупець:</b> {g.buyer}</div>
            <div className="text-lg"><b>Потреба:</b> {g.need}</div>
            <div><div className="mb-2 text-sm font-bold tracking-wider text-destructive uppercase">Проблеми</div><Chain items={g.p} tone="bg-destructive/10" /></div>
            <div><div className="mb-2 text-sm font-bold tracking-wider text-primary uppercase">Рішення</div><Chain items={g.s} tone="bg-accent text-accent-foreground" /></div>
          </Box>
        ))}
        <div className={`flex flex-col justify-center rounded-3xl bg-hero p-8 text-night-foreground ${R}`} style={rise(4)}>
          <div className="text-sm font-bold tracking-wider text-cyan uppercase">Головний інсайт</div>
          <p className="mt-4 text-[32px] leading-tight font-extrabold">Клієнт шукає не просто урок.</p>
          <p className="mt-3 text-2xl leading-snug font-semibold text-cyan">Він шукає зрозумілий і вимірюваний результат.</p>
        </div>
      </div>
    </Frame>
  );
}

function S4() {
  const principles = ["Персоналізація", "Практика та робота над помилками", "Видимий прогрес", "AI-інструменти та цифрова підтримка"];
  return (
    <Frame n={4} kicker="Позиціонування та стратегія" title="Як дослідження перетворилося на стратегію">
      <div className="flex h-full flex-col gap-6">
        <Flow items={["Проблема", "Інсайт", "Позиціонування", "Маркетингове рішення"]} />
        <div className="grid flex-1 grid-cols-[1.2fr_1fr] gap-6">
          <div className={`flex flex-col justify-between rounded-3xl bg-hero p-10 text-night-foreground ${R}`} style={rise(3)}>
            <div>
              <div className="text-sm font-bold tracking-wider text-cyan uppercase">Позиціонування</div>
              <p className="mt-3 text-[56px] leading-[1.05] font-extrabold">«Опануй математику впевнено»</p>
              <p className="mt-4 text-2xl text-night-foreground/80">Математика, яку легко зрозуміти</p>
            </div>
            <div>
              <div className="text-sm font-bold tracking-wider text-cyan uppercase">Ціннісна пропозиція</div>
              <div className="mt-3 flex items-center gap-3 text-2xl font-bold">
                <span>Зрозуміти</span><ChevronRight className="text-cyan" /><span>Відпрацювати</span><ChevronRight className="text-cyan" /><span>Побачити результат</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Box i={3} className="flex-1">
              <div className="text-sm font-bold tracking-wider text-primary uppercase">Стратегічні принципи</div>
              <ol className="mt-4 space-y-3.5">{principles.map((p, i) => <li key={p} className="flex items-center gap-4"><span className="text-2xl font-extrabold text-brand">0{i + 1}</span><span className="text-xl font-semibold">{p}</span></li>)}</ol>
            </Box>
            <Box i={4}>
              <div className="text-sm font-bold tracking-wider text-primary uppercase">Точки входу в конверсію</div>
              <div className="mt-3 flex items-center gap-3"><span className="rounded-xl bg-brand px-4 py-2.5 text-lg font-bold text-primary-foreground">Безкоштовний тест рівня</span><span className="text-2xl font-bold text-primary">+</span><span className="rounded-xl bg-brand px-4 py-2.5 text-lg font-bold text-primary-foreground">Безкоштовний пробний урок</span></div>
            </Box>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function S5() {
  const ch = [
    ["Google Ads", "Перехоплення сформованого попиту"],
    ["Meta Ads", "Впізнаваність + лідогенерація + ремаркетинг"],
    ["Instagram / TikTok", "Контент + охоплення + довіра"],
    ["Facebook", "Батьківська аудиторія + довіра + лідогенерація"],
    ["SEO", "Довгостроковий органічний попит"],
    ["Email / SendPulse", "Персоналізація + прогрів + повернення до пробного уроку"],
  ];
  const line = [["Впізнаваність", "Meta · Instagram · TikTok"], ["Інтерес", "Google · SEO · Facebook"], ["Лід", "Тест рівня"], ["Прогрів", "Email / SendPulse"], ["Пробний урок", "Сайт · Email"], ["Покупка", "Консультація"]];
  return (
    <Frame n={5} kicker="Стратегія каналів" title="Як бренд буде виходити на ринок?" sub="Кожен канал має одну чітку роль у воронці.">
      <div className="flex h-full flex-col gap-6">
        <div className="grid flex-1 grid-cols-3 gap-4">
          {ch.map(([n, r], i) => (
            <Box key={n} i={i} className="flex flex-col justify-center p-6">
              <div className="text-2xl font-extrabold">{n}</div>
              <div className="mt-2 text-lg font-medium text-primary">{r}</div>
            </Box>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-2">
          {line.map(([s, c], i) => (
            <div key={s} className={R} style={rise(i + 7)}>
              <div className="rounded-xl bg-brand px-3 py-3 text-center text-lg font-bold text-primary-foreground" style={{ opacity: 0.55 + i * 0.09 }}>{s}</div>
              <div className="mt-2 text-center text-sm text-muted-foreground">{c}</div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function S6() {
  const car = D.carousel;
  const pg = D.pageExamples;
  const cr = D.creatives;
  const pillars = ["Навчальний контент", "НМТ", "Методика / експертність", "Конверсійний контент"];
  return (
    <Frame n={6} kicker="Social Media" badge={<Badge tone="warn">Концепція · канали ще не запущені</Badge>} title="Як NeuroMath буде виглядати в Social Media">
      <div className="grid h-[calc(100%-64px)] grid-cols-[1.35fr_1fr_1fr] gap-5">
        <div className={`flex min-h-0 flex-col gap-3 rounded-3xl border bg-card p-4 shadow-card ${R}`} style={rise(2)}>
          <div className="text-lg font-bold">Instagram</div>
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
            <img src={pg[0]!.src} alt={pg[0]!.title} className="h-full w-full rounded-xl bg-muted object-contain" />
            <div className="grid min-h-0 grid-rows-2 gap-3">
              <img src={car[0]!.src} alt={car[0]!.title} className="h-full w-full rounded-xl bg-muted object-contain" />
              <img src={car[2]!.src} alt={car[2]!.title} className="h-full w-full rounded-xl bg-muted object-contain" />
            </div>
          </div>
          <div className="text-[15px] text-muted-foreground">Профіль + карусель «Типові помилки на НМТ»</div>
        </div>
        <div className={`flex min-h-0 flex-col gap-3 rounded-3xl border bg-card p-4 shadow-card ${R}`} style={rise(3)}>
          <div className="text-lg font-bold">TikTok</div>
          <img src={cr[2]!.src} alt={cr[2]!.title} className="min-h-0 w-full flex-1 rounded-xl bg-muted object-contain" />
          <div className="text-[15px] text-muted-foreground">Профіль і обкладинки відео</div>
        </div>
        <div className={`flex min-h-0 flex-col gap-3 rounded-3xl border bg-card p-4 shadow-card ${R}`} style={rise(4)}>
          <div className="text-lg font-bold">Facebook</div>
          <img src={pg[2]!.src} alt={pg[2]!.title} className="min-h-0 w-full flex-1 rounded-xl bg-muted object-contain" />
          <div className="text-[15px] text-muted-foreground">Сторінка для батьківської аудиторії</div>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between">
        <div className="flex gap-2">{pillars.map((d, i) => <span key={d} className="rounded-full bg-accent px-3 py-1.5 text-[15px] font-semibold text-accent-foreground">{i + 1}. {d}</span>)}</div>
        <Flow items={["Контент", "Користь", "Довіра", "Сайт"]} />
      </div>
    </Frame>
  );
}

function S7() {
  const cr = D.creatives;
  const Steps = ({ items }: { items: string[] }) => <Flow items={items} />;
  return (
    <Frame n={7} kicker="Paid Media" badge={<Badge tone="warn">Концепція · кампанії ще не запущені</Badge>} title="Як будемо перехоплювати та формувати попит">
      <div className="grid h-full grid-cols-2 gap-6">
        <div className="flex min-h-0 flex-col gap-4">
          <div className="text-2xl font-extrabold">Google Search · <span className="text-primary">перехоплення попиту</span></div>
          <Img src={cr[3]!.src} alt={cr[3]!.title} i={2} className="flex-1" label="«Підготовка до НМТ з математики» · «Безкоштовний пробний урок»" />
          <Steps items={["Сформований попит", "Google Search", "Сайт"]} />
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          <div className="text-2xl font-extrabold">Meta Ads · <span className="text-primary">формування попиту</span></div>
          <div className="grid min-h-0 flex-1 grid-cols-[1.4fr_1fr] gap-4">
            <Img src={cr[0]!.src} alt={cr[0]!.title} i={3} label="Креатив для стрічки" />
            <Img src={D.carousel[6]!.src} alt={D.carousel[6]!.title} i={4} label="Пробний урок" />
          </div>
          <Steps items={["Впізнаваність", "Інтерес", "Ремаркетинг"]} />
        </div>
      </div>
    </Frame>
  );
}

function S8() {
  const st = ["Трафік", "Сайт", "Тест рівня", "Лід", "Діагностика", "Пробний урок", "Оплата", "Навчання", "Результат", "Повтор / рекомендація"];
  const beh = ["Побачив", "Перейшов", "Пройшов тест", "Залишив контакт", "Записався", "Відвідав", "Оплатив", "Навчається", "Отримує результат", "Рекомендує"];
  const layers = [
    ["Залучення", "Google Ads · Meta Ads · SEO", 0, 3],
    ["Довіра / впізнаваність", "Instagram · TikTok · Facebook", 0, 4],
    ["Прогрів / утримання", "Email · ремаркетинг · реферальна програма", 4, 10],
  ] as const;
  return (
    <Frame n={8} kicker="Шлях клієнта" title="Як користувач перетворюється на клієнта" sub="Від першого контакту — до результату та рекомендації.">
      <div className="flex h-full flex-col justify-center gap-6">
        <div className="relative grid grid-cols-10 gap-2">
          <div className="absolute top-1/2 right-6 left-6 h-1 -translate-y-1/2 rounded-full bg-brand opacity-30" />
          {st.map((s, i) => (
            <div key={s} className={`relative flex h-[120px] flex-col justify-between rounded-2xl bg-brand p-3 text-primary-foreground shadow-glow ${R}`} style={{ ...rise(i), opacity: 1 }}>
              <span className="text-sm font-bold opacity-75">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[17px] leading-tight font-bold">{s}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-10 gap-2">
          {beh.map((b, i) => <div key={b} className={`rounded-xl border bg-card p-2.5 text-center text-[15px] font-medium ${R}`} style={rise(i + 2)}>{b}</div>)}
        </div>
        <div className="flex flex-col gap-2">
          {layers.map(([n, c, a, b], i) => (
            <div key={n} className="grid grid-cols-10 gap-2">
              <div className={`flex items-center justify-between rounded-xl bg-accent px-4 py-2.5 ${R}`} style={{ gridColumn: `${a + 1} / ${b + 1}`, ...rise(i + 10) }}>
                <span className="text-[15px] font-bold tracking-wider text-accent-foreground uppercase">{n}</span>
                <span className="text-[15px] font-medium">{c}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function S9() {
  const groups = [
    { t: "Сильні", I: Check, cls: "text-teal", items: "Числа та вирази · Рівняння · Ймовірність" },
    { t: "Увага", I: CircleDot, cls: "text-spark-foreground", items: "Функції · Планіметрія" },
    { t: "Повторити", I: AlertCircle, cls: "text-destructive", items: "Стереометрія · Тригонометрія" },
  ];
  return (
    <Frame n={9} kicker="Прогрів ліда" title="Як перетворити інтерес на готовність купити" sub="Персоналізація починається ще до першого уроку.">
      <div className="grid h-[calc(100%-84px)] grid-cols-[35fr_30fr_35fr] gap-6">
        <div className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-glow ${R}`} style={rise(2)}>
          <div className="flex items-center gap-2 border-b bg-muted px-4 py-2.5 text-[15px] font-semibold"><Mail className="size-4 text-primary" /> Персональний звіт · результат тесту</div>
          <img src={report1.url} alt="Персональний звіт NeuroMath, сторінка 1" className="min-h-0 w-full flex-1 object-cover object-top" />
        </div>
        <div className="flex flex-col gap-4">
          <div className={`rounded-3xl bg-hero p-6 text-center text-night-foreground ${R}`} style={rise(3)}>
            <div className="text-sm font-bold tracking-wider text-cyan uppercase">Безкоштовний тест рівня</div>
            <div className="mt-2 text-[64px] leading-none font-extrabold">34/45</div>
            <div className="mt-1 text-4xl font-extrabold text-cyan">76%</div>
          </div>
          {groups.map(({ t, I, cls, items }, i) => (
            <Box key={t} i={i + 2} className="p-4">
              <div className={`flex items-center gap-2 text-[15px] font-bold uppercase ${cls}`}><I className="size-5" />{t}</div>
              <div className="mt-1 text-lg font-medium">{items}</div>
            </Box>
          ))}
        </div>
        <div className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-glow ${R}`} style={rise(4)}>
          <div className="flex items-center gap-2 border-b bg-muted px-4 py-2.5 text-[15px] font-semibold"><FileText className="size-4 text-primary" /> Персональний PDF · план підготовки</div>
          <img src={report2.url} alt="Персональний звіт NeuroMath, сторінка 2" className="min-h-0 w-full flex-1 object-cover object-top" />
        </div>
      </div>
      <Flow className="absolute right-0 bottom-0 left-0 justify-center" items={["Тест", "Результат", "Email", "PDF", "Пробний урок", "Покупка"]} />
    </Frame>
  );
}

function S10() {
  const tree = [
    ["Впізнаваність", "Reach · Impressions · CPM · Video Views"],
    ["Трафік", "Sessions · CTR · CPC"],
    ["Лід", "Test Completions · Leads · CPL"],
    ["Пробний урок", "Bookings · Attendance · Cost per Trial"],
    ["Перша покупка", "New Students · Conversion · CAC · Revenue"],
    ["Утримання", "Retention · Repeat · Referral"],
  ];
  const m = D.conversionModel;
  const v = m.visitors;
  const trial = Math.round(v * m.trialRate);
  const att = Math.round(trial * m.attendanceRate);
  const paid = Math.round(att * m.paymentRate);
  return (
    <Frame n={10} kicker="Прогноз і KPI" badge={<Badge tone="warn">Прогноз · не фактичні результати</Badge>} title="Як будемо вимірювати ефективність після запуску">
      <div className="grid h-full grid-cols-[1.2fr_1fr] gap-6">
        <div className="flex flex-col-reverse justify-end gap-2.5">
          {tree.map(([n, k], i) => (
            <div key={n} className={`grid grid-cols-[210px_1fr] items-center gap-4 rounded-2xl border bg-card px-5 py-3.5 shadow-card ${R}`} style={rise(i + 1)}>
              <span className="text-lg font-bold"><span className="mr-2 text-primary">{i + 1}</span>{n}</span>
              <span className="text-[17px] text-muted-foreground">{k}</span>
            </div>
          ))}
          <div className="text-sm font-bold tracking-wider text-muted-foreground uppercase">KPI-дерево · знизу вгору</div>
        </div>
        <div className="flex flex-col gap-4">
          <Box i={3} className="p-6">
            <div className="flex items-center justify-between"><span className="text-xl font-bold">Сценарна воронка</span><Badge>Сценарна модель</Badge></div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              {[[v, "відвідувачів"], [trial, "записів"], [att, "відвідали урок"], [paid, "покупок"]].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-muted p-3"><div className="text-[34px] font-extrabold text-brand">{n}</div><div className="text-[15px] text-muted-foreground">{l}</div></div>
              ))}
            </div>
            <p className="mt-4 text-[15px] text-muted-foreground">Початкові припущення. Конверсії будуть перевірені та скориговані після запуску.</p>
          </Box>
          <Box i={4} className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div><div className="text-sm font-bold tracking-wider text-primary uppercase">План</div><div className="mt-2 text-lg font-semibold">Прогнозна KPI-модель</div></div>
              <div><div className="text-sm font-bold tracking-wider text-muted-foreground uppercase">Факт</div><div className="mt-2 text-lg font-semibold text-muted-foreground">Дані будуть доступні після запуску</div></div>
            </div>
          </Box>
          <Box i={5} className="flex-1 p-6">
            <div className="text-sm font-bold tracking-wider text-muted-foreground uppercase">Вартість на кожному етапі</div>
            <div className="mt-3 flex flex-wrap gap-2">{["CPM", "CPC", "CPL", "Cost per Trial", "CAC"].map((c) => <span key={c} className="rounded-full bg-accent px-4 py-1.5 text-lg font-bold text-accent-foreground">{c}</span>)}</div>
          </Box>
        </div>
      </div>
    </Frame>
  );
}

function S11() {
  const st = [
    { m: "0–3 місяці", n: "Запуск", items: ["Google Ads та Meta Ads", "Запуск Social Media", "Базове SEO", "Перші ліди", "Тестування рекламних гіпотез", "Збір перших фактичних даних"], goal: "Перевірити попит і визначити перші ефективні канали залучення" },
    { m: "3–6 місяців", n: "Оптимізація та довіра", items: ["План / факт", "Оптимізація CPL / CAC", "Ремаркетинг", "Кейси та відгуки", "Регулярний контент і SEO", "Оптимізація воронки"], goal: "Підвищити довіру та ефективність конверсії" },
    { m: "6–12 місяців", n: "Масштабування", items: ["Масштабування ефективних каналів", "Розвиток напряму 5–9 класів", "Тематичні інтенсиви", "Реферальна програма", "Тестування нових сегментів"], goal: "Масштабувати лише те, що підтвердило ефективність фактичними даними" },
  ];
  return (
    <Frame n={11} kicker="Дорожня карта" title="План запуску та масштабування" sub="12-місячний план переходу від запуску до масштабування">
      <div className="flex h-full flex-col gap-5">
        <div className="relative grid flex-1 grid-cols-3 gap-6">
          <div className="absolute top-[26px] right-[16%] left-[16%] h-1 rounded-full bg-brand opacity-40" />
          {st.map((s, i) => (
            <div key={s.m} className={`relative flex flex-col ${R}`} style={rise(i * 3 + 2)}>
              <div className="mx-auto grid h-[52px] place-items-center rounded-full bg-brand px-6 text-lg font-extrabold text-primary-foreground shadow-glow">{s.m}</div>
              <div className="mt-4 flex flex-1 flex-col rounded-3xl border bg-card p-6 shadow-card">
                <div className="text-[26px] font-extrabold">{s.n}</div>
                <ul className="mt-3 space-y-1.5 text-[17px]">{s.items.map((x) => <li key={x} className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-primary" />{x}</li>)}</ul>
                <div className="mt-auto rounded-xl bg-accent p-3 text-[15px] font-semibold text-accent-foreground">Мета: {s.goal}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Flow items={["Запуск", "Вимірювання", "Оптимізація", "Довіра", "Масштабування"]} />
          <span className="text-lg font-semibold text-primary">Від першого контакту — до довгострокових відносин із клієнтом</span>
        </div>
      </div>
    </Frame>
  );
}

function S12() {
  const st = [
    ["Дослідження", "Ринок · Конкуренти · Аудиторія"],
    ["Стратегія", "Позиціонування · Продукт · Канали"],
    ["Digital-присутність", "Сайт · Social Media · Ads"],
    ["Залучення та прогрів", "Тест · Email · PDF"],
    ["Конверсія", "Пробний урок · Оплата · Навчання"],
    ["Зростання", "Результат · Утримання · Рекомендації · Аналітика · Оптимізація · Масштабування"],
  ];
  return (
    <Frame n={12} kicker="Готова система" title="Від дослідження до готової системи запуску">
      <div className="flex h-[calc(100%-56px)] flex-col gap-6">
        <div className="relative grid grid-cols-6 gap-4">
          <svg className="pointer-events-none absolute inset-x-0 top-[38px] h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 2"><line x1="4" y1="1" x2="96" y2="1" stroke="var(--primary)" strokeOpacity="0.35" strokeWidth="2" className="draw-line" vectorEffect="non-scaling-stroke" /></svg>
          {st.map(([n, d], i) => (
            <div key={n} className={`relative flex flex-col items-center text-center ${R}`} style={rise(i + 1)}>
              <div className="grid size-[76px] place-items-center rounded-full bg-brand text-2xl font-extrabold text-primary-foreground shadow-glow">0{i + 1}</div>
              <div className="mt-4 w-full flex-1 rounded-3xl border bg-card p-5 shadow-card">
                <div className="text-xl font-extrabold">{n}</div>
                <div className="mt-2 text-[16px] leading-snug text-muted-foreground">{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={`flex flex-1 items-center gap-6 rounded-3xl bg-hero px-10 text-night-foreground ${R}`} style={rise(8)}>
          <Sparkles className="size-10 shrink-0 text-cyan" />
          <p className="text-[30px] leading-snug font-bold">NeuroMath Academy переходить від ідеї нового бренду до керованої digital-системи залучення, конверсії та масштабування.</p>
        </div>
      </div>
      <Flow className="absolute right-0 bottom-0 left-0 justify-center" items={["Впізнаваність", "Інтерес", "Лід", "Пробний урок", "Покупка", "Результат", "Рекомендація"]} />
    </Frame>
  );
}

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];

/* ---------- appendix ---------- */
function Appendix() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 print:hidden">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Додаток · не входить у головну презентацію</p>
      <h2 className="mt-2 text-3xl font-extrabold">Додаткові матеріали</h2>
      <h3 className="mt-10 text-xl font-bold">SWOT-аналіз</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {Object.entries(D.swot).map(([k, items]) => (
          <div key={k} className="rounded-2xl border bg-card p-5 shadow-card"><div className="font-bold">{k}</div><ul className="mt-2 space-y-1 text-sm text-muted-foreground">{items.map((i) => <li key={i}>• {i}</li>)}</ul></div>
        ))}
      </div>
      <h3 className="mt-10 text-xl font-bold">Що вимірюватимемо після запуску</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-5">
        {D.measurement.map((m) => (
          <div key={m.area} className="rounded-2xl border bg-card p-5 shadow-card"><div className="font-bold">{m.area}</div><div className="text-sm text-primary">{m.tool}</div><ul className="mt-2 space-y-1 text-sm text-muted-foreground">{m.metrics.map((x) => <li key={x}>{x}</li>)}</ul></div>
        ))}
      </div>
      <h3 className="mt-10 text-xl font-bold">Прогноз і факт</h3>
      <div className="mt-4 overflow-hidden rounded-2xl border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-muted"><tr><th className="p-3 text-left">KPI</th><th className="p-3 text-right">Прогноз</th><th className="p-3 text-right">Факт</th></tr></thead>
          <tbody>{D.forecastVsActual.map((r) => <tr key={r.kpi} className="border-t"><td className="p-3">{r.kpi}</td><td className="p-3 text-right font-semibold">{r.forecast}</td><td className="p-3 text-right text-muted-foreground">{r.actual ?? "—"}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------- deck shell ---------- */
function Deck() {
  const [pres, setPres] = useState(false);
  const [i, setI] = useState(0);
  const go = useCallback((d: number) => setI((x) => Math.max(0, Math.min(SLIDES.length - 1, x + d))), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!pres) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(-1); }
      if (e.key === "Escape") setPres(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pres, go]);

  const enter = (n = 0) => {
    setI(n);
    setPres(true);
    document.documentElement.requestFullscreen?.().catch(() => {});
  };
  const exit = () => {
    setPres(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };

  if (pres) {
    const S = SLIDES[i]!;
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-night">
        <div className="h-1 bg-night-foreground/10"><div className="h-full bg-brand transition-all duration-500" style={{ width: `${((i + 1) / SLIDES.length) * 100}%` }} /></div>
        <div className="min-h-0 flex-1 p-4"><Scaled><S key={i} /></Scaled></div>
        <div className="flex items-center justify-center gap-4 pb-4 text-night-foreground">
          <button onClick={() => go(-1)} disabled={i === 0} className="inline-flex items-center gap-1 rounded-full border border-night-foreground/20 px-4 py-1.5 text-sm disabled:opacity-30"><ChevronLeft className="size-4" />Назад</button>
          <span className="w-14 text-center text-sm font-semibold">{i + 1} / {SLIDES.length}</span>
          <button onClick={() => go(1)} disabled={i === SLIDES.length - 1} className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-1.5 text-sm font-semibold disabled:opacity-30">Далі<ChevronRight className="size-4" /></button>
          <button onClick={exit} className="ml-6 inline-flex items-center gap-1 rounded-full border border-night-foreground/20 px-3 py-1.5 text-sm"><Minimize2 className="size-4" />Вийти</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="ui-control sticky top-0 z-40 border-b glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-brand text-primary-foreground shadow-glow"><Brain className="size-5" /></div>
            <div><div className="font-extrabold">Neuro<span className="text-brand">Math</span> Academy</div><div className="text-xs text-muted-foreground">Маркетингова презентація запуску · 12 слайдів · ≈7 хв</div></div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium"><Printer className="size-4" />Друк / PDF</button>
            <button onClick={() => enter(0)} className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow"><Maximize2 className="size-4" />Режим презентації</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl space-y-8 px-6 py-10 print:max-w-none print:space-y-0 print:p-0">
        {SLIDES.map((S, n) => (
          <div key={n} className="print-slide group relative aspect-video overflow-hidden rounded-3xl border shadow-card print:rounded-none print:border-0 print:shadow-none">
            <Scaled><S /></Scaled>
            <button onClick={() => enter(n)} className="ui-control absolute right-4 bottom-4 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-card transition group-hover:opacity-100">Показати з цього слайда</button>
          </div>
        ))}
      </main>
      <Appendix />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Brain, ChevronLeft, ChevronRight, Maximize2, Minimize2, Printer, Check, AlertCircle, CircleDot, Mail, FileText, Search, Users, Target, Sparkles } from "lucide-react";
import * as D from "@/data/marketing";
import siteShot from "@/assets/creatives/site.png.asset.json";
import report1 from "@/assets/creatives/report1.png.asset.json";
import report2 from "@/assets/creatives/report2.png.asset.json";

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

function Frame({ n, kicker, title, sub, badge, children }: { n: number; kicker: string; title: ReactNode; sub?: string; badge?: ReactNode; children: ReactNode }) {
  return (
    <div className="slide-canvas relative flex h-full w-full flex-col overflow-hidden bg-background px-20 pt-14 pb-12">
      <div className="slide-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-primary/10 blur-3xl" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-brand text-primary-foreground"><Brain className="size-4" /></div>
          <span className="text-lg font-bold">Neuro<span className="text-brand">Math</span></span>
        </div>
        <span className="text-sm font-medium text-muted-foreground">{String(n).padStart(2, "0")} / 09 · {kicker}</span>
      </div>
      <div className="relative mt-8">
        {badge && <div className="mb-3">{badge}</div>}
        <h2 className={`max-w-[1200px] text-[52px] leading-[1.05] font-extrabold tracking-tight ${R}`}>{title}</h2>
        {sub && <p className={`mt-3 max-w-[1100px] text-xl text-muted-foreground ${R}`} style={rise(1)}>{sub}</p>}
      </div>
      <div className="relative mt-8 min-h-0 flex-1">{children}</div>
    </div>
  );
}

const Badge = ({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "warn" }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${tone === "warn" ? "bg-spark/20 text-spark-foreground" : "bg-accent text-accent-foreground"}`}>{children}</span>
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
    <div className={`overflow-hidden rounded-2xl border bg-card shadow-glow ${className}`}>
      <div className="flex items-center gap-2 border-b bg-muted px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-destructive/60" /><span className="size-2.5 rounded-full bg-spark/70" /><span className="size-2.5 rounded-full bg-teal/60" />
        <span className="ml-3 rounded-md bg-card px-3 py-0.5 text-xs text-muted-foreground">neuro-math-canvas.lovable.app</span>
      </div>
      <img src={src} alt={alt} className="block w-full" />
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1200);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v.toLocaleString("uk-UA")}{suffix}</>;
}

/* ---------- slides ---------- */
function S1() {
  const chips = ["Дослідження", "Стратегія", "Сайт", "Соцмережі", "Google Ads", "Email", "KPI", "Прогноз"];
  return (
    <Frame n={1} kicker="Запуск бренду" title={<>Запуск нового бренду <span className="text-brand">NeuroMath Academy</span></>} sub="Від маркетингового дослідження до системи залучення перших клієнтів">
      <div className="grid h-full grid-cols-[1fr_1.35fr] gap-12">
        <div className="flex flex-col justify-between">
          <div className={R} style={rise(2)}><Badge>Новий проєкт · етап підготовки до запуску</Badge></div>
          <div className="grid grid-cols-2 gap-3">
            {chips.map((c, i) => (
              <div key={c} className={`flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-card ${R}`} style={rise(i + 3)}>
                <span className="grid size-7 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{i + 1}</span>
                <span className="font-semibold">{c}</span>
              </div>
            ))}
          </div>
          <Flow items={["Дослідження", "Стратегія", "Запуск"]} />
        </div>
        <div className={`relative self-center ${R}`} style={rise(3)}>
          <Browser src={siteShot.url} alt="Новий сайт NeuroMath" />
          <div className="absolute -bottom-5 -left-6 rounded-2xl border bg-card px-5 py-3 shadow-card"><div className="text-xs text-muted-foreground">Головна точка переходу</div><div className="font-bold">Новий сайт NeuroMath</div></div>
        </div>
      </div>
    </Frame>
  );
}

function S2() {
  const nums = [
    { v: 213850, l: "потенційна аудиторія / місяць", I: Users },
    { v: 55500, l: "пошуковий потенціал Google", I: Search },
    { v: 158350, l: "потенційна аудиторія Facebook Ads", I: Target },
  ];
  const facts = [["Конкуренція", "Висока"], ["Попит", "Сформований / стабільний"], ["Пріоритет запуску", "Підготовка до НМТ"], ["Масштабування", "5–9 класи"]];
  const comp = ["Mathema", "BUKI", "SuperProf", "Ispyt", "Math Corporation"];
  return (
    <Frame n={2} kicker="Дослідження ринку" title="Що показало маркетингове дослідження?" sub="Дані → інсайт → рішення: ринок великий і конкурентний, попит уже сформований.">
      <div className="grid h-full grid-cols-[1.5fr_1fr] gap-6">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-4">
            {nums.map(({ v, l, I }, i) => (
              <Box key={l} i={i}>
                <I className="size-6 text-primary" />
                <div className="mt-3 text-5xl font-extrabold text-brand"><Counter to={v} /></div>
                <div className="mt-2 font-medium">{l}</div>
                <div className="mt-3 text-xs text-muted-foreground">Оцінка за результатами маркетингового дослідження</div>
              </Box>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {facts.map(([k, v], i) => (
              <Box key={k} i={i + 3} className="p-5"><div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{k}</div><div className="mt-2 text-lg font-bold">{v}</div></Box>
            ))}
          </div>
          <Box i={7} className="flex items-center gap-6 py-5">
            <span className="shrink-0 text-sm font-semibold tracking-wider text-muted-foreground uppercase">Конкурентне поле</span>
            <div className="flex flex-wrap gap-2">{comp.map((c) => <span key={c} className="rounded-full border px-4 py-1.5 text-sm font-medium">{c}</span>)}</div>
          </Box>
        </div>
        <div className={`flex flex-col justify-center rounded-3xl bg-hero p-10 text-night-foreground ${R}`} style={rise(5)}>
          <Badge>Головний висновок</Badge>
          <p className="mt-6 text-4xl leading-tight font-extrabold">Не конкурувати ціною.</p>
          <p className="mt-4 text-2xl leading-snug font-semibold text-cyan">Конкурувати результатом, персоналізацією, методикою та довірою.</p>
        </div>
      </div>
    </Frame>
  );
}

function S3() {
  const problems = ["Дитина не розуміє математику", "Прогалини у знаннях", "Низька впевненість", "Страх НМТ", "Відсутність системної підготовки", "Батькам складно контролювати прогрес"];
  const segs = [
    ["5–9 класи", "нерозуміння → прогалини → низькі оцінки", "зрозумілі пояснення → індивідуальний темп → практика → контроль прогресу"],
    ["10–11 класи / НМТ", "прогалини → низькі результати тестів → страх НМТ", "структурована підготовка → НМТ-завдання → аналіз помилок → персональний трек"],
  ];
  const principles = ["Персоналізація", "Видимий прогрес", "Зрозумілі пояснення", "Практика", "Безкоштовна діагностика", "Пробний урок", "Системна комунікація"];
  return (
    <Frame n={3} kicker="Від дослідження до стратегії" title="Дослідження визначило маркетингову стратегію">
      <div className="grid h-full grid-cols-4 gap-5">
        <Box i={0}>
          <div className="text-sm font-bold tracking-wider text-destructive uppercase">01 · Проблема аудиторії</div>
          <ul className="mt-4 space-y-2.5 text-[15px]">{problems.map((p) => <li key={p} className="flex gap-2"><AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />{p}</li>)}</ul>
        </Box>
        <div className="flex flex-col gap-5">
          {segs.map(([n, p, s], i) => (
            <Box key={n} i={i + 1} className="flex-1 p-5">
              <div className="text-xs font-bold tracking-wider text-primary uppercase">02 · Сегмент</div>
              <div className="mt-1 text-xl font-bold">{n}</div>
              <div className="mt-3 text-sm"><b>Проблема:</b> {p}</div>
              <div className="mt-2 text-sm"><b>Рішення:</b> {s}</div>
            </Box>
          ))}
        </div>
        <div className={`flex flex-col justify-between rounded-3xl bg-hero p-7 text-night-foreground ${R}`} style={rise(4)}>
          <div>
            <div className="text-xs font-bold tracking-wider text-cyan uppercase">03 · Інсайт</div>
            <p className="mt-3 text-xl leading-snug font-semibold">Клієнт шукає не просто урок математики. Він шукає зрозумілий і вимірюваний результат.</p>
          </div>
          <div>
            <div className="text-xs font-bold tracking-wider text-cyan uppercase">Позиціонування</div>
            <p className="mt-2 text-3xl font-extrabold">«Опануй математику впевнено»</p>
            <p className="mt-2 text-night-foreground/75">Математика, яку легко зрозуміти</p>
          </div>
        </div>
        <Box i={5}>
          <div className="text-sm font-bold tracking-wider text-primary uppercase">04 · Стратегічні принципи</div>
          <ol className="mt-4 space-y-2.5">{principles.map((p, i) => <li key={p} className="flex items-center gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{i + 1}</span><span className="font-medium">{p}</span></li>)}</ol>
          <p className="mt-4 text-xs text-muted-foreground">+ AI-інструменти та цифрова підтримка навчання</p>
        </Box>
      </div>
    </Frame>
  );
}

function S4() {
  const ch = [
    ["Google Search / Google Ads", "Перехоплення сформованого пошукового попиту", "«підготовка до НМТ математика», «репетитор математики онлайн»"],
    ["Meta Ads", "Впізнаваність + залучення + лідогенерація + ремаркетинг", "Аудиторія: батьки + учні"],
    ["Instagram / TikTok", "Корисний контент + впізнаваність + довіра", "Навчальні відео, розбори задач"],
    ["Facebook", "Комунікація з батьками + довіра + лідогенерація", "Пости, спільнота, ліди"],
    ["SEO", "Довгострокове органічне залучення", "Блог, теми НМТ, пояснення"],
    ["Email / SendPulse", "Персоналізація + прогрів ліда + повернення до пробного уроку", "Персональний звіт, нагадування"],
  ];
  const line = [["Впізнаваність", "Meta · Instagram · TikTok"], ["Інтерес", "Google · SEO · Соцмережі"], ["Лід", "Безкоштовний тест"], ["Прогрів", "Email · PDF-звіт"], ["Пробний урок", "Сайт · Email"], ["Перша покупка", "Консультація · оплата"]];
  return (
    <Frame n={4} kicker="Стратегія каналів" title="Як бренд буде виходити на ринок?" sub="Кожен канал має одну чітку роль у воронці.">
      <div className="flex h-full flex-col gap-6">
        <div className="grid flex-1 grid-cols-3 gap-4">
          {ch.map(([n, r, e], i) => (
            <Box key={n} i={i} className="p-5">
              <div className="text-lg font-bold">{n}</div>
              <div className="mt-2 font-medium text-primary">{r}</div>
              <div className="mt-2 text-sm text-muted-foreground">{e}</div>
            </Box>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-2">
          {line.map(([s, c], i) => (
            <div key={s} className={R} style={rise(i + 7)}>
              <div className="rounded-xl bg-brand px-3 py-3 text-center font-bold text-primary-foreground" style={{ opacity: 0.55 + i * 0.09 }}>{s}</div>
              <div className="mt-2 text-center text-xs text-muted-foreground">{c}</div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function S5() {
  const [cur, setCur] = useState(0);
  const c = D.carousel[cur]!;
  const dirs = ["Навчальний контент", "НМТ", "Експертність / методика", "Конверсійний контент"];
  const shot = (src: string, alt: string, label: string, i: number, cls = "") => (
    <figure className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-card ${R} ${cls}`} style={rise(i)}>
      <img src={src} alt={alt} className="min-h-0 w-full flex-1 bg-muted object-contain" />
      <figcaption className="border-t px-3 py-2 text-xs font-semibold">{label}</figcaption>
    </figure>
  );
  const cr = D.creatives;
  const pg = D.pageExamples;
  return (
    <Frame n={5} kicker="Digital-присутність" title="Як бренд буде виглядати в digital-середовищі" badge={<Badge tone="warn">Концепція digital-присутності · без фактичної статистики</Badge>}>
      <div className="grid h-[calc(100%-56px)] grid-cols-[1.05fr_1fr_1fr_1fr] gap-4">
        <div className={`flex min-h-0 flex-col rounded-2xl border bg-card p-3 shadow-card ${R}`} style={rise(2)}>
          <div className="flex items-center justify-between px-1 pb-2 text-xs font-semibold"><span>Instagram · карусель</span><span className="text-primary">{cur + 1}/{D.carousel.length}</span></div>
          <img src={c.src} alt={c.title} className="aspect-square w-full rounded-xl object-cover" />
          <div className="mt-2 flex items-center justify-between gap-2">
            <button className="ui-control grid size-8 place-items-center rounded-full border" onClick={() => setCur((cur + D.carousel.length - 1) % D.carousel.length)} aria-label="Попередній слайд каруселі"><ChevronLeft className="size-4" /></button>
            <span className="truncate text-xs">{c.title}</span>
            <button className="ui-control grid size-8 place-items-center rounded-full border" onClick={() => setCur((cur + 1) % D.carousel.length)} aria-label="Наступний слайд каруселі"><ChevronRight className="size-4" /></button>
          </div>
          {shot(pg[0]!.src, pg[0]!.title, "Instagram · профіль", 3, "mt-3")}
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          {shot(cr[2]!.src, cr[2]!.title, "TikTok · мокап", 4, "flex-1")}
          {shot(pg[1]!.src, pg[1]!.title, "Instagram · профіль", 5, "flex-1")}
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          {shot(cr[0]!.src, cr[0]!.title, "Facebook · пост", 6, "flex-1")}
          {shot(pg[2]!.src, pg[2]!.title, "Facebook · сторінка", 7, "flex-1")}
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          {shot(cr[3]!.src, cr[3]!.title, "Google Search · мокап видачі", 8, "flex-1")}
          {shot(cr[4]!.src, cr[4]!.title, "Google Ads · концепція", 9, "flex-1")}
        </div>
      </div>
      <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between">
        <div className="flex gap-2">{dirs.map((d, i) => <span key={d} className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{i + 1}. {d}</span>)}</div>
        <Flow items={["Контент", "Користь", "Довіра", "Перехід на сайт"]} />
      </div>
    </Frame>
  );
}

function S6() {
  const st = [
    ["Впізнаваність", "Meta · Instagram · TikTok · Facebook", "Бачить корисний контент", "Reels, пости, таргет", "Reach · CPM · Video Views"],
    ["Інтерес", "Google · соцмережі · SEO", "Переходить на сайт", "Пошукова реклама, блог", "CTR · CPC · Sessions"],
    ["Розгляд", "Сайт NeuroMath", "Вивчає курси й методику", "Лендинг, програми", "Landing Page Conversion"],
    ["Безкоштовний тест", "Сайт → тест", "Проходить діагностику", "Безкоштовна діагностика", "Test Starts · Completions · Leads · CPL"],
    ["Прогрів", "Email / SendPulse", "Отримує персональний звіт", "Email + персональний PDF", "Delivery · Open Rate · CTR"],
    ["Пробний урок", "Сайт · email", "Записується й приходить", "Запис на урок", "Trial Bookings · Attendance · Cost per Trial"],
    ["Перша покупка", "Консультація", "Оплачує курс", "Персональний план", "Purchase Conversion · New Students · CAC"],
  ];
  const rows = ["Канал", "Дія користувача", "Інструмент", "KPI"];
  return (
    <Frame n={6} kicker="Шлях клієнта" title="Шлях клієнта: від першого контакту до першої покупки">
      <div className="flex h-full flex-col gap-5">
        <div className={`flex items-center gap-3 self-center rounded-full border bg-card px-5 py-2 text-sm font-semibold shadow-card ${R}`} style={rise(1)}>
          <span>Google / соцмережі</span><ChevronRight className="size-4 text-primary" />
          <span className="rounded-full bg-brand px-3 py-1 text-primary-foreground">Сайт NeuroMath</span><ChevronRight className="size-4 text-primary" />
          <span>Тест</span><ChevronRight className="size-4 text-primary" /><span>Лід</span>
        </div>
        <div className="grid flex-1 grid-cols-[110px_repeat(7,1fr)] gap-x-3 gap-y-2">
          <div />
          {st.map(([n], i) => (
            <div key={n} className={`relative rounded-2xl bg-brand p-3 text-primary-foreground ${R}`} style={rise(i + 2)}>
              <div className="text-xs opacity-75">{String(i + 1).padStart(2, "0")}</div>
              <div className="text-[15px] leading-tight font-bold">{n}</div>
            </div>
          ))}
          {rows.map((r, ri) => (
            <div key={r} className="contents">
              <div className="flex items-center text-xs font-bold tracking-wider text-muted-foreground uppercase">{r}</div>
              {st.map((s, i) => (
                <div key={i} className={`rounded-xl border bg-card p-3 text-[13px] leading-snug ${ri === 3 ? "font-semibold text-primary" : ""} ${R}`} style={rise(i + 2)}>{s[ri + 1]}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function S7() {
  const groups = [
    { t: "Сильні сторони", I: Check, cls: "text-teal", items: ["Числа та вирази", "Рівняння", "Ймовірність"] },
    { t: "Потребують уваги", I: CircleDot, cls: "text-spark-foreground", items: ["Функції", "Планіметрія"] },
    { t: "Варто повторити", I: AlertCircle, cls: "text-destructive", items: ["Стереометрія", "Тригонометрія"] },
  ];
  const pdf = ["Результат", "Сильні теми", "Слабкі теми", "Рекомендації", "Персональний план", "Наступні кроки"];
  return (
    <Frame n={7} kicker="Прогрів ліда" title="Як перетворити інтерес на готовність купити" sub="Персоналізація починається ще до першого уроку.">
      <div className="grid h-[calc(100%-70px)] grid-cols-[1fr_1.1fr_1fr] gap-6">
        <div className={`relative min-h-0 overflow-hidden rounded-2xl border bg-card shadow-glow ${R}`} style={rise(2)}>
          <div className="flex items-center gap-2 border-b bg-muted px-4 py-2 text-xs font-semibold"><Mail className="size-4 text-primary" /> Лист із персональним звітом · с. 1</div>
          <img src={report1.url} alt="Персональний звіт NeuroMath, сторінка 1" className="w-full object-cover object-top" />
        </div>
        <div className="flex flex-col gap-4">
          <div className={`rounded-3xl bg-hero p-6 text-center text-night-foreground ${R}`} style={rise(3)}>
            <div className="text-xs font-bold tracking-wider text-cyan uppercase">Результат безкоштовного тесту</div>
            <div className="mt-2 flex items-end justify-center gap-6"><span className="text-7xl font-extrabold">34/45</span><span className="pb-2 text-5xl font-extrabold text-cyan">76%</span></div>
          </div>
          {groups.map(({ t, I, cls, items }, i) => (
            <Box key={t} i={i + 2} className="p-4">
              <div className={`flex items-center gap-2 text-sm font-bold uppercase ${cls}`}><I className="size-4" />{t}</div>
              <div className="mt-1 font-medium">{items.join(" · ")}</div>
            </Box>
          ))}
        </div>
        <div className={`relative min-h-0 overflow-hidden rounded-2xl border bg-card shadow-glow ${R}`} style={rise(4)}>
          <div className="flex items-center gap-2 border-b bg-muted px-4 py-2 text-xs font-semibold"><FileText className="size-4 text-primary" /> Персональний PDF-звіт</div>
          <img src={report2.url} alt="Персональний звіт NeuroMath, сторінка 2" className="w-full object-cover object-top" />
          <div className="absolute right-3 bottom-3 left-3 flex flex-wrap gap-1.5 rounded-xl bg-card/95 p-3 shadow-card">{pdf.map((p) => <span key={p} className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">✓ {p}</span>)}</div>
        </div>
      </div>
      <Flow className="absolute right-0 bottom-0 left-0 justify-center" items={["Реклама / контент", "Безкоштовний тест", "34/45 · 76%", "Email", "Персональний PDF", "Пробний урок", "Перша покупка"]} />
    </Frame>
  );
}

function S8() {
  const tree = [
    ["Перша покупка", "New Students · Purchase Conversion · CAC · Revenue", "CAC"],
    ["Пробний урок", "Trial Bookings · Attendance · Trial → Purchase", "Cost per Trial"],
    ["Лід", "Leads · Test Completions · Lead Conversion", "CPL"],
    ["Трафік", "Website Sessions · CTR · Landing Page Conversion", "CPC"],
    ["Впізнаваність", "Reach · Impressions · Video Views · Engagement", "CPM"],
  ];
  const m = D.conversionModel;
  const [v, setV] = useState(m.visitors);
  const trial = Math.round(v * m.trialRate);
  const att = Math.round(trial * m.attendanceRate);
  const paid = Math.round(att * m.paymentRate);
  return (
    <Frame n={8} kicker="Прогноз і KPI" title="Який результат очікуємо після запуску?" badge={<Badge tone="warn">Прогноз · не фактичні результати</Badge>}>
      <div className="grid h-full grid-cols-[1.15fr_1fr] gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold tracking-wider text-muted-foreground uppercase">KPI-дерево · ціль: перші платні учні</div>
          {tree.map(([n, k, cost], i) => (
            <div key={n} className={`grid grid-cols-[170px_1fr_120px] items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-card ${R}`} style={{ ...rise(6 - i), marginLeft: (4 - i) * 0, opacity: 1 }}>
              <span className="font-bold"><span className="mr-2 text-primary">{5 - i}</span>{n}</span>
              <span className="text-sm text-muted-foreground">{k}</span>
              <span className="rounded-full bg-accent px-3 py-1 text-center text-xs font-bold text-accent-foreground">{cost}</span>
            </div>
          ))}
          <div className="mt-2 grid grid-cols-4 gap-2">
            {D.forecastKPIs.slice(0, 4).map((k, i) => (
              <div key={k.label} className={`rounded-2xl bg-muted p-3 ${R}`} style={rise(i + 7)}>
                <div className="text-[10px] font-bold text-primary">ПРОГНОЗ</div>
                <div className="text-xl font-extrabold">{k.value}</div>
                <div className="text-xs text-muted-foreground">{k.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Box i={3} className="p-5">
            <div className="flex items-center justify-between"><span className="font-bold">Сценарна воронка</span><Badge>Сценарна модель</Badge></div>
            <label className="ui-control mt-3 flex items-center gap-3 text-sm">
              Відвідувачі
              <input type="range" min={100} max={3000} step={50} value={v} onChange={(e) => setV(Number(e.target.value))} className="flex-1 accent-primary" aria-label="Кількість відвідувачів" />
              <button onClick={() => setV(m.visitors)} className="rounded-full border px-2 py-0.5 text-xs">500</button>
            </label>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              {[[v, "відвідувачів"], [trial, "записів"], [att, "відвідали"], [paid, "оплатили"]].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-muted p-2"><div className="text-2xl font-extrabold text-brand">{Number(n).toLocaleString("uk-UA")}</div><div className="text-xs text-muted-foreground">{l}</div></div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Конверсії 30% → 70% → ≈38% — сценарні припущення. Будуть перевірені та скориговані після отримання перших фактичних даних.</p>
          </Box>
          <Box i={4} className="flex-1 p-0">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-xs text-muted-foreground uppercase"><th className="p-3">KPI</th><th className="p-3 text-right">Прогноз</th><th className="p-3 text-right">Ціль</th><th className="p-3 text-right">Факт</th></tr></thead>
              <tbody>{D.forecastVsTarget.slice(0, 4).map(([k, f, t]) => <tr key={k} className="border-b"><td className="p-3">{k}</td><td className="p-3 text-right font-semibold">{f}</td><td className="p-3 text-right text-primary">{t}</td><td className="p-3 text-right text-muted-foreground">—</td></tr>)}</tbody>
            </table>
            <p className="p-3 text-xs font-medium">Фактичні дані: поки відсутні. Порівняння «план / факт» буде доступне після запуску кампаній.</p>
          </Box>
        </div>
      </div>
    </Frame>
  );
}

function S9() {
  const nodes = ["Дослідження", "Аудиторія", "Позиціонування", "Стратегія", "Сайт", "Соцмережі", "Google Ads", "Безкоштовний тест", "Email", "Персональний звіт", "Пробний урок", "Перша покупка", "Аналітика", "Оптимізація"];
  const cx = 330, cy = 300, rx = 290, ry = 245;
  const pts = nodes.map((_, i) => {
    const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as const;
  });
  const steps = ["Запуск рекламних каналів", "Налаштування відстеження", "Збір перших фактичних даних", "Порівняння «план / факт»", "A/B тестування", "Оптимізація CPL / Cost per Trial / CAC", "Масштабування ефективних каналів"];
  return (
    <Frame n={9} kicker="Готова система" title="Від дослідження до готової системи запуску">
      <div className="grid h-[calc(100%-60px)] grid-cols-[1.25fr_1fr] gap-8">
        <div className="relative">
          <svg viewBox="0 0 660 600" className="absolute inset-0 h-full w-full">
            {pts.map(([x, y], i) => {
              const [nx, ny] = pts[(i + 1) % pts.length]!;
              return (
                <g key={i}>
                  <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="1.5" className="draw-line" style={{ animationDelay: `${i * 80}ms` }} />
                  <line x1={x} y1={y} x2={nx} y2={ny} stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="2" className="draw-line" style={{ animationDelay: `${300 + i * 80}ms` }} />
                </g>
              );
            })}
          </svg>
          <div className="absolute inset-0">
            <div className="absolute grid size-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-center font-extrabold text-primary-foreground shadow-glow" style={{ left: `${(cx / 660) * 100}%`, top: `${(cy / 600) * 100}%` }}>NeuroMath<br />Academy</div>
            {nodes.map((n, i) => (
              <div key={n} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-card px-3 py-1.5 text-xs font-semibold whitespace-nowrap shadow-card ${R}`} style={{ left: `${(pts[i]![0] / 660) * 100}%`, top: `${(pts[i]![1] / 600) * 100}%`, ...rise(i) }}>
                <span className="mr-1 text-primary">{i + 1}</span>{n}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Наступні кроки</div>
          {steps.map((s, i) => (
            <div key={s} className={`flex items-center gap-4 rounded-2xl border bg-card px-4 py-2.5 shadow-card ${R}`} style={rise(i + 4)}>
              <span className="text-xl font-extrabold text-brand">0{i + 1}</span><span className="font-semibold">{s}</span>
            </div>
          ))}
          <div className={`mt-auto rounded-3xl bg-hero p-5 text-night-foreground ${R}`} style={rise(12)}>
            <Sparkles className="size-5 text-cyan" />
            <p className="mt-2 text-lg leading-snug font-semibold">NeuroMath Academy переходить від ідеї нового бренду до керованої digital-системи залучення перших клієнтів.</p>
          </div>
        </div>
      </div>
      <Flow className="absolute right-0 bottom-0 left-0 justify-center" items={["Впізнаваність", "Інтерес", "Лід", "Пробний урок", "Перша покупка"]} />
    </Frame>
  );
}

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9];

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
            <div><div className="font-extrabold">Neuro<span className="text-brand">Math</span> Academy</div><div className="text-xs text-muted-foreground">Маркетингова презентація запуску · 9 слайдів · ≈7 хв</div></div>
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

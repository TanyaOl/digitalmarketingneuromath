import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowDown, ArrowRight, Printer, Presentation, Info, Brain, Check, X,
  Target, Users, Sparkles, LineChart, Megaphone, Search, Mail, Share2, BadgeCheck,
} from "lucide-react";
import * as D from "@/data/marketing";

export const Route = createFileRoute("/marketing")({
  head: () => ({
    meta: [
      { title: "Маркетингова стратегія — NeuroMath Academy" },
      { name: "description", content: "Прогноз результатів цифрового просування NeuroMath Academy на 2026–2027: воронка, KPI, канали, SWOT." },
      { property: "og:title", content: "Маркетингова стратегія — NeuroMath Academy" },
      { property: "og:description", content: "Прогноз цифрового маркетингу: аудиторія, воронка продажів, канали та прогнозовані KPI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const ForecastTag = ({ dark }: { dark?: boolean }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium tracking-widest ${dark ? "bg-night-foreground/10 text-cyan" : "bg-accent text-accent-foreground"}`}>
    ПРОГНОЗ
  </span>
);

function Section({ id, eyebrow, title, sub, children, className = "" }: { id?: string; eyebrow?: string; title: string; sub?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-12 ${className}`}>
      {eyebrow && <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl text-muted-foreground">{sub}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-2xl border bg-card p-6 shadow-card ${className}`}>{children}</div>
);

const Chip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full border bg-muted px-3 py-1 text-sm">{children}</span>
);

function Dashboard() {
  const [pres, setPres] = useState(false);
  return (
    <div className={pres ? "presentation" : ""}>
      <Header pres={pres} setPres={setPres} />
      <div className="mx-auto flex max-w-7xl gap-8 px-4 md:px-8">
        <nav className="ui-control sticky top-24 hidden h-fit w-48 shrink-0 py-12 xl:block">
          <ul className="space-y-1 border-l">
            {D.navItems.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <main className="min-w-0 flex-1">
          <Banner />
          <Hero />
          <KPIs />
          <Funnel />
          <FullFunnel />
          <Calculator />
          <Value />
          <Audience />
          <Trust />
          <Channels />
          <Competitive />
          <Growth />
          <Swot />
          <Creatives />
          <Pages />
          <Tables />
          <Measurement />
          <Next />
          <Final />
        </main>
      </div>
    </div>
  );
}

function Header({ pres, setPres }: { pres: boolean; setPres: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-40 border-b glass">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-brand text-primary-foreground shadow-glow">
            <Brain className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold">Neuro<span className="text-brand">Math</span> Academy</span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium tracking-widest text-muted-foreground">ЦИФРОВИЙ МАРКЕТИНГ</span>
            </div>
            <p className="text-xs text-muted-foreground">Дашборд маркетингової стратегії · Прогноз результатів цифрового просування на 1 рік</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <div className="text-xs font-bold tracking-widest text-primary">ПРОГНОЗ</div>
            <div className="text-sm font-semibold">2026–2027</div>
          </div>
          <button onClick={() => window.print()} className="ui-control inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-medium hover:bg-muted">
            <Printer className="size-4" /> Друк / PDF
          </button>
          <button onClick={() => setPres(!pres)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Presentation className="size-4" /> {pres ? "Вийти з презентації" : "Режим презентації"}
          </button>
        </div>
      </div>
    </header>
  );
}

function Banner() {
  return (
    <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-spark/50 bg-spark/10 p-4 md:flex-row md:items-center">
      <Info className="size-5 shrink-0 text-spark-foreground" />
      <p className="flex-1 text-sm font-medium">
        Рекламні кампанії ще не запускалися. Наведені показники є прогнозованими результатами маркетингової стратегії та будуть перевірені після запуску кампаній.
      </p>
      <span className="shrink-0 rounded-full bg-spark px-3 py-1 text-xs font-bold tracking-wider text-spark-foreground">ПРОГНОЗ — НЕ ФАКТИЧНІ ДАНІ</span>
    </div>
  );
}

function NeuralViz() {
  const nodes = [[40, 60], [40, 150], [40, 240], [160, 40], [160, 120], [160, 200], [160, 270], [280, 90], [280, 180], [380, 135]];
  const edges = [[0,3],[0,4],[1,4],[1,5],[2,5],[2,6],[0,5],[1,3],[2,4],[3,7],[4,7],[4,8],[5,8],[6,8],[5,7],[7,9],[8,9]];
  return (
    <svg viewBox="0 0 420 310" className="h-full w-full">
      <defs>
        <linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="var(--sky)" /><stop offset="1" stopColor="var(--cyan)" /></linearGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="url(#g)" strokeOpacity="0.45" strokeWidth="1.2" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 9 ? 14 : 7} fill="var(--night)" stroke="url(#g)" strokeWidth="2" />
          <circle cx={x} cy={y} r={i === 9 ? 5 : 2.5} fill="var(--cyan)" className="animate-pulse" />
        </g>
      ))}
      <text x="250" y="30" fill="var(--cyan)" opacity="0.6" fontSize="13" fontFamily="monospace">f(x) = ∑ wᵢxᵢ + b</text>
      <text x="10" y="300" fill="var(--sky)" opacity="0.6" fontSize="12" fontFamily="monospace">CR = 40 / 500 = 8%</text>
      <text x="300" y="250" fill="var(--spark)" opacity="0.7" fontSize="14" fontFamily="monospace">∫ growth dt</text>
    </svg>
  );
}

function Hero() {
  return (
    <section id="overview" className="relative mt-6 overflow-hidden rounded-3xl bg-hero p-8 text-night-foreground md:p-12">
      <div className="math-grid absolute inset-0" />
      <div className="relative grid items-center gap-8 lg:grid-cols-2">
        <div>
          <ForecastTag dark />
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">Прогноз цифрового маркетингу</h1>
          <p className="mt-4 max-w-lg text-lg text-night-foreground/80">Від позиціонування та залучення — до довіри, клієнтів і масштабування.</p>
          <p className="mt-6 text-sm font-medium tracking-wide text-cyan">Маркетингова стратегія • Воронка продажів • Прогнозні KPI • Зростання</p>
          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-medium text-night-foreground/70">
            {["Хто", "Проблема", "Рішення", "Довіра", "Залучення", "Конверсія", "Утримання", "Масштаб"].map((s, i, a) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded-md border border-night-foreground/15 px-2 py-1">{s}</span>
                {i < a.length - 1 && <ArrowRight className="size-3" />}
              </span>
            ))}
          </div>
        </div>
        <div className="h-72"><NeuralViz /></div>
      </div>
    </section>
  );
}

function KPIs() {
  return (
    <Section id="kpi" eyebrow="Ключові показники" title="Прогнозні KPI">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {D.forecastKPIs.map((k) => (
          <Card key={k.label} className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-brand" />
            <div className="kpi-value text-4xl font-extrabold tracking-tight text-brand">{k.value}</div>
            <div className="mt-2 font-medium">{k.label}</div>
            <div className="mt-4"><ForecastTag /></div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Funnel() {
  const [active, setActive] = useState(0);
  const s = D.funnelStages[active];
  return (
    <Section id="funnel" eyebrow="Шлях клієнта" title="Воронка продажів" sub="Прогнозована воронка залучення та утримання клієнтів NeuroMath Academy">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col items-center gap-2">
          {D.funnelStages.map((st, i) => (
            <button
              key={st.id}
              onClick={() => setActive(i)}
              style={{ width: `${100 - i * 11}%` }}
              className={`rounded-xl px-4 py-4 text-left transition ${i === active ? "bg-brand text-primary-foreground shadow-glow" : "border bg-card hover:border-primary"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium opacity-70">{st.num}</span>
                <span className="font-semibold">{st.name}</span>
                <span className="text-sm opacity-80">{st.kpis[0].value}</span>
              </div>
            </button>
          ))}
          <p className="ui-control mt-2 text-xs text-muted-foreground">Натисніть на етап, щоб побачити KPI та дії</p>
        </div>
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold"><span className="text-primary">{s.num}</span> — {s.title}</h3>
            <ForecastTag />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {s.kpis.map((k) => (
              <div key={k.label} className="rounded-xl bg-muted p-4">
                <div className="text-3xl font-extrabold">{k.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{k.label}</div>
              </div>
            ))}
          </div>
          <h4 className="mt-6 text-sm font-medium tracking-wider text-muted-foreground uppercase">Дії</h4>
          <div className="mt-3 flex flex-wrap gap-2">{s.actions.map((a) => <Chip key={a}>{a}</Chip>)}</div>
          {s.extra && (
            <>
              <h4 className="mt-6 text-sm font-medium tracking-wider text-muted-foreground uppercase">{s.extra.title}</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.extra.items.map((a) => <span key={a} className="rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground">{a}</span>)}
              </div>
            </>
          )}
          {s.id === "conversion" && <AIDiagnostic />}
        </Card>
      </div>
    </Section>
  );
}

function AIDiagnostic() {
  return (
    <div className="mt-6 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4">
      <div className="flex items-center gap-3">
        <Sparkles className="size-5 text-primary" />
        <span className="font-semibold">AI-діагностика</span>
        <span className="text-sm text-muted-foreground">додатковий інструмент кваліфікації</span>
      </div>
      <div className="mt-2 text-2xl font-extrabold">{D.aiDiagnostic.value} <span className="text-sm font-medium text-muted-foreground">прогнозованих проходжень</span></div>
      <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
        {D.aiDiagnostic.roles.map((r) => <li key={r} className="flex gap-2"><Check className="size-4 shrink-0 text-teal" />{r}</li>)}
      </ul>
    </div>
  );
}

function FullFunnel() {
  const n = D.fullFunnel.length;
  return (
    <section className="py-6">
      <div className="relative overflow-hidden rounded-3xl bg-night p-8 text-night-foreground">
        <div className="math-grid absolute inset-0" />
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-2xl font-bold">Прогнозна модель воронки</h3>
            <ForecastTag dark />
          </div>
          <div className="mt-8 flex flex-col items-center gap-1.5">
            {D.fullFunnel.map((f, i) => (
              <div key={f.label} style={{ width: `${100 - i * (60 / n)}%`, opacity: 1 - i * 0.06 }} className="flex items-center justify-between rounded-lg bg-brand px-5 py-3">
                <span className="text-xs font-medium tracking-widest uppercase">{f.label}</span>
                <span className="text-2xl font-extrabold">{f.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-night-foreground/15 p-4"><div className="text-sm text-night-foreground/70">Прогноз оплачених клієнтів</div><div className="text-4xl font-extrabold text-cyan">40</div></div>
            <div className="rounded-xl border border-night-foreground/15 p-4"><div className="text-sm text-night-foreground/70">Конверсія сайт → оплата</div><div className="text-4xl font-extrabold text-cyan">8%</div></div>
          </div>
          <p className="mt-4 text-xs text-night-foreground/60">Прогнозна модель — не фактичні дані кампаній</p>
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const m = D.conversionModel;
  const [v, setV] = useState(m.visitors);
  const trial = Math.round(v * m.trialRate);
  const att = Math.round(trial * m.attendanceRate);
  const paid = Math.round(att * m.paymentRate);
  const steps = [[v, "Відвідувачі"], [trial, "Записи на пробний урок"], [att, "Відвідали пробний урок"], [paid, "Оплатили курс"]] as const;
  const rates = [["Сайт → запис", "30%"], ["Запис → відвідування", "70%"], ["Відвідування → оплата", "≈38%"], ["Сайт → оплата", "8%"]];
  return (
    <Section eyebrow="Інтерактив" title="Калькулятор прогнозу" sub="Змініть кількість відвідувачів — downstream значення перерахуються за прогнозною моделлю.">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-3 font-medium">
            Відвідувачі
            <input type="number" min={0} value={v} onChange={(e) => setV(Math.max(0, Number(e.target.value) || 0))} className="w-32 rounded-lg border bg-background px-3 py-2 text-lg font-bold" />
          </label>
          <input type="range" min={100} max={3000} step={50} value={v} onChange={(e) => setV(Number(e.target.value))} className="ui-control flex-1 accent-primary" />
          <button onClick={() => setV(m.visitors)} className="ui-control rounded-lg border px-3 py-2 text-sm hover:bg-muted">Скинути до 500</button>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">Прогнозна модель</span>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {steps.map(([n, l], i) => (
            <div key={l} className="relative rounded-xl bg-muted p-5">
              <div className="text-4xl font-extrabold text-brand">{n.toLocaleString("uk-UA")}</div>
              <div className="mt-1 text-sm font-medium text-muted-foreground">{l}</div>
              {i < 3 && <div className="mt-3 text-xs font-medium text-primary">{rates[i][1]} → </div>}
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-4">
          {rates.map(([l, r]) => <div key={l} className="flex justify-between rounded-lg border px-3 py-2"><span className="text-muted-foreground">{l}</span><b>{r}</b></div>)}
        </div>
      </Card>
    </Section>
  );
}

function Value() {
  return (
    <Section id="value" eyebrow="Позиціонування" title="Ціннісна пропозиція">
      <div className="relative overflow-hidden rounded-3xl border bg-card p-10 text-center shadow-card light-grid">
        <h3 className="text-3xl font-extrabold md:text-5xl">«Математика, яку <span className="text-brand">дитина розуміє</span>»</h3>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">NeuroMath Academy перетворює складну математику на зрозумілий персональний навчальний процес — із підтримкою викладача, технологіями та постійним аналізом прогресу.</p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {D.pillars.map((p, i) => (
          <Card key={p.name} className="p-5">
            <div className="text-xs font-medium text-primary">0{i + 1}</div>
            <div className="mt-1 text-lg font-semibold">{p.name}</div>
            <div className="text-sm text-muted-foreground">{p.desc}</div>
          </Card>
        ))}
      </div>
      <Card className="mt-6 p-0 overflow-hidden">
        <div className="grid grid-cols-2 border-b bg-muted text-sm font-semibold">
          <div className="p-4">До</div><div className="p-4 text-primary">Після</div>
        </div>
        {D.beforeAfter.map(([b, a]) => (
          <div key={b} className="grid grid-cols-2 border-b last:border-0">
            <div className="flex items-center gap-2 p-4 text-muted-foreground"><X className="size-4 text-destructive" />{b}</div>
            <div className="flex items-center gap-2 p-4 font-medium"><Check className="size-4 text-teal" />{a}</div>
          </div>
        ))}
      </Card>
    </Section>
  );
}

function Audience() {
  return (
    <Section id="audience" eyebrow="Цільова аудиторія" title="Два ключові сегменти" sub="Учні 5–11 класів та їхні батьки">
      <div className="grid gap-6 lg:grid-cols-2">
        {D.segments.map((s) => (
          <Card key={s.name}>
            <div className="flex items-center gap-3"><Users className="size-5 text-primary" /><h3 className="text-2xl font-semibold">{s.name}</h3></div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-xs font-medium tracking-wider text-destructive uppercase">Проблема</h4>
                <ul className="mt-2 space-y-1.5 text-sm">{s.problem.map((p) => <li key={p}>• {p}</li>)}</ul>
              </div>
              <div>
                <h4 className="text-xs font-medium tracking-wider text-teal uppercase">Рішення</h4>
                <ul className="mt-2 space-y-1.5 text-sm">{s.solution.map((p) => <li key={p}>• {p}</li>)}</ul>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-brand p-4 font-semibold text-primary-foreground">{s.result}</div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Trust() {
  return (
    <Section eyebrow="Довіра" title="Чому нам вірити?" sub="Лише підтверджені факти — без вигаданих відгуків, рейтингів чи статистики.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {D.trustFacts.map((f) => (
          <div key={f} className="flex items-start gap-3 rounded-xl border bg-card p-4"><BadgeCheck className="size-5 shrink-0 text-primary" /><span className="font-medium">{f}</span></div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {D.trustFlow.map((t, i) => (
          <span key={t} className="flex items-center gap-2">
            <span className={`rounded-xl px-4 py-3 font-semibold ${i === D.trustFlow.length - 1 ? "bg-brand text-primary-foreground" : "border bg-card"}`}>{t}</span>
            {i < D.trustFlow.length - 1 && <ArrowRight className="size-4 text-muted-foreground" />}
          </span>
        ))}
      </div>
    </Section>
  );
}

const channelIcons = [Target, Megaphone, Search, Share2, Mail];

function Channels() {
  return (
    <Section id="channels" eyebrow="Залучення" title="Маркетингові канали">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {D.channels.map((c, i) => {
          const Icon = channelIcons[i];
          return (
            <Card key={c.name}>
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon className="size-5" /></div>
                <div><div className="font-semibold">{c.name}</div><div className="text-xs text-muted-foreground">{c.role}</div></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">{c.focus.map((f) => <span key={f} className="rounded-md bg-muted px-2 py-1 text-xs">{f}</span>)}</div>
              <div className="mt-4 text-xs font-medium text-muted-foreground uppercase">KPI</div>
              <div className="mt-1 text-sm">{c.kpis.join(" · ")}</div>
            </Card>
          );
        })}
      </div>
      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left"><tr>{["Меседж", "Канал", "Дія"].map((h) => <th key={h} className="p-4 font-semibold">{h}</th>)}</tr></thead>
          <tbody>
            {D.messageMatrix.map(([m, c, a]) => (
              <tr key={m} className="border-t"><td className="p-4 font-medium">{m}</td><td className="p-4 text-primary">{c}</td><td className="p-4">{a}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Section>
  );
}

function Competitive() {
  return (
    <Section id="competitive" eyebrow="Позиція на ринку" title="Конкурентна стратегія">
      <Card>
        <h3 className="text-2xl font-bold text-brand">Послідовник із власною ідентичністю</h3>
        <p className="mt-2 max-w-3xl text-muted-foreground">Використовуємо перевірені практики лідерів ринку, але диференціюємо NeuroMath Academy через персоналізацію, AI-підтримку та прозорий контроль прогресу.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {D.differentiators.map((d) => (
            <div key={d.name} className="rounded-xl bg-night p-5 text-night-foreground">
              <div className="text-sm font-bold tracking-widest text-cyan uppercase">{d.name}</div>
              <div className="mt-2 text-night-foreground/80">{d.desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

function Growth() {
  return (
    <Section id="growth" eyebrow="Масштабування" title="Стратегія зростання">
      <div className="grid gap-4 md:grid-cols-3">
        {D.growthStrategy.map((g, i) => (
          <Card key={g.name} className="relative">
            <div className="text-5xl font-extrabold text-brand opacity-80">{g.num}</div>
            <div className="mt-2 text-xl font-semibold">{g.name}</div>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
            {i < 2 && <ArrowRight className="absolute top-1/2 -right-5 z-10 hidden size-6 text-primary md:block" />}
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-3"><h3 className="text-lg font-semibold">Очікуваний шлях зростання</h3><span className="rounded-full bg-spark/20 px-2 py-0.5 text-[10px] font-bold tracking-wider">ПРОГНОЗ — НЕ ФАКТИЧНІ ДАНІ</span></div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {D.roadmap.map((r, i) => (
            <div key={r} className="text-center">
              <div className="h-2 rounded-full bg-brand" style={{ opacity: 0.4 + i * 0.15 }} />
              <div className="mt-2 text-xs font-medium sm:text-sm">{r}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Swot() {
  const tone: Record<string, string> = { "Сильні сторони": "text-teal", "Слабкі сторони": "text-spark-foreground", "Можливості": "text-primary", "Загрози": "text-destructive" };
  return (
    <Section id="swot" eyebrow="Аналіз" title="SWOT-аналіз">
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(D.swot).map(([k, items]) => (
          <Card key={k}>
            <div className="flex items-center gap-3"><span className={`text-4xl font-extrabold ${tone[k]}`}>{k[0]}</span><h3 className="text-xl font-semibold">{k}</h3></div>
            <ul className="mt-4 space-y-1.5 text-sm">{items.map((i) => <li key={i}>• {i}</li>)}</ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Tables() {
  return (
    <Section id="actual" eyebrow="Цілі та відстеження" title="Прогноз, ціль і факт">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted"><tr><th className="p-4 text-left">KPI</th><th className="p-4 text-right">Прогноз</th><th className="p-4 text-right">Ціль</th></tr></thead>
            <tbody>{D.forecastVsTarget.map(([k, f, t]) => <tr key={k} className="border-t"><td className="p-4">{k}</td><td className="p-4 text-right font-semibold">{f}</td><td className="p-4 text-right text-primary">{t}</td></tr>)}</tbody>
          </table>
        </Card>
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted"><tr><th className="p-4 text-left">KPI</th><th className="p-4 text-right">Прогноз</th><th className="p-4 text-right">Факт</th></tr></thead>
            <tbody>{D.forecastVsActual.map((r) => <tr key={r.kpi} className="border-t"><td className="p-4">{r.kpi}</td><td className="p-4 text-right font-semibold">{r.forecast}</td><td className="p-4 text-right text-muted-foreground">{r.actual ?? "—"}</td></tr>)}</tbody>
          </table>
          <p className="border-t bg-spark/10 p-4 text-sm font-semibold">Фактичні дані: поки відсутні</p>
        </Card>
      </div>
    </Section>
  );
}

function Measurement() {
  return (
    <Section id="measurement" eyebrow="Аналітика" title="Як ми вимірюємо">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {D.measurement.map((m) => (
          <Card key={m.area}>
            <LineChart className="size-5 text-primary" />
            <div className="mt-3 font-semibold">{m.area}</div>
            <div className="text-sm text-primary">{m.tool}</div>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">{m.metrics.map((x) => <li key={x}>{x}</li>)}</ul>
          </Card>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-dashed p-5">
        <div className="text-sm font-semibold">Майбутні інтеграції <span className="ml-2 text-xs font-normal text-muted-foreground">— ще не підключено</span></div>
        <div className="mt-3 flex flex-wrap gap-2">{D.futureIntegrations.map((f) => <Chip key={f}>{f}</Chip>)}</div>
      </div>
    </Section>
  );
}

function Next() {
  return (
    <Section id="next" eyebrow="Дорожня карта" title="Наступні кроки">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {D.nextSteps.map((s, i) => (
          <Card key={s} className="flex items-center gap-4">
            <span className="text-3xl font-extrabold text-brand">0{i + 1}</span><span className="font-semibold">{s}</span>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-center text-sm font-semibold tracking-wide text-muted-foreground">Стратегія → Запуск → Вимірювання → Порівняння → Оптимізація → Масштабування</p>
    </Section>
  );
}

function Final() {
  const rows = [["Для батьків", "Спокій + зрозумілий прогрес + підтримка"], ["Для учнів", "Розуміння + впевненість + контроль"], ["Для бізнесу", "Персоналізація + AI + вимірюваний результат"]];
  return (
    <section className="relative my-12 overflow-hidden rounded-3xl bg-hero p-10 text-night-foreground md:p-14">
      <div className="math-grid absolute inset-0" />
      <div className="relative">
        <p className="text-lg text-night-foreground/70">Не просто допомагаємо розв'язувати задачі.</p>
        <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">Допомагаємо <span className="text-cyan">зрозуміти математику.</span></h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {rows.map(([a, b]) => (
            <div key={a} className="rounded-xl border border-night-foreground/15 p-5">
              <div className="text-xs font-medium tracking-widest text-cyan uppercase">{a}</div>
              <div className="mt-2 font-semibold">{b}</div>
            </div>
          ))}
        </div>
        <ArrowDown className="pres-hide mt-8 size-5 opacity-0" />
      </div>
    </section>
  );
}

const Shot = ({ src, title, channel, className = "" }: { src: string; title: string; channel: string; className?: string }) => (
  <figure className={`group overflow-hidden rounded-2xl border bg-card shadow-card ${className}`}>
    <a href={src} target="_blank" rel="noreferrer" className="block overflow-hidden bg-muted">
      <img src={src} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
    </a>
    <figcaption className="flex items-center justify-between gap-2 p-4">
      <span className="font-medium">{title}</span>
      <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{channel}</span>
    </figcaption>
  </figure>
);

function Creatives() {
  return (
    <Section id="creatives" eyebrow="Контент" title="Креативи для соцмереж" sub="Приклади рекламних і контентних матеріалів для Instagram, Facebook, TikTok та Google Ads.">
      <h3 className="text-lg font-semibold">Instagram-карусель «Типові помилки на НМТ»</h3>
      <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-4">
        {D.carousel.map((c, i) => (
          <figure key={c.src} className="w-64 shrink-0 snap-start overflow-hidden rounded-2xl border bg-card shadow-card">
            <img src={c.src} alt={c.title} loading="lazy" className="aspect-square w-full object-cover" />
            <figcaption className="p-3 text-sm"><span className="mr-2 font-bold text-primary">{i + 1}/{D.carousel.length}</span>{c.title}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {D.creatives.map((c) => <Shot key={c.src} {...c} className="[&_img]:aspect-[4/3]" />)}
      </div>
    </Section>
  );
}

function Pages() {
  return (
    <Section id="pages" eyebrow="Присутність бренду" title="Приклади сторінок" sub="Оформлення профілів NeuroMath Academy у соціальних мережах.">
      <div className="grid gap-4 md:grid-cols-3">
        {D.pageExamples.map((c) => <Shot key={c.src} {...c} className="[&_img]:aspect-[3/4] [&_img]:object-top" />)}
      </div>
    </Section>
  );
}

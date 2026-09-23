"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type SkillDef = {
  tag: string;
  title: string;
  kicker: string;
  accent: string;
  text: string;
  chips: string[];
  details: string[];
};

const skills: SkillDef[] = [
  {
    tag: "01",
    title: "FRONTEND",
    kicker: "Next.js · React · TS · Tailwind · Angular",
    accent: "bg-sun",
    text: "text-ink",
    chips: ["Next.js (SSR, App Router)", "React", "TypeScript", "Tailwind", "Angular"],
    details: [
      "Component architecture, reusability and clean UX",
      "High-performance, responsive, accessible interfaces",
      "Server-Side Rendering + API Routes",
    ],
  },
  {
    tag: "02",
    title: "BACKEND & FULL-STACK",
    kicker: "Python · Django · Go · Java · REST APIs",
    accent: "bg-cobalt",
    text: "text-paper",
    chips: ["Python (Django)", "Go", "Java", "REST APIs", "Auth & RBAC"],
    details: [
      "Production-grade full-stack applications end to end",
      "Authentication and role-based access control",
      "Real-time features, complex business logic, data processing",
    ],
  },
  {
    tag: "03",
    title: "DATABASES & DATA",
    kicker: "PostgreSQL · MySQL · Oracle SQL · Vector & Graph DBs",
    accent: "bg-moss",
    text: "text-paper",
    chips: ["PostgreSQL", "MySQL", "Oracle SQL", "Vector DBs", "Graph DBs"],
    details: [
      "Relational schema design and query optimization",
      "Vector embeddings and semantic search",
      "Data flows for AI-powered, data-intensive apps",
    ],
  },
  {
    tag: "04",
    title: "FINACLE CORE BANKING",
    kicker: "Scripting · Modules · EOD/BOD · Oracle SQL",
    accent: "bg-coral",
    text: "text-ink",
    chips: ["Finacle modules", "EOD/BOD", "Connect24", "SSO / CRM", "Oracle SQL"],
    details: [
      "Core banking configuration: workflows, menus, products, Txn rules",
      "RESTful integrations with payment gateways, CRM, mobile banking",
      "Oracle SQL analysis for reconciliation, validation, reporting",
    ],
  },
  {
    tag: "05",
    title: "APPLIED AI",
    kicker: "RAG · Embeddings · Semantic Search · LLMs",
    accent: "bg-paper",
    text: "text-ink",
    chips: ["RAG pipelines", "Vector embeddings", "Semantic search", "Local LLMs"],
    details: [
      "Retrieval-Augmented Generation systems end to end",
      "Document ingestion and contextual knowledge retrieval",
      "Self-hosted, Docker-based AI infrastructure",
    ],
  },
  {
    tag: "06",
    title: "LINUX & DEVOPS",
    kicker: "Linux/Unix · Shell · Production Support",
    accent: "bg-cobalt",
    text: "text-paper",
    chips: ["Linux/Unix", "Shell scripting", "Automation", "Monitoring"],
    details: [
      "High-availability production systems support",
      "EOD/BOD batch pipelines kept stable and consistent",
      "Debugging, logging, incident analysis",
    ],
  },
  {
    tag: "07",
    title: "API & INTEGRATION",
    kicker: "RESTful · SOAP · Third-party integrations",
    accent: "bg-sun",
    text: "text-ink",
    chips: ["RESTful APIs", "SOAP", "Third-party", "Payment gateways"],
    details: [
      "Designing and consuming APIs across the stack",
      "Connecting frontends, backends and external systems",
      "Finacle ↔ Connect24, SSO, CRM and banking integrations",
    ],
  },
  {
    tag: "08",
    title: "CYBERSECURITY",
    kicker: "Threat Detection · Mitigation · Pen-testing",
    accent: "bg-moss",
    text: "text-paper",
    chips: ["Threat detection", "Mitigation", "Pen-test basics"],
    details: [
      "Threat detection and mitigation techniques",
      "Penetration testing fundamentals",
      "Secure auth and access control workflows",
    ],
  },
];

type PhotoDragCardProps = {
  rotate: number;
};

function PhotoDragCard({ rotate }: PhotoDragCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-60, 60], [10, -10]), {
    stiffness: 200,
    damping: 18,
  });
  const rY = useSpring(useTransform(x, [-60, 60], [-10, 10]), {
    stiffness: 200,
    damping: 18,
  });
  const [size, setSize] = useState({ w: 176, h: 280 });

  const startResize = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  function onResizePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.stopPropagation();
    startResize.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onResizePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!startResize.current) return;
    e.stopPropagation();
    const { x: sx, y: sy, w, h } = startResize.current;
    setSize({
      w: Math.max(140, Math.min(320, w + (e.clientX - sx))),
      h: Math.max(200, Math.min(520, h + (e.clientY - sy))),
    });
  }

  function onResizePointerUp() {
    startResize.current = null;
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      drag
      dragElastic={0.25}
      dragMomentum={false}
      whileDrag={{ scale: 1.06, zIndex: 50 }}
      whileHover={{ scale: 1.03 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40, rotate }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
      style={{
        width: size.w,
        rotateX: rX,
        rotateY: rY,
        transformPerspective: 900,
      }}
      className="card-drag riso-shadow-ink relative select-none border-2 border-ink bg-paper bg-grain p-4"
    >
      <div className="flex items-center justify-between text-xs font-body font-medium text-ink/60">
        <span>PHOTO</span>
        <span>↗</span>
      </div>
      <div className="mt-2 w-full bg-gradient-to-br from-coral via-cobalt to-moss p-[3px]">
        <div className="grid h-40 w-full place-items-center border border-dashed border-ink/60 bg-paper/40">
          <span className="font-display text-lg text-ink/50">
            YOUR FACE HERE
          </span>
        </div>
      </div>
      <div className="mt-2 bg-gradient-to-br from-coral via-cobalt to-moss p-2 text-paper">
        <div className="font-display text-base leading-none">HARUN NJIHIA</div>
        <div className="mt-1 font-body text-[11px] text-paper/80">
          drop a portrait in /public/me.jpg
        </div>
      </div>

      <div
        role="slider"
        aria-label="Resize photo card"
        onPointerDown={onResizePointerDown}
        onPointerMove={onResizePointerMove}
        onPointerUp={onResizePointerUp}
        onDoubleClick={() => setSize({ w: 176, h: 280 })}
        className="absolute bottom-2 right-2 -mt-8 grid h-6 w-6 cursor-nwse-resize place-items-center border-2 border-ink bg-sun text-xs font-display leading-none"
        title="drag to resize · double-click to reset"
      >
        ⤡
      </div>
    </motion.div>
  );
}

type SkillCardProps = {
  skill: SkillDef;
  index: number;
  onOpen: () => void;
};

function SkillCard({ skill, index, onOpen }: SkillCardProps) {
  const rotations = [-1.5, 1.2, -0.8, 1.5, -1.2, 0.9, -1.1, 1.4];

  return (
    <motion.button
      type="button"
       drag
      dragElastic={0.25}
      dragMomentum={false}
      whileDrag={{ scale: 1.06, zIndex: 50 }}
      // whileHover={{ scale: 1.03 }}
      // onMouseMoe={onMouseMove}
      // onMouseLeave={onMouseLeave}
      onClick={onOpen}
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: rotations[index % rotations.length] }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
      whileTap={{ scale: 0.97 }}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.45, ease: "easeOut" }}
      className={`riso-shadow-sm flex min-w-0 flex-col gap-1 overflow-hidden border-2 border-ink p-4 text-left sm:p-5 ${skill.accent} ${skill.text}`}
    >
      <div className="flex items-start justify-between font-body text-xs font-medium opacity-60">
        <span>{skill.tag}</span>
        <span>+</span>
      </div>
      <div className="mt-1 break-words font-display text-xl leading-tight sm:text-2xl">
        {skill.title}
      </div>
      <div className="break-words font-body text-[10px] leading-snug opacity-70 sm:text-xs">
        {skill.kicker}
      </div>
      <div className="mt-auto flex flex-wrap gap-1 pt-2">
        {skill.chips.slice(0, 3).map((c) => (
          <span
            key={c}
            className="border border-current px-1.5 py-0.5 font-body text-[10px] opacity-70"
          >
            {c}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

function SectionHeading({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b-2 border-paper pb-3">
      <span className="font-body text-sm text-coral">{tag}</span>
      <h2 className="font-display text-4xl sm:text-5xl">{title}</h2>
    </div>
  );
}

export default function Home() {
  const [activeSkill, setActiveSkill] = useState<SkillDef | null>(null);

  return (
    <main className="bg-night">
      {/* HERO — 30/70 POSTER SPLIT */}
      <section className="relative grid min-h-[100svh] grid-cols-1 overflow-hidden border-b-2 border-paper/15 lg:grid-cols-[30%_70%]">
        {/* oversized ghost wordmark behind everything */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-body text-[24vw] font-bold uppercase leading-none tracking-tight text-paper/[0.05] lg:text-[13vw] lg:left-[68%]"
        >
          HARUN
        </div>

        {/* LEFT 30% */}
        <div className="relative z-10 flex flex-col border-b-2 border-paper/15 px-6 pb-8 pt-10 sm:px-10 lg:border-b-0 lg:border-r-2 lg:px-12 lg:py-12">
          <p className="font-body text-xs tracking-wide text-paper/60">
            NAIROBI, KENYA — PORTFOLIO 2026
          </p>

          <h1 className="mt-4 z-10 font-body text-[16vw] font-bold uppercase leading-[0.85] tracking-tighter text-paper sm:text-7xl lg:text-[5.5vw]">
            HARUN
            <br />
            NJIHIA
          </h1>

          <p className="mt-5 max-w-sm font-body text-sm z-50 text-paper/70 sm:text-base">
            Full-stack engineer building production-grade web apps, applied AI
            systems, and Finacle core banking integrations — where banking
            systems, the web, and AI meet.
          </p>

          <div className="mt-8">
            <PhotoDragCard rotate={-3} />
          </div>

          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-10 font-body text-xs text-paper/50">
            <a href="mailto:harunnjihia@gmail.com" className="hover:text-paper">
              EMAIL
            </a>
            <a
              href="https://github.com/harun-njihia"
              className="hover:text-paper"
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/in/harun-njihia"
              className="hover:text-paper"
            >
              LINKEDIN
            </a>
          </div>
        </div>

        {/* RIGHT 70% */}
        <div className="relative z-10 flex flex-col px-6 py-10 sm:px-10 lg:h-[100svh] lg:overflow-y-auto lg:px-12 lg:py-12">
          <div className="mb-8 flex items-baseline justify-between gap-4 border-b-2 border-paper pb-3">
            <span className="font-body text-sm text-coral">01 — SKILLS</span>
            <h2 className="font-display text-4xl sm:text-5xl">THE STACK</h2>
            <span className="hidden font-body text-xs text-paper/40 sm:block">
              click a card to expand
            </span>
          </div>

          <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {skills.map((s, i) => (
              <SkillCard
                key={s.title}
                skill={s}
                index={i}
                onOpen={() => setActiveSkill(s)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SKILL DETAIL MODAL */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSkill(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-night/85 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 34, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 34, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="riso-shadow w-full max-w-lg border-2 border-paper bg-black p-6 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="font-body text-sm text-coral">
                  {activeSkill.tag}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveSkill(null)}
                  className="font-body text-sm text-paper/60 hover:text-paper"
                >
                  CLOSE ✕
                </button>
              </div>
              <h3 className="mt-3 font-display text-4xl">{activeSkill.title}</h3>
              <p className="mt-2 font-body text-sm text-paper/60">
                {activeSkill.kicker}
              </p>

              <ul className="mt-6 space-y-2">
                {activeSkill.details.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 border-b border-paper/10 pb-2 font-body text-sm text-paper/85"
                  >
                    <span className="mt-0.5 text-coral">▸</span>
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {activeSkill.chips.map((c) => (
                  <span
                    key={c}
                    className="border border-paper/40 px-2 py-1 font-body text-xs text-paper/80"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-3xl px-6 py-20 sm:px-12">
        <SectionHeading tag="02 — ABOUT" title="Who's building this" />
        <div className="border-2 border-paper/20 bg-night/60 p-6">
          <p className="font-body text-base leading-relaxed text-paper/85 sm:text-lg">
            I&apos;m Harun Njihia Muriuki — Software Engineer and Finacle
            Systems Engineer at E&amp;M Technology House, based in Nairobi,
            working on core banking integrations and fintech systems since
            February 2025. My work spans Oracle PL/SQL development, backend and
            full-stack engineering, and applied AI — the intersection of core
            banking systems, frontend-first full-stack development, and AI
            engineering is where I&apos;m most useful.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-paper/85 sm:text-lg">
            I hold a BSc in Mathematics and Computer Science from JKUAT (Second
            Class Upper Honours, 2024).
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-3xl px-6 py-20 sm:px-12">
        <SectionHeading tag="03 — PROJECTS" title="Shipped things" />
        <div className="space-y-6">
          <article className="border-2 border-paper/20 bg-night/60 p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-2xl">GRAPH RAG SYSTEM</h3>
              <span className="font-body text-xs text-paper/50">AI / INFRA</span>
            </div>
            <p className="mt-2 font-body text-sm leading-relaxed text-paper/80">
              A self-hosted, local, Docker-based Graph RAG system — applied AI
              engineering end to end, from pipeline to deployment.
            </p>
          </article>
          <article className="border-2 border-paper/20 bg-night/60 p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-2xl">
                FINACLE PL/SQL REPORTING
              </h3>
              <span className="font-body text-xs text-paper/50">
                CORE BANKING
              </span>
            </div>
            <p className="mt-2 font-body text-sm leading-relaxed text-paper/80">
              Oracle PL/SQL and SQL reporting for Finacle core banking —
              interest accrual, AML, currency handling, loan portfolio, and
              deduplication.
            </p>
          </article>
        </div>
      </section>

      {/* REEL */}
      <section id="reel" className="mx-auto max-w-3xl px-6 py-20 sm:px-12">
        <SectionHeading tag="04 — REEL" title="Watch it move" />
        <div className="border-2 border-paper/20 bg-night/60">
          <video
            className="aspect-video w-full"
            controls
            playsInline
            poster="/reel-poster.jpg"
          >
            <source src="/reel.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="mt-3 font-body text-xs text-paper/50">
          Drop your own clip at <code>/public/reel.mp4</code> (and a thumbnail
          at <code>/public/reel-poster.jpg</code>) — a build demo, a talk, a
          screen recording, whatever shows the work moving.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-3xl px-6 py-20 sm:px-12">
        <SectionHeading tag="05 — CONTACT" title="Say hello" />
        <div className="border-2 border-paper/20 bg-night/60 p-6">
          <p className="font-body text-base text-paper/80">
            Open to interesting work in core banking, full-stack builds, and
            applied AI.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 font-display text-lg">
            <a
              href="mailto:harunnjihia@gmail.com"
              className="riso-shadow sm border-2 border-paper bg-sun px-4 py-2 text-ink transition-transform hover:-translate-y-0.5"
            >
              EMAIL
            </a>
            <a
              href="https://github.com/harun-njihia"
              className="riso-shadow-sm border-2 border-paper bg-paper px-4 py-2 text-ink transition-transform hover:-translate-y-0.5"
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/in/harun-njihia"
              className="riso-shadow-sm border-2 border-paper bg-cobalt px-4 py-2 text-paper transition-transform hover:-translate-y-0.5"
            >
              LINKEDIN
            </a>
          </div>
        </div>
        <p className="mt-10 text-center font-body text-xs text-paper/40">
          built by hand in nairobi
        </p>
      </section>
    </main>
  );
}
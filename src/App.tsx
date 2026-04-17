import { useEffect, useMemo, useState, type ElementType, type HTMLAttributes } from "react";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Globe,
  Menu,
  PenTool,
  Rocket,
  Search,
  SquareTerminal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type SectionId = "services" | "projects" | "process" | "contact";

const NAV_ITEMS: { id: SectionId; label: string; menuLabel?: string; index: string }[] = [
  { id: "services", label: "Services", index: "01" },
  { id: "projects", label: "Latest Projects", menuLabel: "Projects", index: "02" },
  { id: "process", label: "Our Process", menuLabel: "Process", index: "03" },
  { id: "contact", label: "Contact", index: "04" },
];

const DEPLOYMENT_STEPS = [
  {
    number: "01",
    title: "Discovery & Mapping",
    description:
      "Deep-dive workshops to align technical requirements with long-term commercial objectives.",
  },
  {
    number: "02",
    title: "Rapid Prototyping",
    description:
      "Iterative sprints that produce functional code early, ensuring project velocity and transparency.",
  },
  {
    number: "03",
    title: "Scale Deployment",
    description:
      "Deployment to distributed infrastructure with 24/7 monitoring and performance optimization.",
  },
];

const PROCESS_STEPS: {
  icon: ElementType;
  number: string;
  title: string;
  description: string;
  bullets: string[];
}[] = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description:
      "We dive deep into your ecosystem to identify core friction points and untapped opportunities for technological leverage.",
    bullets: ["Stakeholder Audits", "Market Analysis"],
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design",
    description:
      "Architecting intuitive systems that bridge the gap between complex engineering and effortless user experiences.",
    bullets: ["Visual Systems", "System Architecture"],
  },
  {
    icon: Code2,
    number: "03",
    title: "Develop",
    description:
      "Engineering clean, performant, and scalable codebases using modern frameworks and modular design patterns.",
    bullets: ["Agile Sprints", "CI/CD Pipelines"],
  },
  {
    icon: Rocket,
    number: "04",
    title: "Deploy",
    description:
      "Rigorous testing and seamless deployment followed by proactive monitoring to ensure zero-downtime performance.",
    bullets: ["Edge Performance", "Scale Monitoring"],
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("services");
  const [heroMode, setHeroMode] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroMode(entry.isIntersecting && entry.intersectionRatio > 0.35);
      },
      { threshold: [0.25, 0.35, 0.65] },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!sections.length) return;

    const ratios = new Map<SectionId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id as SectionId, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        const next = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
        if (next?.[1]) {
          setActiveSection(next[0]);
        }
      },
      {
        rootMargin: "-34% 0px -42% 0px",
        threshold: [0.15, 0.25, 0.45, 0.65],
      },
    );

    sections.forEach((section) => {
      ratios.set(section.id as SectionId, 0);
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const desktopNavItems = useMemo(() => NAV_ITEMS.filter((item) => item.id !== "contact"), []);

  const navigateTo = (id: SectionId | "hero") => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        activeSection={activeSection}
        desktopNavItems={desktopNavItems}
        heroMode={heroMode}
        onMenuOpen={() => setMenuOpen(true)}
        onNavigate={navigateTo}
      />

      <main className="overflow-x-hidden">
        <section
          id="hero"
          className="relative isolate flex min-h-screen items-center overflow-hidden bg-black"
        >
          <div className="absolute inset-0">
            <img
              alt=""
              aria-hidden="true"
              className="h-full w-full scale-[1.08] object-cover object-center opacity-65 blur-[1.4px] brightness-[0.42] saturate-[0.75]"
              src="/assets/hero-bg.png"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(183,220,255,0.24),transparent_22%),radial-gradient(circle_at_70%_44%,rgba(160,153,255,0.16),transparent_20%)]" />
            <div className="absolute inset-0 bg-hero-fade" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.38)_0%,rgba(8,8,8,0.1)_40%,rgba(8,8,8,0.62)_100%)]" />
          </div>

          <Container className="relative z-10 flex flex-col items-center pb-20 pt-36 text-center md:pb-28 md:pt-44">
            <div className="max-w-[58rem]">
              <p className="mb-8 text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-white/55 sm:mb-10">
                Performance Systems Studio
              </p>
              <h1 className="text-[clamp(3.3rem,9vw,7.6rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
                Building the <span className="text-gradient">future</span>
              </h1>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                className="min-w-[11rem]"
                onClick={() => navigateTo("contact")}
                size="lg"
              >
                Schedule a Call
              </Button>
              <Button
                className="min-w-[11rem]"
                onClick={() => navigateTo("projects")}
                size="lg"
                variant="outline"
              >
                View Our Work
              </Button>
            </div>
          </Container>
        </section>

        <section
          className="relative border-t border-white/[0.04] py-24 md:py-28 lg:py-32"
          data-section
          id="services"
        >
          <Container className="space-y-16 md:space-y-20">
            <div className="grid gap-10 lg:grid-cols-[1.55fr_0.8fr] lg:items-start">
              <div>
                <p className="label">Our Specializations</p>
                <h2 className="mt-5 max-w-[52rem] text-[clamp(3rem,7vw,5.85rem)] font-semibold leading-[0.96] tracking-[-0.065em]">
                  Tailored solutions for the <span className="text-gradient">modern enterprise.</span>
                </h2>
              </div>
              <p className="max-w-[25rem] pt-2 text-lg leading-9 text-white/58">
                We architect high-performance digital ecosystems that bridge the gap between complex
                engineering and intuitive user experience.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[2.05fr_1fr]">
              <div className="surface panel-glow relative overflow-hidden">
                <img
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-y-0 right-0 hidden h-full w-[60%] object-cover object-right opacity-55 lg:block"
                  src="/assets/service-circuit.png"
                />
                <div className="absolute inset-y-0 right-0 hidden w-[68%] bg-[linear-gradient(90deg,rgba(22,22,23,0.96)_0%,rgba(22,22,23,0.18)_48%,rgba(22,22,23,0.12)_100%)] lg:block" />
                <div className="relative flex min-h-[30rem] flex-col justify-between p-8 md:p-10">
                  <div className="space-y-7">
                    <IconBadge icon={SquareTerminal} />
                    <div className="max-w-[27rem] space-y-4">
                      <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">
                        Custom Web Applications
                      </h3>
                      <p className="text-[1.05rem] leading-9 text-white/58">
                        Scalable, cloud-native architectures designed to handle intensive data
                        workflows while maintaining a seamless user interface.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {["React / Next.js", "Cloud Architecture", "API First"].map((chip) => (
                        <Tag key={chip}>{chip}</Tag>
                      ))}
                    </div>
                  </div>

                  <ActionButton onClick={() => navigateTo("contact")}>Explore Capabilities</ActionButton>
                </div>
              </div>

              <div className="surface panel-glow flex min-h-[30rem] flex-col justify-between p-8 md:p-10">
                <div className="space-y-7">
                  <IconBadge icon={BrainCircuit} />
                  <div className="space-y-4">
                    <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">
                      AI Assistants &amp; Automation
                    </h3>
                    <p className="text-[1.02rem] leading-9 text-white/56">
                      Integrating LLMs and autonomous agents into your existing business logic to
                      eliminate repetitive overhead.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-white/[0.06] pt-7">
                  {[
                    "Custom LLM Fine-tuning",
                    "Workflow Orchestration",
                    "Natural Language Interfaces",
                  ].map((item) => (
                    <BulletItem key={item}>{item}</BulletItem>
                  ))}
                </div>
              </div>
            </div>

            <div className="surface panel-glow relative overflow-hidden">
              <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
                <div className="flex min-h-[25rem] flex-col justify-between p-8 md:p-10">
                  <div className="space-y-7">
                    <IconBadge icon={Globe} />
                    <div className="max-w-[34rem] space-y-4">
                      <h3 className="text-[clamp(2.2rem,4vw,3.6rem)] font-semibold tracking-[-0.045em] text-white">
                        High-Performance Business Websites
                      </h3>
                      <p className="text-[1.05rem] leading-9 text-white/56">
                        Elevate your brand with digital experiences that convert. We focus on
                        narrative-driven design coupled with elite SEO and technical performance.
                      </p>
                    </div>
                  </div>

                  <div>
                    <Button
                      className="min-w-[11.5rem]"
                      onClick={() => navigateTo("projects")}
                    >
                      View Showcase
                    </Button>
                  </div>
                </div>

                <div className="relative h-full px-6 pb-6 lg:px-0 lg:pb-0 lg:pr-6">
                  <div className="absolute right-8 top-8 z-10 rounded-2xl border border-white/10 bg-black/38 px-5 py-4 shadow-soft backdrop-blur-md">
                    <div className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/75">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      Live Performance Data
                    </div>
                    <div className="mt-5 h-1 rounded-full bg-white/10">
                      <div className="h-full w-[92%] rounded-full bg-primary" />
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-primary/75">
                      <span>FID: 12ms</span>
                      <span>LCP: 0.8s</span>
                    </div>
                  </div>

                  <img
                    alt="Monochrome laptop mockup"
                    className="h-full min-h-[18rem] w-full rounded-[26px] object-cover object-center lg:rounded-none"
                    src="/assets/service-laptop.png"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div className="grid gap-8 border-b border-white/[0.04] pb-12 lg:grid-cols-[1.1fr_auto] lg:items-end">
                <div className="space-y-4">
                  <h3 className="text-[clamp(2.2rem,4vw,3.2rem)] font-semibold tracking-[-0.045em]">
                    A standard for excellence.
                  </h3>
                  <p className="max-w-[36rem] text-[1.02rem] leading-8 text-white/54">
                    We don&apos;t just build features; we engineer business outcomes through a
                    rigorous three-step deployment lifecycle.
                  </p>
                </div>

                <button
                  className="inline-flex items-center gap-2 text-base text-primary transition-colors hover:text-white"
                  onClick={() => navigateTo("contact")}
                  type="button"
                >
                  <span className="border-b border-primary/45 pb-1">Download Capabilities Deck</span>
                </button>
              </div>

              <div className="grid gap-10 pt-12 md:grid-cols-3">
                {DEPLOYMENT_STEPS.map((step) => (
                  <div
                    className="space-y-6 border-t border-white/[0.04] pt-10"
                    key={step.number}
                  >
                    <span className="block text-[clamp(4.5rem,8vw,7rem)] font-semibold leading-none tracking-[-0.08em] text-white/[0.12]">
                      {step.number}
                    </span>
                    <div className="space-y-3">
                      <h4 className="text-[1.7rem] font-semibold tracking-[-0.04em] text-white">
                        {step.title}
                      </h4>
                      <p className="max-w-[22rem] text-base leading-8 text-white/54">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section
          className="relative border-t border-white/[0.04] py-24 md:py-28 lg:py-32"
          data-section
          id="projects"
        >
          <Container className="space-y-16 md:space-y-20">
            <div className="grid gap-10 lg:grid-cols-[1.55fr_0.82fr] lg:items-start">
              <div>
                <p className="label">Portfolio Showcase</p>
                <h2 className="mt-5 text-[clamp(3rem,7vw,5.85rem)] font-semibold leading-[0.93] tracking-[-0.07em]">
                  Recent <span className="text-white/16">Commissions.</span>
                </h2>
              </div>
              <p className="max-w-[25rem] pt-2 text-lg leading-9 text-white/58">
                A curated selection of digital architectures designed for the next generation of
                industry leaders.
              </p>
            </div>

            <div className="grid gap-10 xl:grid-cols-[1.45fr_0.92fr] xl:items-center">
              <div className="surface overflow-hidden p-0">
                <img
                  alt="Nexus Capital interface world map"
                  className="h-full w-full object-cover"
                  src="/assets/project-map.png"
                />
              </div>
              <div className="space-y-6 xl:pl-6">
                <p className="label">Fintech • 2024</p>
                <div className="space-y-4">
                  <h3 className="text-[clamp(2.4rem,4vw,3.8rem)] font-semibold tracking-[-0.05em]">
                    Nexus Capital Interface
                  </h3>
                  <p className="max-w-[32rem] text-[1.08rem] leading-9 text-white/58">
                    Redefining institutional asset management through a hyper-responsive, dark-mode
                    terminal designed for high-frequency decision making.
                  </p>
                </div>
                <ActionButton onClick={() => navigateTo("contact")}>View Case Study</ActionButton>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="surface overflow-hidden p-0">
                  <img
                    alt="Veloce Configurator concept orb"
                    className="h-full min-h-[34rem] w-full object-cover"
                    src="/assets/project-orb.png"
                  />
                </div>
                <div className="space-y-3">
                  <p className="label">Automotive • UX/UI</p>
                  <h3 className="text-[clamp(2rem,3vw,2.75rem)] font-semibold tracking-[-0.045em]">
                    Veloce Configurator
                  </h3>
                  <p className="max-w-[30rem] text-[1.02rem] leading-8 text-white/56">
                    A high-fidelity 3D customization platform for premium electric vehicles,
                    focusing on tactile feedback and fluid transitions.
                  </p>
                </div>
              </div>

              <div className="space-y-6 lg:pt-28">
                <div className="surface overflow-hidden p-0">
                  <img
                    alt="Stellar CRM poster concept"
                    className="h-full min-h-[34rem] w-full object-cover"
                    src="/assets/project-stellar.png"
                  />
                </div>
                <div className="space-y-3">
                  <p className="label">SaaS • Enterprise</p>
                  <h3 className="text-[clamp(2rem,3vw,2.75rem)] font-semibold tracking-[-0.045em]">
                    Stellar CRM
                  </h3>
                  <p className="max-w-[30rem] text-[1.02rem] leading-8 text-white/56">
                    A monolithic data environment for global enterprises, utilizing predictive AI
                    to map relationship clusters in real-time.
                  </p>
                </div>
              </div>
            </div>

            <div className="surface overflow-hidden">
              <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
                <div className="space-y-8 p-8 md:p-10 lg:p-12">
                  <div className="space-y-4">
                    <p className="label">Experimental • Lab</p>
                    <h3 className="max-w-[20rem] text-[clamp(2.6rem,4vw,4.2rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
                      Quantum Identity Protocols
                    </h3>
                    <p className="max-w-[30rem] text-[1.08rem] leading-9 text-white/56">
                      An exploration into biometrically secured blockchain identities, using
                      generative art to represent encrypted user keys.
                    </p>
                  </div>

                  <Button
                    className="min-w-[10rem]"
                    onClick={() => navigateTo("contact")}
                  >
                    Read Insight
                  </Button>
                </div>

                <div className="px-8 pb-8 lg:px-0 lg:pb-0 lg:pr-8">
                  <img
                    alt="Quantum identity portrait concept"
                    className="h-full min-h-[22rem] w-full rounded-[26px] object-cover"
                    src="/assets/project-portrait.png"
                  />
                </div>
              </div>
            </div>

            <div className="surface panel-glow rounded-[32px] bg-[#171616]/92 px-6 py-14 text-center md:px-12 md:py-20">
              <h3 className="text-[clamp(2.4rem,4.8vw,4.25rem)] font-semibold tracking-[-0.055em]">
                Ready to start your next commission?
              </h3>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  className="min-w-[12.5rem]"
                  onClick={() => navigateTo("contact")}
                  size="lg"
                >
                  Start a Project
                </Button>
                <Button
                  className="min-w-[12.5rem]"
                  onClick={() => navigateTo("projects")}
                  size="lg"
                  variant="outline"
                >
                  View All Work
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section
          className="relative border-t border-white/[0.04] py-24 md:py-28 lg:py-32"
          data-section
          id="process"
        >
          <Container className="space-y-16 md:space-y-20">
            <div className="grid gap-10 lg:grid-cols-[1.5fr_0.85fr] lg:items-start">
              <div>
                <p className="label">Execution Excellence</p>
                <h2 className="mt-5 text-[clamp(3rem,7vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.07em]">
                  The Art of the Build.
                </h2>
              </div>
              <p className="max-w-[25rem] pt-2 text-lg leading-9 text-white/58">
                We transform complex challenges into elegant digital realities through a rigorous,
                high-fidelity methodology designed for scale and stability.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {PROCESS_STEPS.map((step) => (
                <ProcessCard
                  description={step.description}
                  icon={step.icon}
                  key={step.number}
                  number={step.number}
                  title={step.title}
                >
                  {step.bullets}
                </ProcessCard>
              ))}
            </div>

            <div className="surface overflow-hidden">
              <div className="grid gap-8 lg:grid-cols-[1.02fr_1fr] lg:items-center">
                <div className="p-8 md:p-10">
                  <img
                    alt="Minimal desk workspace"
                    className="h-full w-full rounded-[28px] object-cover"
                    src="/assets/process-desk.png"
                  />
                </div>
                <div className="space-y-8 p-8 pt-0 md:p-10 md:pt-0">
                  <div className="space-y-4">
                    <h3 className="text-[clamp(2.4rem,4vw,3.6rem)] font-semibold tracking-[-0.05em]">
                      Engineered for Permanence
                    </h3>
                    <p className="max-w-[34rem] text-[1.06rem] leading-9 text-white/58">
                      Our philosophy is built on the belief that software shouldn&apos;t just work; it
                      should endure. We prioritize structural integrity over temporary trends,
                      delivering products that provide measurable value from day one and scale
                      effortlessly into the future.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Metric
                      label="Uptime Architecture"
                      value="99.9%"
                    />
                    <Metric
                      label="Efficiency Gain"
                      value="40%"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="surface panel-glow rounded-[32px] bg-[radial-gradient(circle_at_50%_10%,rgba(167,160,255,0.1),transparent_28%),linear-gradient(180deg,#060607_0%,#0a0a0c_100%)] px-6 py-16 text-center md:px-12 md:py-24"
              id="contact"
            >
              <h3 className="mx-auto max-w-[14ch] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
                Ready to build the future?
              </h3>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  className="min-w-[11.5rem]"
                  onClick={() => setMenuOpen(true)}
                  size="lg"
                >
                  Inquire Now
                </Button>
                <Button
                  className="min-w-[11.5rem]"
                  onClick={() => navigateTo("projects")}
                  size="lg"
                  variant="outline"
                >
                  View Projects
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-white/[0.04] py-8 text-sm text-white/52">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              className="font-mono text-[1.65rem] font-semibold tracking-[0.2em] text-white"
              onClick={() => navigateTo("hero")}
              type="button"
            >
              I01
            </button>
            <span className="hidden text-white/36 sm:inline">Software</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <button
                className="transition-colors hover:text-white"
                key={item}
                onClick={() => navigateTo("contact")}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <p className="text-white/40">© 2024 I01 Software. All rights reserved.</p>
        </Container>
      </footer>

      <MobileMenu
        activeSection={activeSection}
        onClose={() => setMenuOpen(false)}
        onNavigate={(id) => {
          setMenuOpen(false);
          navigateTo(id);
        }}
        open={menuOpen}
      />
    </div>
  );
}

type HeaderProps = {
  heroMode: boolean;
  activeSection: SectionId;
  desktopNavItems: typeof NAV_ITEMS;
  onNavigate: (id: SectionId | "hero") => void;
  onMenuOpen: () => void;
};

function SiteHeader({
  heroMode,
  activeSection,
  desktopNavItems,
  onNavigate,
  onMenuOpen,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        heroMode ? "bg-transparent" : "border-b border-white/[0.04] bg-black/72 backdrop-blur-xl",
      )}
    >
      <Container className="py-4">
        {heroMode ? (
          <div className="grid grid-cols-3 items-center">
            <button
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
              onClick={onMenuOpen}
              type="button"
            >
              <Menu className="h-6 w-6" />
            </button>

            <button
              className="justify-self-center font-mono text-[1.65rem] font-semibold tracking-[0.25em] text-white"
              onClick={() => onNavigate("hero")}
              type="button"
            >
              I01
            </button>

            <Button
              className="h-10 justify-self-end px-4 text-sm normal-case tracking-normal sm:px-5"
              onClick={() => onNavigate("contact")}
            >
              Schedule a Call
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <button
              className="font-mono text-[1.45rem] font-semibold tracking-[0.18em] text-white"
              onClick={() => onNavigate("hero")}
              type="button"
            >
              I01
            </button>

            <nav className="hidden items-center gap-10 md:flex">
              {desktopNavItems.map((item) => (
                <button
                  className={cn(
                    "text-sm transition-colors",
                    activeSection === item.id ? "text-primary" : "text-white/56 hover:text-white",
                  )}
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
              onClick={onMenuOpen}
              type="button"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        )}
      </Container>
    </header>
  );
}

type MobileMenuProps = {
  open: boolean;
  activeSection: SectionId;
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
};

function MobileMenu({ open, activeSection, onClose, onNavigate }: MobileMenuProps) {
  return (
    <Sheet
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      open={open}
    >
      <SheetContent className="subtle-grid flex h-full flex-col" side="right">
        <SheetHeader className="sr-only">
          <SheetTitle>Site navigation</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-10 pb-10 pt-20">
          <div className="space-y-8">
            {NAV_ITEMS.map((item) => (
              <button
                className="flex items-start gap-7 text-left"
                key={item.id}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                <span className="pt-2 font-mono text-sm text-white/45">{item.index}</span>
                <span
                  className={cn(
                    "text-[clamp(2rem,5vw,3.3rem)] font-semibold tracking-[-0.05em] transition-colors",
                    activeSection === item.id ? "text-primary" : "text-white hover:text-white/78",
                  )}
                >
                  {item.menuLabel ?? item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-auto border-t border-white/[0.08] pt-10">
            <SheetClose asChild>
              <Button
                className="w-full"
                onClick={() => onNavigate("contact")}
                size="lg"
              >
                Start a Project
              </Button>
            </SheetClose>

            <div className="mt-10 flex items-center gap-8 text-xs uppercase tracking-[0.26em] text-white/42">
              {["Twitter", "LinkedIn", "Behance"].map((social) => (
                <span key={social}>{social}</span>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("section-frame", className)}
      {...props}
    />
  );
}

function IconBadge({ icon: Icon }: { icon: ElementType }) {
  return (
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-inset ring-primary/10">
      <Icon className="h-5 w-5" />
    </div>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-black/20 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/72 ring-1 ring-inset ring-white/[0.04]">
      {children}
    </span>
  );
}

function BulletItem({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 text-[1.01rem] text-white/58">
      <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
      <span>{children}</span>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      className="inline-flex items-center gap-3 text-base font-semibold text-primary transition-colors hover:text-white"
      onClick={onClick}
      type="button"
    >
      {children}
      <ArrowRight className="h-4.5 w-4.5" />
    </button>
  );
}

function ProcessCard({
  icon: Icon,
  number,
  title,
  description,
  children,
}: {
  icon: ElementType;
  number: string;
  title: string;
  description: string;
  children: string[];
}) {
  return (
    <div className="surface relative min-h-[27rem] overflow-hidden p-8 md:p-9">
      <span className="pointer-events-none absolute right-6 top-4 text-[clamp(5rem,8vw,6.7rem)] font-semibold leading-none tracking-[-0.08em] text-white/[0.08]">
        {number}
      </span>

      <div className="relative flex h-full flex-col">
        <IconBadge icon={Icon} />
        <div className="mt-8 space-y-4">
          <h3 className="text-[2.2rem] font-semibold tracking-[-0.045em]">{title}</h3>
          <p className="text-[1.02rem] leading-8 text-white/56">{description}</p>
        </div>

        <div className="mt-auto space-y-4 border-t border-white/[0.06] pt-7">
          {children.map((item, index) => (
            <div
              className={cn(
                "flex items-center gap-3 text-[1.02rem]",
                index === 0 ? "text-primary" : "text-white/58",
              )}
              key={item}
            >
              <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-2">
      <div className="text-[clamp(2.8rem,5vw,4.4rem)] font-semibold leading-none tracking-[-0.06em] text-primary">
        {value}
      </div>
      <div className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-white/45">
        {label}
      </div>
    </div>
  );
}

export default App;

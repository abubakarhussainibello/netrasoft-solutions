import Eyebrow from "./Eyebrow";
import { Reveal } from "./motion";
import {
  AwsLogo,
  DockerLogo,
  FigmaLogo,
  FlutterLogo,
  GitLogo,
  GoLogo,
  GraphqlLogo,
  KubernetesLogo,
  LaravelLogo,
  MongoLogo,
  NextLogo,
  NodeLogo,
  PostgresLogo,
  PythonLogo,
  ReactLogo,
  RedisLogo,
  TailwindLogo,
  TsLogo,
} from "./tech-icons";

/* Eighteen tiles — three clean rows of six on desktop */
const tools = [
  { Icon: ReactLogo, label: "React" },
  { Icon: NextLogo, label: "Next.js" },
  { Icon: TsLogo, label: "TypeScript" },
  { Icon: NodeLogo, label: "Node" },
  { Icon: PythonLogo, label: "Python" },
  { Icon: GoLogo, label: "Go" },
  { Icon: LaravelLogo, label: "Laravel" },
  { Icon: FlutterLogo, label: "Flutter" },
  { Icon: TailwindLogo, label: "Tailwind" },
  { Icon: GraphqlLogo, label: "GraphQL" },
  { Icon: PostgresLogo, label: "Postgres" },
  { Icon: MongoLogo, label: "MongoDB" },
  { Icon: RedisLogo, label: "Redis" },
  { Icon: DockerLogo, label: "Docker" },
  { Icon: KubernetesLogo, label: "Kubernetes" },
  { Icon: AwsLogo, label: "AWS" },
  { Icon: GitLogo, label: "Git / CI" },
  { Icon: FigmaLogo, label: "Figma" },
];

export default function Tools() {
  return (
    <section className="relative border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>The stack</Eyebrow>
            <h2 className="display mt-6 text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
              Boring technology,
              <br /> chosen <em>on purpose</em>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-[#5c5c5e]">
              Mature tools with big hiring pools, so the next engineer who opens
              your repository already knows their way around it.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {tools.map(({ Icon, label }, i) => (
            <Reveal key={label} delay={i * 40} variant="scale-in">
              <div className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-white transition-colors duration-300 hover:bg-[#fdfaf8]">
                <Icon className="h-8 w-8 opacity-70 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:opacity-100" />
                <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted-dim transition-colors duration-300 group-hover:text-[#57575a]">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

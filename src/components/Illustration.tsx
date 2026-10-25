export type ArtName = "website" | "wordpress" | "domain" | "hosting" | "seo" | "redesign" | "extension" | "dollar";

const C = {
  s50: "#f0f9ff", s100: "#e0f2fe", s200: "#bae6fd", s300: "#7dd3fc", s400: "#38bdf8",
  s500: "#0ea5e9", s600: "#0284c7", s700: "#0369a1", navy: "#0c4a6e", ink: "#0b1b33", g: "#cbd5e1", g2: "#e2e8f0", g3: "#f1f5f9",
};

const Win = ({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children?: React.ReactNode }) => (
  <g filter="url(#sh)">
    <rect x={x} y={y} width={w} height={h} rx="14" fill="#fff" />
    <path d={`M${x} ${y + 26}V${y + 14}a14 14 0 0 1 14-14h${w - 28}a14 14 0 0 1 14 14V${y + 26}Z`} fill={C.s100} />
    <circle cx={x + 16} cy={y + 13} r="4" fill={C.s300} />
    <circle cx={x + 30} cy={y + 13} r="4" fill={C.s200} />
    <circle cx={x + 44} cy={y + 13} r="4" fill="#fff" />
    {children}
  </g>
);

const Check = ({ x, y, r = 10, fill = C.s600 }: { x: number; y: number; r?: number; fill?: string }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={fill} />
    <path d={`M${x - r * 0.45} ${y} l${r * 0.3} ${r * 0.32} l${r * 0.6} ${-r * 0.65}`} fill="none" stroke="#fff" strokeWidth={r * 0.22} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

const Star = ({ x, y, s = 10, fill = "#fff" }: { x: number; y: number; s?: number; fill?: string }) => (
  <path d={`M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`} fill={fill} />
);

const Lines = ({ x, y, w, n = 3, gap = 12, fill = C.g2 }: { x: number; y: number; w: number; n?: number; gap?: number; fill?: string }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => (
      <rect key={i} x={x} y={y + i * gap} width={i === n - 1 ? w * 0.6 : w} height="6" rx="3" fill={fill} />
    ))}
  </g>
);

function Scene({ name }: { name: ArtName }) {
  switch (name) {
    case "website":
      return (
        <g>
          <Win x={36} y={48} w={310} h={232}>
            <rect x={52} y={86} width={40} height={8} rx="4" fill={C.s600} />
            <rect x={240} y={86} width={22} height={6} rx="3" fill={C.g2} />
            <rect x={270} y={86} width={22} height={6} rx="3" fill={C.g2} />
            <rect x={300} y={86} width={30} height={10} rx="5" fill={C.s500} />
            <rect x={52} y={108} width={278} height={84} rx="10" fill="url(#hero)" />
            <rect x={70} y={126} width={130} height={11} rx="5" fill="#fff" />
            <rect x={70} y={146} width={170} height={6} rx="3" fill="#fff" opacity=".7" />
            <rect x={70} y={160} width={60} height={18} rx="9" fill="#fff" />
            <circle cx={292} cy={150} r={26} fill="#fff" opacity=".25" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={52 + i * 96} y={206} width={86} height={58} rx="10" fill={C.s50} stroke={C.s200} />
                <circle cx={68 + i * 96} cy={224} r="8" fill={C.s300} />
                <Lines x={62 + i * 96} y={240} w={64} n={2} gap={10} fill={C.s200} />
              </g>
            ))}
          </Win>
          <g filter="url(#sh)">
            <rect x={338} y={96} width={108} height={206} rx="20" fill={C.navy} />
            <rect x={346} y={110} width={92} height={178} rx="12" fill="#fff" />
            <rect x={380} y={102} width={24} height={4} rx="2" fill={C.s700} />
            <rect x={354} y={120} width={76} height={54} rx="8" fill="url(#hero)" />
            <rect x={362} y={132} width={44} height={7} rx="3" fill="#fff" />
            <rect x={362} y={146} width={58} height={5} rx="2.5" fill="#fff" opacity=".7" />
            <rect x={354} y={184} width={76} height={34} rx="8" fill={C.s50} stroke={C.s200} />
            <rect x={354} y={226} width={76} height={34} rx="8" fill={C.s50} stroke={C.s200} />
            <rect x={362} y={268} width={60} height={12} rx="6" fill={C.s500} />
          </g>
          <path d="M296 238l0 38 10-9 7 15 7-3-7-15 13-1Z" fill={C.ink} stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
          <Star x={60} y={34} s={9} fill={C.s400} />
          <Star x={452} y={64} s={12} fill="#fff" />
        </g>
      );
    case "wordpress":
      return (
        <g>
          <clipPath id="wpclip"><rect x={30} y={42} width={350} height={240} rx="14" /></clipPath>
          <g filter="url(#sh)"><rect x={30} y={42} width={350} height={240} rx="14" fill="#fff" /></g>
          <g clipPath="url(#wpclip)">
            <rect x={30} y={42} width={350} height={28} fill={C.s100} />
            <circle cx={46} cy={56} r="4" fill={C.s300} /><circle cx={60} cy={56} r="4" fill={C.s200} /><circle cx={74} cy={56} r="4" fill="#fff" />
            <rect x={30} y={70} width={74} height={212} fill={C.navy} />
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                <rect x={42} y={86 + i * 30} width={12} height={12} rx="3" fill={i === 1 ? C.s400 : C.s700} />
                <rect x={62} y={90 + i * 30} width={30} height={5} rx="2.5" fill={i === 1 ? "#fff" : C.s300} opacity={i === 1 ? 1 : 0.6} />
              </g>
            ))}
            <rect x={120} y={84} width={90} height={12} rx="6" fill={C.ink} />
            <rect x={300} y={80} width={62} height={20} rx="10" fill={C.s600} />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={120 + i * 86} y={116} width={76} height={148} rx="12" fill={C.s50} stroke={C.s200} />
                <rect x={128 + i * 86} y={124} width={60} height={64} rx="8" fill={[C.s300, C.s400, C.s500][i]} />
                <circle cx={158 + i * 86} cy={152} r="14" fill="#fff" opacity=".5" />
                <rect x={128 + i * 86} y={198} width={50} height={7} rx="3.5" fill={C.ink} opacity=".8" />
                <rect x={128 + i * 86} y={212} width={34} height={6} rx="3" fill={C.g} />
                <rect x={128 + i * 86} y={232} width={44} height={18} rx="9" fill={C.s600} />
                <rect x={138 + i * 86} y={239} width={24} height={4} rx="2" fill="#fff" />
              </g>
            ))}
          </g>
          <g filter="url(#sh)">
            <circle cx={416} cy={126} r="42" fill="#fff" />
            <path d="M398 112h8l7 26h20l6-18h-30" fill="none" stroke={C.s600} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={417} cy={150} r="4.5" fill={C.s600} /><circle cx={436} cy={150} r="4.5" fill={C.s600} />
            <circle cx={440} cy={96} r="13" fill={C.s500} />
            <text x={440} y={101} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">3</text>
          </g>
          <g filter="url(#sh)">
            <rect x={366} y={214} width={96} height={46} rx="14" fill="#fff" />
            <Check x={390} y={237} r={11} />
            <rect x={410} y={228} width={40} height={6} rx="3" fill={C.ink} opacity=".8" />
            <rect x={410} y={240} width={28} height={5} rx="2.5" fill={C.g} />
          </g>
        </g>
      );
    case "domain":
      return (
        <g>
          <g filter="url(#sh)">
            <rect x={40} y={104} width={400} height={70} rx="35" fill="#fff" />
            <circle cx={78} cy={139} r="13" fill="none" stroke={C.s400} strokeWidth="4" />
            <path d="M88 149l9 9" stroke={C.s400} strokeWidth="4" strokeLinecap="round" />
            <text x={112} y={148} fontSize="26" fontWeight="600" fill={C.ink} fontFamily="Arial, sans-serif">yourbrand.com</text>
            <rect x={338} y={116} width={90} height={46} rx="23" fill={C.s600} />
            <text x={383} y={146} textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">Search</text>
          </g>
          <g filter="url(#sh)">
            <rect x={40} y={198} width={230} height={52} rx="16" fill="#fff" />
            <Check x={68} y={224} r={13} fill={C.s500} />
            <text x={92} y={222} fontSize="16" fontWeight="700" fill={C.ink} fontFamily="Arial, sans-serif">yourbrand.com</text>
            <text x={92} y={240} fontSize="12" fill={C.s700} fontFamily="Arial, sans-serif">Looks available</text>
          </g>
          {[".net", ".co", ".store"].map((t, i) => (
            <g key={t}>
              <rect x={286 + i * 52} y={208} width={46} height={32} rx="16" fill={C.s100} stroke={C.s300} />
              <text x={309 + i * 52} y={229} textAnchor="middle" fontSize="13" fontWeight="600" fill={C.s700} fontFamily="Arial, sans-serif">{t}</text>
            </g>
          ))}
          <g>
            <circle cx={410} cy={56} r="34" fill={C.s500} />
            <ellipse cx={410} cy={56} rx="15" ry="34" fill="none" stroke="#fff" strokeWidth="2.5" opacity=".8" />
            <path d="M376 56h68M382 40h56M382 72h56" stroke="#fff" strokeWidth="2.5" opacity=".8" fill="none" />
          </g>
          <Star x={60} y={64} s={11} fill={C.s400} />
          <Star x={250} y={300} s={9} fill="#fff" />
        </g>
      );
    case "hosting":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} filter="url(#sh)">
              <rect x={52} y={110 + i * 62} width={230} height={50} rx="12" fill="#fff" />
              <circle cx={78} cy={135 + i * 62} r="6" fill={C.s400} />
              <circle cx={98} cy={135 + i * 62} r="6" fill={i === 1 ? C.s300 : C.s400} />
              <rect x={124} y={129 + i * 62} width={90} height={6} rx="3" fill={C.g2} />
              <rect x={124} y={141 + i * 62} width={60} height={5} rx="2.5" fill={C.g2} />
              <rect x={236} y={126 + i * 62} width={32} height={18} rx="9" fill={C.s600} />
              <circle cx={259} cy={135 + i * 62} r="6" fill="#fff" />
            </g>
          ))}
          <path d="M290 135C330 135 330 96 352 96M290 197C340 197 340 96 352 96M290 259C350 259 350 96 352 96" fill="none" stroke={C.s400} strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
          <g filter="url(#sh)">
            <circle cx={384} cy={90} r="30" fill="#fff" /><circle cx={420} cy={98} r="24" fill="#fff" />
            <circle cx={350} cy={100} r="22" fill="#fff" /><rect x={350} y={90} width={74} height={32} rx="16" fill="#fff" />
          </g>
          <path d="M372 100l-9 0M384 92l0 16M395 100l9 0" stroke="none" />
          <text x={388} y={108} textAnchor="middle" fontSize="20" fontWeight="700" fill={C.s600} fontFamily="Arial, sans-serif">www</text>
          <g filter="url(#sh)">
            <path d="M404 176l44 14v34c0 24-20 40-44 48-24-8-44-24-44-48v-34Z" fill="url(#hero)" />
          </g>
          <Check x={404} y={226} r={20} fill="#fff" />
          <path d="M395 227l7 8 13-15" fill="none" stroke={C.s600} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <Star x={70} y={70} s={10} fill={C.s400} />
          <Star x={456} y={160} s={8} fill="#fff" />
        </g>
      );
    case "seo":
      return (
        <g>
          <Win x={36} y={44} w={270} h={226}>
            <rect x={52} y={80} width={238} height={30} rx="15" fill={C.s50} stroke={C.s200} />
            <circle cx={70} cy={95} r="6" fill="none" stroke={C.s500} strokeWidth="2.5" />
            <path d="M75 100l5 5" stroke={C.s500} strokeWidth="2.5" strokeLinecap="round" />
            <rect x={90} y={92} width={90} height={6} rx="3" fill={C.g} />
            <rect x={48} y={122} width={246} height={62} rx="10" fill={C.s100} />
            <rect x={60} y={132} width={110} height={9} rx="4.5" fill={C.s700} />
            <rect x={60} y={148} width={70} height={5} rx="2.5" fill={C.s400} />
            <Lines x={60} y={160} w={200} n={2} gap={10} fill={C.s200} />
            <circle cx={270} cy={140} r="14" fill={C.s600} />
            <text x={270} y={145} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">#1</text>
            <rect x={60} y={198} width={90} height={8} rx="4" fill={C.g} />
            <Lines x={60} y={212} w={200} n={2} gap={10} />
          </Win>
          <g filter="url(#sh)">
            <rect x={326} y={84} width={118} height={186} rx="16" fill="#fff" />
            {[40, 74, 104, 148].map((h, i) => (
              <rect key={i} x={342 + i * 26} y={250 - h} width={18} height={h} rx="5" fill={i === 3 ? "url(#hero)" : C.s200} />
            ))}
            <path d="M344 226l26-22 26 8 32-60" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M414 148l14-1-3 14" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g>
            <circle cx={96} cy={248} r="40" fill="#fff" fillOpacity=".55" stroke={C.s600} strokeWidth="10" />
            <path d="M126 278l38 38" stroke={C.s600} strokeWidth="12" strokeLinecap="round" />
          </g>
          <Star x={320} y={50} s={10} fill={C.s400} />
        </g>
      );
    case "redesign":
      return (
        <g>
          <g>
            <rect x={36} y={70} width={176} height={210} rx="14" fill={C.g3} stroke={C.g} />
            <rect x={36} y={70} width={176} height={24} rx="14" fill={C.g2} />
            <rect x={36} y={82} width={176} height={12} fill={C.g2} />
            <rect x={50} y={108} width={148} height={54} rx="4" fill={C.g} />
            <rect x={50} y={172} width={70} height={30} fill={C.g2} /><rect x={128} y={172} width={70} height={30} fill={C.g2} />
            <rect x={50} y={210} width={148} height={8} fill={C.g} /><rect x={50} y={226} width={110} height={8} fill={C.g2} />
            <rect x={50} y={244} width={50} height={20} fill={C.g} />
            <rect x={44} y={46} width={62} height={22} rx="11" fill={C.g} />
            <text x={75} y={61} textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748b" fontFamily="Arial, sans-serif">Before</text>
          </g>
          <g filter="url(#sh)">
            <rect x={268} y={70} width={176} height={210} rx="14" fill="#fff" />
            <path d="M268 96V84a14 14 0 0 1 14-14h148a14 14 0 0 1 14 14V96Z" fill={C.s100} />
            <circle cx={284} cy={83} r="4" fill={C.s300} /><circle cx={298} cy={83} r="4" fill={C.s200} />
            <rect x={282} y={108} width={148} height={62} rx="10" fill="url(#hero)" />
            <rect x={294} y={120} width={70} height={9} rx="4.5" fill="#fff" />
            <rect x={294} y={136} width={96} height={5} rx="2.5" fill="#fff" opacity=".7" />
            <rect x={294} y={148} width={40} height={14} rx="7" fill="#fff" />
            {[0, 1].map((i) => (
              <g key={i}>
                <rect x={282 + i * 78} y={182} width={70} height={46} rx="9" fill={C.s50} stroke={C.s200} />
                <circle cx={296 + i * 78} cy={198} r="6" fill={C.s300} />
                <Lines x={290 + i * 78} y={212} w={50} n={2} gap={9} fill={C.s200} />
              </g>
            ))}
            <rect x={282} y={240} width={80} height={24} rx="12" fill={C.s600} />
            <rect x={276} y={46} width={62} height={22} rx="11" fill={C.s600} />
            <text x={307} y={61} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">After</text>
          </g>
          <g filter="url(#sh)">
            <circle cx={240} cy={176} r="24" fill={C.s600} />
            <path d="M229 176h22m-8-9l9 9-9 9" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <Star x={448} y={58} s={12} fill="#fff" />
          <Star x={30} y={300} s={9} fill={C.s400} />
        </g>
      );
    case "extension":
      return (
        <g>
          <Win x={30} y={44} w={420} h={236}>
            <rect x={44} y={76} width={296} height={22} rx="11" fill={C.s50} stroke={C.s200} />
            <rect x={58} y={84} width={100} height={6} rx="3" fill={C.g} />
            <rect x={354} y={74} width={26} height={26} rx="8" fill={C.s600} />
            <rect x={361} y={85} width={12} height={10} rx="2" fill="#fff" />
            <circle cx={367} cy={84} r="3.5" fill="#fff" /><circle cx={374} cy={90} r="3" fill="#fff" />
            <circle cx={398} cy={87} r="10" fill={C.s200} /><circle cx={426} cy={87} r="10" fill={C.s100} />
            <rect x={44} y={116} width={170} height={70} rx="10" fill={C.s100} />
            <Lines x={44} y={202} w={190} n={3} gap={14} />
            <Lines x={44} y={248} w={150} n={1} gap={14} />
          </Win>
          <g filter="url(#sh)">
            <path d="M366 108l-8 12h16Z" fill="#fff" />
            <rect x={278} y={118} width={162} height={142} rx="16" fill="#fff" />
            <rect x={278} y={118} width={162} height={38} rx="16" fill="url(#hero)" />
            <rect x={278} y={140} width={162} height={16} fill="url(#hero)" />
            <rect x={292} y={128} width={20} height={20} rx="6" fill="#fff" />
            <rect x={322} y={133} width={70} height={8} rx="4" fill="#fff" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={292} y={170 + i * 28} width={68} height={7} rx="3.5" fill={C.ink} opacity=".75" />
                <rect x={292} y={182 + i * 28} width={46} height={5} rx="2.5" fill={C.g} />
                <rect x={390} y={171 + i * 28} width={36} height={18} rx="9" fill={i === 2 ? C.g : C.s500} />
                <circle cx={i === 2 ? 399 : 417} cy={180 + i * 28} r="7" fill="#fff" />
              </g>
            ))}
          </g>
          <Star x={456} y={36} s={11} fill={C.s400} />
          <Star x={24} y={300} s={10} fill="#fff" />
        </g>
      );
    case "dollar":
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={64} y={236 - i * 20} width={132} height={18} fill={C.s600} />
              <ellipse cx={130} cy={254 - i * 20} rx="66" ry="18" fill={C.s600} />
              <ellipse cx={130} cy={236 - i * 20} rx="66" ry="18" fill={i === 3 ? C.s300 : C.s500} stroke={C.s700} strokeWidth="2" />
            </g>
          ))}
          <text x={130} y={166} textAnchor="middle" fontSize="30" fontWeight="800" fill={C.s700} fontFamily="Arial, sans-serif">$</text>
          <g filter="url(#sh)">
            <circle cx={366} cy={170} r="62" fill="#fff" />
            <circle cx={366} cy={170} r="50" fill="none" stroke={C.s400} strokeWidth="4" />
            <text x={366} y={188} textAnchor="middle" fontSize="48" fontWeight="800" fill={C.s600} fontFamily="Arial, sans-serif">Tk</text>
          </g>
          <g fill="none" stroke={C.s600} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M214 124h44m-14-14l14 14-14 14" />
            <path d="M262 214h-44m14-14l-14 14 14 14" />
          </g>
          <g filter="url(#sh)">
            <rect x={188} y={268} width={150} height={42} rx="21" fill="#fff" />
            <circle cx={214} cy={289} r="7" fill={C.s500} />
            <text x={232} y={294} textAnchor="start" fontSize="13" fontWeight="700" fill={C.ink} fontFamily="Arial, sans-serif">bKash · Nagad</text>
          </g>
          <circle cx={420} cy={60} r="16" fill={C.s400} stroke="#fff" strokeWidth="3" />
          <text x={420} y={67} textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">$</text>
          <Star x={60} y={64} s={11} fill="#fff" />
          <Star x={300} y={50} s={9} fill={C.s400} />
        </g>
      );
  }
}

export default function Illustration({ name, className }: { name: ArtName; className?: string }) {
  return (
    <svg viewBox="0 0 480 340" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.s50} />
          <stop offset="1" stopColor={C.s200} />
        </linearGradient>
        <linearGradient id="hero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.s400} />
          <stop offset="1" stopColor={C.s600} />
        </linearGradient>
        <filter id="sh" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#0369a1" floodOpacity=".2" />
        </filter>
      </defs>
      <rect width="480" height="340" fill="url(#bg)" />
      <circle cx="420" cy="40" r="96" fill="#fff" opacity=".45" />
      <circle cx="50" cy="310" r="80" fill="#fff" opacity=".35" />
      <Scene name={name} />
    </svg>
  );
}

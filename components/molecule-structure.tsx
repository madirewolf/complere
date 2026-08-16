"use client";

interface MoleculeStructureProps {
  slug: string;
  className?: string;
}

/**
 * Skeletal-formula SVGs for each product. Hand-tuned coordinates, line-drawn,
 * inherits color from `currentColor`.
 */
export function MoleculeStructure({
  slug,
  className,
}: MoleculeStructureProps) {
  const props = { className };
  switch (slug) {
    case "creatine-monohydrate":
      return <Creatine {...props} />;
    case "l-theanine":
      return <Theanine {...props} />;
    case "omega-3":
      return <EPA {...props} />;
    case "vitamin-d3-k2":
      return <Cholecalciferol {...props} />;
    case "magnesium-glycinate":
      return <MagnesiumBisglycinate {...props} />;
    case "methylated-b-complex":
      return <Methylfolate {...props} />;
    default:
      return null;
  }
}

export function molecularFormula(slug: string): string {
  switch (slug) {
    case "creatine-monohydrate":
      return "C₄H₉N₃O₂";
    case "l-theanine":
      return "C₇H₁₄N₂O₃";
    case "omega-3":
      return "C₂₀H₃₀O₂ · C₂₂H₃₂O₂";
    case "vitamin-d3-k2":
      return "C₂₇H₄₄O · C₄₆H₆₄O₂";
    case "magnesium-glycinate":
      return "C₄H₈MgN₂O₄";
    case "methylated-b-complex":
      return "C₂₀H₂₅N₇O₆";
    default:
      return "";
  }
}

interface SvgProps {
  className?: string;
}

const STROKE = 1.6;

function L({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} />;
}

function A({
  x,
  y,
  label,
  size = 10,
  anchor = "middle",
}: {
  x: number;
  y: number;
  label: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fontFamily="ui-monospace, SFMono-Regular, monospace"
      fontSize={size}
      fill="currentColor"
      stroke="none"
      textAnchor={anchor}
      dominantBaseline="middle"
    >
      {label}
    </text>
  );
}

const SUB_2 = "₂";
const SUB_3 = "₃";

/* ----- 1. Creatine: H2N-C(=NH)-N(CH3)-CH2-COOH ----- */
function Creatine({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 130"
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <A x={20} y={42} label={`H${SUB_2}N`} anchor="end" />
      <L x1={26} y1={42} x2={48} y2={54} />
      <L x1={48} y1={54} x2={64} y2={28} />
      <L x1={52} y1={56} x2={68} y2={30} />
      <A x={73} y={22} label="HN" anchor="start" />
      <L x1={49} y1={57} x2={80} y2={70} />
      <A x={84} y={72} label="N" anchor="start" />
      <L x1={89} y1={78} x2={74} y2={102} />
      <A x={64} y={108} label={`CH${SUB_3}`} anchor="end" />
      <L x1={94} y1={70} x2={114} y2={56} />
      <L x1={114} y1={56} x2={138} y2={68} />
      <L x1={138} y1={66} x2={152} y2={42} />
      <L x1={142} y1={68} x2={156} y2={44} />
      <A x={156} y={36} label="O" anchor="start" />
      <L x1={140} y1={70} x2={162} y2={82} />
      <A x={170} y={84} label="OH" anchor="start" />
    </svg>
  );
}

/* ----- 2. L-Theanine: gamma-glutamyl ethylamide ----- */
function Theanine({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 230 120"
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <A x={10} y={84} label="HO" anchor="end" />
      <L x1={16} y1={82} x2={36} y2={70} />
      <L x1={36} y1={70} x2={36} y2={94} />
      <L x1={40} y1={74} x2={40} y2={92} />
      <A x={36} y={106} label="O" />
      <L x1={36} y1={70} x2={56} y2={56} />
      <L x1={56} y1={56} x2={56} y2={32} />
      <A x={56} y={22} label={`NH${SUB_2}`} />
      <L x1={56} y1={56} x2={80} y2={68} />
      <L x1={80} y1={68} x2={102} y2={54} />
      <L x1={102} y1={54} x2={124} y2={68} />
      <L x1={124} y1={68} x2={124} y2={44} />
      <L x1={128} y1={66} x2={128} y2={46} />
      <A x={124} y={34} label="O" />
      <L x1={124} y1={68} x2={146} y2={56} />
      <A x={150} y={58} label="N" anchor="start" />
      <A x={150} y={70} label="H" anchor="start" size={8} />
      <L x1={158} y1={58} x2={178} y2={70} />
      <L x1={178} y1={70} x2={198} y2={58} />
      <A x={224} y={58} label={`CH${SUB_3}`} anchor="end" />
    </svg>
  );
}

/* ----- 3. EPA - Eicosapentaenoic acid: 20-C, 5 cis double bonds ----- */
function EPA({ className }: SvgProps) {
  const startX = 14;
  const stepX = 9.6;
  const baseY = 60;
  const amp = 8;
  const points = Array.from({ length: 20 }, (_, i) => ({
    x: startX + i * stepX,
    y: baseY + (i % 2 === 0 ? -amp : amp),
  }));
  const doubleBonds = new Set([5, 8, 11, 14, 17]);

  return (
    <svg
      viewBox="0 0 220 120"
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <A x={4} y={baseY - amp} label="HO" anchor="end" />
      <L x1={points[0].x - 2} y1={points[0].y - 2} x2={points[0].x - 8} y2={points[0].y - 18} />
      <L x1={points[0].x + 2} y1={points[0].y - 4} x2={points[0].x - 4} y2={points[0].y - 20} />
      <A x={points[0].x - 8} y={points[0].y - 28} label="O" />

      {points.slice(0, -1).map((p, i) => {
        const next = points[i + 1];
        const bondNum = i + 1;
        const isDouble = doubleBonds.has(bondNum);
        return (
          <g key={i}>
            <L x1={p.x} y1={p.y} x2={next.x} y2={next.y} />
            {isDouble &&
              (() => {
                const dx = next.x - p.x;
                const dy = next.y - p.y;
                const len = Math.hypot(dx, dy);
                const ox = (-dy / len) * 3.2;
                const oy = (dx / len) * 3.2;
                const t1 = 0.18;
                const t2 = 0.82;
                return (
                  <L
                    x1={p.x + dx * t1 + ox}
                    y1={p.y + dy * t1 + oy}
                    x2={p.x + dx * t2 + ox}
                    y2={p.y + dy * t2 + oy}
                  />
                );
              })()}
          </g>
        );
      })}
    </svg>
  );
}

/* ----- 4. Cholecalciferol (Vitamin D3) - secosteroid ----- */
function Cholecalciferol({ className }: SvgProps) {
  const aCx = 32;
  const aCy = 100;
  const aR = 16;
  const aVerts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return { x: aCx + aR * Math.cos(a), y: aCy + aR * Math.sin(a) };
  });

  const cCx = 132;
  const cCy = 70;
  const cR = 14;
  const cVerts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return { x: cCx + cR * Math.cos(a), y: cCy + cR * Math.sin(a) };
  });

  const dCx = 162;
  const dCy = 56;
  const dR = 11;
  const dVerts = Array.from({ length: 5 }, (_, i) => {
    const a = (2 * Math.PI / 5) * i - Math.PI / 2;
    return { x: dCx + dR * Math.cos(a), y: dCy + dR * Math.sin(a) };
  });

  return (
    <svg
      viewBox="0 0 220 160"
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* A-ring */}
      {aVerts.map((v, i) => {
        const next = aVerts[(i + 1) % 6];
        return <L key={`a-${i}`} x1={v.x} y1={v.y} x2={next.x} y2={next.y} />;
      })}
      {/* OH on A-ring */}
      <L x1={aVerts[3].x} y1={aVerts[3].y} x2={aVerts[3].x - 12} y2={aVerts[3].y + 6} />
      <A x={aVerts[3].x - 14} y={aVerts[3].y + 12} label="HO" anchor="end" />
      {/* exocyclic methylene (broken B ring marker) */}
      <L x1={aVerts[0].x} y1={aVerts[0].y} x2={aVerts[0].x + 14} y2={aVerts[0].y - 4} />
      <L x1={aVerts[0].x + 2} y1={aVerts[0].y - 4} x2={aVerts[0].x + 16} y2={aVerts[0].y - 8} />
      <L x1={aVerts[0].x + 14} y1={aVerts[0].y - 4} x2={88} y2={64} />
      {/* triene linker */}
      <L x1={88} y1={64} x2={104} y2={56} />
      <L x1={86} y1={68} x2={102} y2={60} />
      <L x1={104} y1={56} x2={120} y2={64} />
      {/* C-ring */}
      {cVerts.map((v, i) => {
        const next = cVerts[(i + 1) % 6];
        return <L key={`c-${i}`} x1={v.x} y1={v.y} x2={next.x} y2={next.y} />;
      })}
      {/* D-ring */}
      {dVerts.map((v, i) => {
        const next = dVerts[(i + 1) % 5];
        return <L key={`d-${i}`} x1={v.x} y1={v.y} x2={next.x} y2={next.y} />;
      })}
      {/* side chain */}
      <L x1={172} y1={48} x2={186} y2={56} />
      <L x1={186} y1={56} x2={196} y2={44} />
      <L x1={196} y1={44} x2={210} y2={52} />
      {/* terminal isopropyl */}
      <L x1={210} y1={52} x2={216} y2={42} />
      <L x1={210} y1={52} x2={216} y2={62} />
    </svg>
  );
}

/* ----- 5. Magnesium bisglycinate: Mg2+ chelated by 2 glycinate ions ----- */
function MagnesiumBisglycinate({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <A x={100} y={80} label="Mg" size={13} />
      <A x={114} y={72} label="2+" size={8} anchor="start" />

      {/* Top glycinate */}
      <A x={100} y={26} label={`H${SUB_2}N`} />
      <L x1={94} y1={36} x2={78} y2={48} />
      <L x1={78} y1={48} x2={78} y2={66} />
      <L x1={78} y1={66} x2={88} y2={76} />
      <L x1={75} y1={68} x2={85} y2={78} />
      <A x={86} y={70} label="O" size={9} />
      <L x1={100} y1={40} x2={94} y2={74} />
      <L x1={88} y1={76} x2={94} y2={80} />

      {/* Bottom glycinate */}
      <A x={100} y={134} label={`H${SUB_2}N`} />
      <L x1={106} y1={124} x2={122} y2={112} />
      <L x1={122} y1={112} x2={122} y2={94} />
      <L x1={122} y1={94} x2={112} y2={84} />
      <L x1={125} y1={92} x2={115} y2={82} />
      <A x={114} y={90} label="O" size={9} />
      <L x1={100} y1={120} x2={106} y2={86} />
      <L x1={112} y1={84} x2={106} y2={80} />
    </svg>
  );
}

/* ----- 6. 5-Methyltetrahydrofolate (active folate) ----- */
function Methylfolate({ className }: SvgProps) {
  const lCx = 60;
  const lCy = 70;
  const lR = 22;
  const lVerts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return { x: lCx + lR * Math.cos(a), y: lCy + lR * Math.sin(a) };
  });

  const rCx = 100;
  const rCy = 70;
  const rR = 22;
  const rVerts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6 + Math.PI;
    return { x: rCx + rR * Math.cos(a), y: rCy + rR * Math.sin(a) };
  });

  return (
    <svg
      viewBox="0 0 220 140"
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Left (pyrimidine) ring */}
      {lVerts.map((v, i) => {
        if (i === 5) return null;
        const next = lVerts[(i + 1) % 6];
        return <L key={`l-${i}`} x1={v.x} y1={v.y} x2={next.x} y2={next.y} />;
      })}
      <A x={lVerts[2].x - 4} y={lVerts[2].y} label="N" anchor="end" size={9} />
      <A x={lVerts[4].x - 4} y={lVerts[4].y} label="N" anchor="end" size={9} />
      <L x1={lVerts[3].x - 6} y1={lVerts[3].y} x2={lVerts[3].x - 18} y2={lVerts[3].y + 6} />
      <A x={lVerts[3].x - 22} y={lVerts[3].y + 10} label={`H${SUB_2}N`} anchor="end" size={9} />
      <L x1={lVerts[1].x + 4} y1={lVerts[1].y - 4} x2={lVerts[1].x + 14} y2={lVerts[1].y - 12} />
      <L x1={lVerts[1].x + 6} y1={lVerts[1].y} x2={lVerts[1].x + 16} y2={lVerts[1].y - 8} />
      <A x={lVerts[1].x + 18} y={lVerts[1].y - 14} label="O" size={9} anchor="start" />

      {/* Right (pyrazine) ring */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        const nextA = (Math.PI / 3) * (i + 1) + Math.PI / 6;
        const x1 = rCx + rR * Math.cos(a);
        const y1 = rCy + rR * Math.sin(a);
        const x2 = rCx + rR * Math.cos(nextA);
        const y2 = rCy + rR * Math.sin(nextA);
        return <L key={`r-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      <L x1={rVerts[5].x} y1={rVerts[5].y} x2={rVerts[0].x} y2={rVerts[0].y} />

      <A x={rCx - 22} y={rCy - 12} label="N" size={9} />
      <L x1={rCx - 26} y1={rCy - 18} x2={rCx - 38} y2={rCy - 28} />
      <A x={rCx - 42} y={rCy - 32} label={`CH${SUB_3}`} anchor="end" size={9} />
      <A x={rCx - 22} y={rCy + 12} label="NH" size={9} />

      {/* Stub bond to PABA-glutamate */}
      <L x1={rVerts[2].x} y1={rVerts[2].y} x2={rVerts[2].x + 22} y2={rVerts[2].y} />
      <L x1={rVerts[2].x + 22} y1={rVerts[2].y} x2={rVerts[2].x + 36} y2={rVerts[2].y - 10} />
      <A x={rVerts[2].x + 42} y={rVerts[2].y - 8} label="…" size={14} anchor="start" />
    </svg>
  );
}

import { useMemo, useState } from 'react';
import type { Domain, FlowStage } from '../../data/domains';

type Props = { domains: Domain[] };

type PositionedDomain = Domain & { x: number; y: number };

const stageLabels: Record<FlowStage, string> = {
  simulation: 'Simulation',
  spatial: 'Spatial',
  vision: 'Vision',
  agents: 'Agents',
  platform: 'Platform'
};

function positionDomains(domains: Domain[]): PositionedDomain[] {
  const centerX = 50;
  const centerY = 47;
  const radiusX = 24;
  const radiusY = 15;

  return domains.map((domain, index) => {
    // Use the existing angle as the source, but normalize the layout into a stable oval.
    // The small index offsets prevent adjacent labels/nodes from colliding.
    const offset = (index % 2 === 0 ? -1 : 1) * 0.65;
    return {
      ...domain,
      x: centerX + Math.cos(domain.angle) * radiusX,
      y: centerY + Math.sin(domain.angle) * radiusY + offset
    };
  });
}

function curvedPath(from: PositionedDomain, to: PositionedDomain) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const bendX = 50 + (mx - 50) * 0.12;
  const bendY = 47 + (my - 47) * 0.12;
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} Q ${bendX.toFixed(2)} ${bendY.toFixed(2)} ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

function centerPath(to: PositionedDomain) {
  const bendX = 50 + (to.x - 50) * 0.34;
  const bendY = 47 + (to.y - 47) * 0.12;
  return `M 50 47 Q ${bendX.toFixed(2)} ${bendY.toFixed(2)} ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

export default function SystemsAtlas({ domains }: Props) {
  const [selectedId, setSelectedId] = useState<string>(domains[0]?.id ?? '');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const positionedDomains = useMemo(() => positionDomains(domains), [domains]);
  const selectedDomain = positionedDomains.find((d) => d.id === selectedId) ?? positionedDomains[0];
  const previewDomain = positionedDomains.find((d) => d.id === hoveredId) ?? selectedDomain;
  const previewRelated = positionedDomains.filter((d) => previewDomain.related.includes(d.id));

  return (
    <div className="grid gap-5 lg:grid-cols-[1.06fr_0.94fr] lg:items-stretch">
      <div className="atlas-card atlas-panel atlas-stable relative min-h-[390px] overflow-hidden p-0 md:min-h-[455px]">
        <div className="absolute left-4 top-4 z-20 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-600">Research atlas</div>
        <div className="absolute right-4 top-4 z-20 hidden border hairline bg-paper-50/72 px-2.5 py-1 font-mono text-[0.53rem] uppercase tracking-[0.14em] text-ink-600 backdrop-blur-sm sm:block">
          Hover previews · click selects
        </div>

        <div className="atlas-ambient absolute inset-0" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="orbitFadeStable" x1="0" x2="1">
              <stop offset="0%" stopColor="#bcaea0" stopOpacity="0.05" />
              <stop offset="52%" stopColor="#b86f3f" stopOpacity="0.13" />
              <stop offset="100%" stopColor="#bcaea0" stopOpacity="0.05" />
            </linearGradient>
            <radialGradient id="coreGlowStable" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffaf0" stopOpacity="0.96" />
              <stop offset="58%" stopColor="#b86f3f" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#1a1410" stopOpacity="0.02" />
            </radialGradient>
          </defs>

          {[16, 20, 24, 28, 32].map((rx, index) => (
            <ellipse
              key={`orbit-${rx}`}
              cx="50"
              cy="47"
              rx={rx}
              ry={rx * 0.56}
              fill="none"
              stroke="url(#orbitFadeStable)"
              strokeWidth={index % 2 === 0 ? '0.16' : '0.10'}
            />
          ))}

          <g opacity="0.34">
            {[...Array(8)].map((_, i) => (
              <line
                key={`radial-${i}`}
                x1="50"
                y1="47"
                x2={50 + Math.cos((i / 8) * Math.PI * 2) * 35}
                y2={47 + Math.sin((i / 8) * Math.PI * 2) * 20}
                stroke="#d7c7af"
                strokeWidth="0.075"
              />
            ))}
          </g>

          {previewRelated.map((domain, index) => (
            <path
              key={`${domain.id}-relation`}
              d={curvedPath(previewDomain, domain)}
              className="atlas-relation-path"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}

          <path d={centerPath(previewDomain)} className="atlas-active-ray" />

          <circle cx="50" cy="47" r="10.4" fill="url(#coreGlowStable)" opacity="0.76" />
          <circle cx="50" cy="47" r="6.5" fill="#1a1410" />
          <circle cx="50" cy="47" r="8.1" fill="none" stroke="#b86f3f" strokeOpacity="0.62" strokeWidth="0.30" />
          <circle cx="50" cy="47" r="10.8" fill="none" stroke="#704024" strokeOpacity="0.12" strokeWidth="0.14" strokeDasharray="1.1 1.5" />

          {positionedDomains.map((domain) => {
            const isPreview = previewDomain.id === domain.id;
            const isSelected = selectedDomain.id === domain.id;
            const isRelated = previewDomain.related.includes(domain.id);
            return (
              <g key={`${domain.id}-svg-node`}>
                <circle cx={domain.x} cy={domain.y} r={isPreview ? 2.22 : isRelated ? 1.8 : 1.46} fill="rgba(255,250,240,0.88)" stroke={isPreview ? '#b86f3f' : isSelected ? '#704024' : isRelated ? '#704024' : '#2a211b'} strokeOpacity={isPreview ? 0.82 : 0.36} strokeWidth="0.17" />
                {isSelected && <circle cx={domain.x} cy={domain.y} r="3.5" fill="none" stroke="#704024" strokeOpacity="0.18" strokeWidth="0.16" />}
                {isPreview && <circle cx={domain.x} cy={domain.y} r="4.0" fill="none" stroke="#b86f3f" strokeOpacity="0.20" strokeWidth="0.16" className="atlas-node-pulse" />}
              </g>
            );
          })}
        </svg>

        <div className="absolute inset-0">
          {positionedDomains.map((domain) => {
            const isPreview = previewDomain.id === domain.id;
            const isSelected = selectedDomain.id === domain.id;
            const isRelated = previewDomain.related.includes(domain.id);
            return (
              <button
                key={domain.id}
                type="button"
                aria-label={domain.title}
                onMouseEnter={() => setHoveredId(domain.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(domain.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => setSelectedId(domain.id)}
                className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{ left: `${domain.x}%`, top: `${domain.y}%` }}
              >
                <span className={`absolute left-1/2 top-1/2 block h-9 w-9 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 ${isPreview ? 'bg-[rgba(184,111,63,0.10)]' : 'bg-transparent'} ${isRelated ? 'ring-1 ring-[rgba(184,111,63,0.18)]' : ''}`} />
                <span className="relative block h-7 w-7" />
                <span className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap border hairline bg-paper-50/92 px-2 py-1 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-ink-700 shadow-sm backdrop-blur-sm transition-opacity duration-150 ${isPreview || isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {domain.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20 grid gap-3 md:grid-cols-[1.08fr_0.92fr]">
          <div className="border hairline bg-paper-50/75 p-3 shadow-[0_10px_30px_rgba(42,33,27,0.045)] backdrop-blur-sm">
            <p className="font-mono text-[0.53rem] uppercase tracking-[0.15em] text-copper-700">Preview focus</p>
            <p className="mt-1.5 min-h-[2.9rem] text-[0.82rem] leading-6 text-ink-700">{previewDomain.focus}</p>
          </div>
          <div className="border hairline bg-paper-50/75 p-3 shadow-[0_10px_30px_rgba(42,33,27,0.045)] backdrop-blur-sm">
            <p className="font-mono text-[0.53rem] uppercase tracking-[0.15em] text-copper-700">Connected to</p>
            <div className="mt-2 flex min-h-[2.9rem] flex-wrap gap-1.5">
              {previewRelated.map((domain) => (
                <span key={domain.id} className="inline-flex items-center border hairline px-1.5 py-0.5 font-mono text-[0.48rem] uppercase tracking-[0.10em] text-ink-700">
                  {domain.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="atlas-card flex min-h-[390px] flex-col p-5 md:min-h-[455px] md:p-6">
        <div className="min-h-[9.8rem]">
          <p className="kicker">Selected system</p>
          <h3 className="mt-3 max-w-[10em] font-serif text-[clamp(2.05rem,3.25vw,3.15rem)] leading-[0.98] text-ink-900">{selectedDomain.title}</h3>
          <p className="mt-4 max-w-[42rem] text-[0.94rem] leading-7 text-ink-600">{selectedDomain.description}</p>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {selectedDomain.stack.map((item) => (
            <div key={item} className="border hairline bg-paper-100/38 px-3 py-2">
              <span className="font-mono text-[0.53rem] uppercase tracking-[0.13em] text-ink-600">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t hairline pt-4">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-copper-700">Where it sits</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedDomain.stages.map((stage) => (
              <span key={stage} className="border hairline bg-paper-50/70 px-2.5 py-1 font-mono text-[0.53rem] uppercase tracking-[0.12em] text-ink-700">
                {stageLabels[stage]}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-1">
          {positionedDomains.map((domain) => (
            <button
              key={domain.id}
              onMouseEnter={() => setHoveredId(domain.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(domain.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => setSelectedId(domain.id)}
              className={`flex items-center justify-between border-t hairline py-2 text-left transition-colors ${selectedDomain.id === domain.id ? 'text-copper-700' : 'text-ink-700 hover:text-copper-700'}`}
            >
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.15em]">{domain.title}</span>
              <span className="hidden text-[0.78rem] sm:inline">{domain.short}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

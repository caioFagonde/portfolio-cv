import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Domain } from '../../data/domains';

type Props = {
  domains: Domain[];
};

function OrbitLines({ domains }: Props) {
  return (
    <group>
      {domains.map((domain) => {
        const points: THREE.Vector3[] = [];
        for (let i = 0; i <= 128; i++) {
          const t = (i / 128) * Math.PI * 2;
          points.push(new THREE.Vector3(Math.cos(t) * domain.orbit, Math.sin(t) * domain.orbit * 0.42, 0));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={domain.id} geometry={geometry} rotation={[0.35, 0, 0]}>
            <lineBasicMaterial attach="material" color="#5d4c3f" transparent opacity={0.16} />
          </line>
        );
      })}
    </group>
  );
}

function DomainNode({ domain, active, onHover }: { domain: Domain; active: boolean; onHover: (id: string | null) => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => {
    const x = Math.cos(domain.angle) * domain.orbit;
    const y = Math.sin(domain.angle) * domain.orbit * 0.42;
    const z = Math.sin(domain.angle * 1.7) * 1.1;
    return new THREE.Vector3(x, y, z);
  }, [domain]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = active ? 1.45 : 1 + Math.sin(clock.elapsedTime * 1.2 + domain.angle) * 0.035;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh
      ref={ref}
      position={pos}
      onPointerOver={() => onHover(domain.id)}
      onPointerOut={() => onHover(null)}
    >
      <sphereGeometry args={[0.09, 24, 24]} />
      <meshBasicMaterial color={active ? '#b86f3f' : '#2a211b'} />
    </mesh>
  );
}

function AtlasScene({ domains, active, setActive }: Props & { active: string | null; setActive: (id: string | null) => void }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.08) * 0.035;
    group.current.rotation.x = -0.35 + Math.sin(clock.elapsedTime * 0.06) * 0.02;
  });
  return (
    <group ref={group}>
      <OrbitLines domains={domains} />
      {domains.map((domain) => <DomainNode key={domain.id} domain={domain} active={active === domain.id} onHover={setActive} />)}
      <mesh position={[0, 0, -0.05]}>
        <circleGeometry args={[0.62, 64]} />
        <meshBasicMaterial color="#1a1410" transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[0.75, 0.78, 96]} />
        <meshBasicMaterial color="#b86f3f" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

export default function SystemsAtlas({ domains }: Props) {
  const [active, setActive] = useState<string | null>(domains[0]?.id ?? null);
  const activeDomain = domains.find((d) => d.id === active) ?? domains[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
      <div className="atlas-card relative min-h-[420px] overflow-hidden p-0">
        <div className="absolute left-5 top-5 z-10 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-600">Research atlas</div>
        <Canvas camera={{ position: [0, 0, 13], fov: 38 }} dpr={[1, 1.6]}>
          <color attach="background" args={['#fffaf0']} />
          <Suspense fallback={null}>
            <AtlasScene domains={domains} active={active} setActive={setActive} />
          </Suspense>
        </Canvas>
      </div>
      <div className="atlas-card flex min-h-[420px] flex-col justify-between p-8">
        <div>
          <p className="kicker">Selected system</p>
          <h3 className="mt-5 font-serif text-5xl leading-[0.95] tracking-[-0.06em] text-ink-900">{activeDomain?.title}</h3>
          <p className="mt-5 text-base leading-8 text-ink-600">{activeDomain?.description}</p>
        </div>
        <div className="mt-10 grid gap-2">
          {domains.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`flex items-center justify-between border-t hairline py-3 text-left transition-colors ${active === d.id ? 'text-copper-700' : 'text-ink-700 hover:text-copper-700'}`}
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em]">{d.title}</span>
              <span className="text-sm">{d.short}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

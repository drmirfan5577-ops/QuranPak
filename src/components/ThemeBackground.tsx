import React from 'react';
import type { Theme } from '@/types/quran';

interface Props { theme: Theme; }

// Extra animated particles for crystal / live displays
function Particles({ accent }: { accent: string }) {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${4 + (i % 3) * 3}px`,
            height: `${4 + (i % 3) * 3}px`,
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 13 + 10) % 90}%`,
            background: accent,
            opacity: 0.04 + (i % 4) * 0.01,
            animation: `floatOrb${(i % 3) + 1} ${14 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
            filter: `blur(${1 + i % 2}px)`,
          }}
        />
      ))}
    </>
  );
}

export default function ThemeBackground({ theme }: Props) {
  // Detect special live-bright themes
  const isCrystalBright = ['pearl', 'crystal', 'skyAzure', 'mintBreeze'].includes(theme.id);
  const isEmerald = ['emerald', 'mintBreeze'].includes(theme.id);
  const isVibrant = ['royal', 'aurora', 'roseGarden', 'sakura'].includes(theme.id);
  const isGold    = ['sunrise', 'desertGold'].includes(theme.id);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* === Base layer === */}
      <div className={`absolute inset-0 ${theme.bgClass}`} />

      {/* === Crystal-clear pure white overlay === */}
      {isCrystalBright && (
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.55) 100%)',
          }}
        />
      )}

      {/* === Emerald luminous glow === */}
      {isEmerald && (
        <>
          <div className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 20%, ${theme.orb1} 0%, transparent 55%),
                           radial-gradient(ellipse at 70% 70%, ${theme.orb2} 0%, transparent 50%)`,
            }}
          />
          {/* Luminous border glow */}
          <div className="absolute inset-0 rounded-none"
            style={{
              boxShadow: `inset 0 0 120px ${theme.accent}12`,
            }}
          />
        </>
      )}

      {/* === Main animated orbs (large) === */}
      <div className="orb-1 absolute rounded-full"
        style={{
          width: '55vw', height: '55vw',
          top: '-18%', left: '-5%',
          background: theme.orb1,
          filter: `blur(${isCrystalBright ? 60 : 80}px)`,
        }}
      />
      <div className="orb-2 absolute rounded-full"
        style={{
          width: '50vw', height: '50vw',
          top: '10%', right: '-10%',
          background: theme.orb2,
          filter: `blur(${isCrystalBright ? 70 : 100}px)`,
        }}
      />
      <div className="orb-3 absolute rounded-full"
        style={{
          width: '45vw', height: '45vw',
          bottom: '-5%', left: '20%',
          background: theme.orb3,
          filter: `blur(${isCrystalBright ? 65 : 90}px)`,
        }}
      />

      {/* === Extra accent orbs for vibrant themes === */}
      {(isVibrant || isGold) && (
        <>
          <div className="orb-2 absolute rounded-full"
            style={{
              width: '30vw', height: '30vw',
              top: '50%', left: '40%',
              background: theme.orb1,
              filter: 'blur(80px)',
              opacity: 0.45,
            }}
          />
          <div className="orb-3 absolute rounded-full"
            style={{
              width: '22vw', height: '22vw',
              top: '5%', right: '30%',
              background: theme.orb2,
              filter: 'blur(60px)',
              opacity: 0.35,
            }}
          />
        </>
      )}

      {/* === Semi-transparent live scanning line === */}
      <div className="absolute left-0 right-0 h-[1px] pointer-events-none"
        style={{
          top: '33%',
          background: `linear-gradient(90deg, transparent 0%, ${theme.accent}22 30%, ${theme.accent}45 50%, ${theme.accent}22 70%, transparent 100%)`,
          animation: 'scanLine 10s linear infinite',
          opacity: 0.6,
        }}
      />

      {/* === Islamic geometric pattern overlay === */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(60deg, ${theme.accent}08 0px, ${theme.accent}08 1px, transparent 1px, transparent 35px),
            repeating-linear-gradient(-60deg, ${theme.accent}06 0px, ${theme.accent}06 1px, transparent 1px, transparent 35px),
            repeating-linear-gradient(0deg, ${theme.accent}04 0px, ${theme.accent}04 1px, transparent 1px, transparent 35px)
          `,
          opacity: 0.8,
        }}
      />

      {/* === Fine dot mesh (digital display) === */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme.accent}15 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.35,
        }}
      />

      {/* === Top shimmer bar — live streaming style === */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.accent}44 20%, ${theme.orb2} 50%, ${theme.accent}55 80%, transparent 100%)`,
          backgroundSize: '300% 100%',
          animation: 'shimmerFlow 4s ease-in-out infinite',
        }}
      />

      {/* === Bottom glow line === */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.accent}35, transparent)`,
          backgroundSize: '200% 100%',
          animation: 'shimmerFlow 8s ease-in-out infinite reverse',
        }}
      />

      {/* === Corner accent glows === */}
      <div className="absolute top-0 left-0 w-48 h-48"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${theme.accent}14 0%, transparent 60%)`,
        }}
      />
      <div className="absolute bottom-0 right-0 w-64 h-64"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${theme.orb2} 0%, transparent 60%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* === Animated particles === */}
      <Particles accent={theme.accent} />

      {/* === Live pulsing ring (center) === */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '60vw', height: '60vw',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          border: `1px solid ${theme.accent}08`,
          animation: 'ringPulse 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '80vw', height: '80vw',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          border: `1px solid ${theme.accent}05`,
          animation: 'ringPulse 12s ease-in-out infinite 2s',
        }}
      />

      {/* === Vertical side glow strips === */}
      <div className="absolute top-0 bottom-0 left-0 w-[3px]"
        style={{
          background: `linear-gradient(180deg, transparent, ${theme.accent}35, ${theme.orb2}, ${theme.accent}22, transparent)`,
          animation: 'shimmerFlow 6s ease-in-out infinite',
        }}
      />
      <div className="absolute top-0 bottom-0 right-0 w-[2px]"
        style={{
          background: `linear-gradient(180deg, transparent, ${theme.accent}22, ${theme.orb2}, ${theme.accent}18, transparent)`,
          animation: 'shimmerFlow 9s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
}

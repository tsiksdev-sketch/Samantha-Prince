'use client'

import { useEffect, useState } from "react";


type Phase = "sealed" | "opening" | "revealing" | "done";

const STORAGE_KEY = "sp-invitation-opened";

export function WeddingPreloader() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("sealed");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const open = () => {
    if (phase !== "sealed") return;
    setPhase("opening");
    window.setTimeout(() => setPhase("revealing"), 2500);
    window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      document.body.style.overflow = "";
      setPhase("done");
    }, 4400);
  };

  if (!mounted || phase === "done") return null;

  const opened = phase !== "sealed";

  return (
    <div
      className={`fixed inset-0 z-100 grid place-items-center overflow-hidden transition-opacity duration-700 ${
        phase === "revealing" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, #f7e9e6 0%, #efd9d5 45%, #d9b7b3 100%)",
      }}
      role="dialog"
      aria-label="Wedding invitation"
    >
      {/* soft vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 220px rgba(90,40,45,0.28)" }}
      />

      <div
        className="relative"
        style={{ perspective: "1400px", width: "min(86vw, 380px)" }}
      >
        {/* ── invitation card (rises out and unfolds open) ── */}
        <div
          className={`absolute inset-x-3 bottom-3 top-3 transition-all duration-1400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            opened ? "z-30" : "z-[-1]"
          }`}
          style={{
            backgroundColor: "transparent",
            transitionDelay: opened ? "300ms" : "0ms",
            transform: opened
              ? "translateY(-16%) scale(1.03)"
              : "translateY(6%) scale(0.97)",
            opacity: opened ? 1 : 0,
            visibility: opened ? "visible" : "hidden",
            perspective: "1400px",
          }}
        >
          <div
            className="relative h-full w-full transition-transform duration-1500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transformStyle: "preserve-3d",
              transform: opened ? "rotateY(-180deg)" : "rotateY(0deg)",
              transitionDelay: opened ? "700ms" : "0ms",
            }}
          >
            {/* Front cover */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-sm px-6 text-center backface-hidden"
            style={{
  backgroundColor: "#fdf3ef",
  backgroundImage: `url(/paper-texture.jpg)`,
  backgroundSize: "cover",
  boxShadow: "0 30px 60px -25px rgba(90,40,45,0.45)",
}}
            >
              <div
                className="absolute inset-3 rounded-xs border border-[#d9b7b3]/60"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(217,183,179,0.2))",
                }}
              />
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className="h-px w-12"
                  style={{ background: "rgba(176,138,90,0.5)" }}
                />
                <p
                  className="mt-4 text-[10px] uppercase"
                  style={{ letterSpacing: "0.35em", color: "#8a5b58" }}
                >
                  The Wedding of
                </p>
                <h2
                  className="mt-4 text-[3rem] leading-[1.05]"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    color: "#7a2a32",
                  }}
                >
                  Samantha
                  <span
                    className="mx-2 text-[1.8rem] align-middle"
                    style={{ color: "#b08a5a" }}
                  >
                    &
                  </span>
                  Prince
                </h2>
                <div
                  className="mt-4 h-px w-12"
                  style={{ background: "rgba(176,138,90,0.5)" }}
                />
                <img
                  src='/wax-seal.png'
                  alt="Wax seal monogram S & P"
                  className="mt-5 w-16 drop-shadow-[0_8px_14px_rgba(90,30,35,0.35)]"
                />
              </div>
            </div>

            {/* Inside face */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-sm px-6 text-center backface-hidden"
              style={{
                transform: "rotateY(180deg)",
                backgroundColor: "#fdf3ef",
                backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.45)), url(/paper-texture.jpg)`,
                backgroundSize: "cover",
                boxShadow: "0 30px 60px -25px rgba(90,40,45,0.45)",
              }}
            >
              {/* central fold crease */}
              <div
                className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(122,42,50,0.12) 20%, rgba(122,42,50,0.12) 80%, transparent)",
                }}
              />
              <div
                className="h-px w-16"
                style={{ background: "rgba(122,42,50,0.4)" }}
              />
              <p
                className="mt-5 text-[10px] uppercase"
                style={{ letterSpacing: "0.42em", color: "#8a5b58" }}
              >
                Together with their families
              </p>
              <h2
                className="mt-6 text-[2.6rem] leading-[1.05]"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: "#7a2a32",
                }}
              >
                Samantha
                <span
                  className="mx-2 text-[1.6rem] align-middle"
                  style={{ color: "#b08a5a" }}
                >
                  &
                </span>
                <br />
                Prince
              </h2>
              <p
                className="mt-6 text-[11px] uppercase"
                style={{ letterSpacing: "0.34em", color: "#8a5b58" }}
              >
                Request the pleasure
                <br />
                of your company
              </p>
              <div
                className="mt-7 h-px w-16"
                style={{ background: "rgba(122,42,50,0.4)" }}
              />
              <p
                className="mt-5 text-[10px] uppercase"
                style={{ letterSpacing: "0.3em", color: "#b08a5a" }}
              >
                Opening the invitation…
              </p>
            </div>
          </div>
        </div>

        {/* ── envelope ── */}
        <div
          className="relative aspect-3/4 w-full rounded-md transition-all duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transformStyle: "preserve-3d",
            backgroundImage: `url(/paper-texture.jpg)`,
            backgroundSize: "cover",
            boxShadow: opened
              ? "0 10px 30px -20px rgba(90,40,45,0.3)"
              : "0 40px 80px -30px rgba(90,40,45,0.55), 0 2px 0 rgba(255,255,255,0.6) inset",
            opacity: opened ? 0 : 1,
            transform: opened ? "scale(1.06)" : "scale(1)",
            transitionDelay: opened ? "900ms" : "0ms",
          }}
        >
          {/* warm inner glow visible as flaps part */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,214,160,0.45), rgba(255,238,214,0.2) 45%, transparent 70%)",
              opacity: opened ? 1 : 0,
              transition: "opacity 600ms ease",
            }}
          />

          <Flap texture='/paper-texture.jpg' side="top" opened={opened} />
          <Flap texture='/paper-texture.jpg' side="bottom" opened={opened} />
          <Flap texture='/paper-texture.jpg' side="left" opened={opened} />
          <Flap texture='/paper-texture.jpg' side="right" opened={opened} />

          {/* wax seal */}
          <button
            onClick={open}
            aria-label="Open the invitation"
            className="group absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
            style={{
              width: "34%",
              transition: "transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 500ms",
              transform: opened
                ? "translate(-50%, 40%) rotate(24deg) scale(0.8)"
                : "translate(-50%, -50%)",
              opacity: opened ? 0 : 1,
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                animation: "sp-pulse 2.6s ease-out infinite",
                boxShadow: "0 0 0 0 rgba(122,42,50,0.4)",
              }}
            />
            <img
              src='/wax-seal.png'
              alt="Wax seal monogram S & P"
              width={816}
              height={816}
              className="w-full drop-shadow-[0_10px_18px_rgba(90,30,35,0.45)] transition-transform duration-500 group-hover:scale-[1.06] group-active:scale-95"
            />
          </button>
        </div>

        {!opened && (
          <p
            className="absolute -bottom-12 left-0 right-0 text-center text-[10px] uppercase"
            style={{ letterSpacing: "0.4em", color: "#8a5b58" }}
          >
            Tap the seal to open
          </p>
        )}
      </div>

      <style>{`
        @keyframes sp-pulse {
          0% { box-shadow: 0 0 0 0 rgba(122,42,50,0.35); }
          70% { box-shadow: 0 0 0 26px rgba(122,42,50,0); }
          100% { box-shadow: 0 0 0 0 rgba(122,42,50,0); }
        }
      `}</style>
    </div>
  );
}

function Flap({
  side,
  opened,
  texture,
}: {
  side: "top" | "bottom" | "left" | "right";
  opened: boolean;
  texture: string;
}) {
  const clip = {
    top: "polygon(0 0, 100% 0, 50% 50%)",
    bottom: "polygon(0 100%, 100% 100%, 50% 50%)",
    left: "polygon(0 0, 0 100%, 50% 50%)",
    right: "polygon(100% 0, 100% 100%, 50% 50%)",
  }[side];

  const origin = {
    top: "top center",
    bottom: "bottom center",
    left: "center left",
    right: "center right",
  }[side];

  const openTransform = {
    top: "rotateX(-172deg)",
    bottom: "rotateX(172deg)",
    left: "rotateY(172deg)",
    right: "rotateY(-172deg)",
  }[side];

  const delay = { top: 0, left: 120, right: 120, bottom: 240 }[side];

  const shade = {
    top: "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(160,110,110,0.14))",
    bottom: "linear-gradient(0deg, rgba(255,255,255,0.4), rgba(160,110,110,0.18))",
    left: "linear-gradient(90deg, rgba(255,255,255,0.45), rgba(160,110,110,0.16))",
    right: "linear-gradient(270deg, rgba(255,255,255,0.45), rgba(160,110,110,0.16))",
  }[side];

  return (
    <div
      className="absolute inset-0 z-10"
      style={{
        clipPath: clip,
        transformOrigin: origin,
        transformStyle: "preserve-3d",
        backgroundImage: `${shade}, url(${texture})`,
        backgroundSize: "cover",
        filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.5))",
        transform: opened ? openTransform : "rotateX(0deg) rotateY(0deg)",
        transition: `transform 1100ms cubic-bezier(0.65,0,0.35,1) ${delay}ms`,
      }}
    />
  );
}

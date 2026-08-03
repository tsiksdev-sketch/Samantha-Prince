"use client";

import { useEffect, useMemo, useState } from "react";

type Stage = "sealed" | "opening" | "revealing" | "done";

export default function WeddingInvitationPreloader({
  onDone,
}: {
  onDone?: () => void;
}) {
  const [stage, setStage] = useState<Stage>("sealed");
  const [press, setPress] = useState(false);

  // Preloader behavior: lock scroll while not done, and ensure body unlocks on unmount
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = stage === "done" ? prevOverflow : "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [stage]);

  // Move stages automatically when user opens (matches "first code" feel)
  useEffect(() => {
    if (stage !== "opening") return;

    const t1 = window.setTimeout(() => setStage("revealing"), 1250);
    return () => window.clearTimeout(t1);
  }, [stage]);

  useEffect(() => {
    if (stage !== "revealing") return;

    const t2 = window.setTimeout(() => {
      setStage("done");
      onDone?.();
    }, 1000);

    return () => window.clearTimeout(t2);
  }, [stage, onDone]);

  const opened = stage !== "sealed";

  const open = () => {
    if (stage !== "sealed") return;
    setPress(true);
    window.setTimeout(() => setPress(false), 180);
    setStage("opening");
  };

  if (stage === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-100 grid place-items-center overflow-hidden transition-opacity duration-700 ${
        stage === "revealing" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, #f7e9e6 0%, #efd9d5 45%, #d9b7b3 100%)",
      }}
      role="dialog"
      aria-label="Wedding invitation preloader"
    >
      <style>{`
        @keyframes sp-pulse {
          0% { box-shadow: 0 0 0 0 rgba(122,42,50,0.35); }
          70% { box-shadow: 0 0 0 26px rgba(122,42,50,0); }
          100% { box-shadow: 0 0 0 0 rgba(122,42,50,0); }
        }
        @keyframes seal-breathe {
          0%,100% { transform: translate(-50%,-50%) scale(1); }
          50% { transform: translate(-50%,-50%) scale(1.035); }
        }
      `}</style>

      {/* soft vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 220px rgba(90,40,45,0.28)" }}
      />

      {/* main “invitation” composition */}
      <div
        className="relative"
        style={{
          perspective: "1400px",
          width: "min(86vw, 380px)",
        }}
      >
        {/* invitation card (rises out / unfolds feel) */}
        <div
          className="absolute inset-x-3 bottom-3 top-3 transition-all duration-1400 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: opened ? "translateY(-16%) scale(1.03)" : "translateY(6%) scale(0.97)",
            opacity: opened ? 1 : 0,
            visibility: opened ? "visible" : "hidden",
            transitionDelay: opened ? "300ms" : "0ms",
            transformStyle: "preserve-3d",
          }}
        >
          {/* inside face text/design */}
     <div
  style={{
    position: "relative",
    height: "100%",
    width: "100%",
    transformStyle: "preserve-3d",
    transform: opened ? "rotateY(-180deg)" : "rotateY(0deg)",

    // ✅ avoid lint warning: don't use "transition" shorthand
    transitionProperty: "transform",
    transitionDuration: "1500ms",
    transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
    transitionDelay: opened ? "700ms" : "0ms",
  }}
>
            {/* Front cover */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-sm px-6 text-center"
              style={{
                backgroundColor: "#fdf3ef",
                backgroundImage: `url(/paper-texture.jpg)`,
                backgroundSize: "cover",
                boxShadow: "0 30px 60px -25px rgba(90,40,45,0.45)",
                backfaceVisibility: "hidden",
              }}
            >
              <div
                className="absolute inset-3 rounded-xs border"
                style={{
                  borderColor: "rgba(217,183,179,0.6)",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(217,183,179,0.2))",
                }}
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-px w-12" style={{ background: "rgba(176,138,90,0.5)" }} />
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
                  <span className="mx-2 text-[1.8rem]" style={{ color: "#b08a5a" }}>
                    &
                  </span>
                  Prince
                </h2>
                <div className="mt-4 h-px w-12" style={{ background: "rgba(176,138,90,0.5)" }} />
                <img
                  src='/wax-seal.png'
                  alt="Wax seal monogram S & P"
                  className="mt-5 w-16 drop-shadow-[0_8px_14px_rgba(90,30,35,0.35)]"
                />
              </div>
            </div>

            {/* Inside face */}
           <div
  style={{
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    paddingInline: "24px",   // ✅ FIX (was paddingInline:'24px')
    textAlign: "center",
    transform: "rotateY(180deg)",
    backgroundColor: "#fdf3ef",
    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.45)), url(/paper-texture.jpg)`,
    backgroundSize: "cover",
    boxShadow: "0 30px 60px -25px rgba(90,40,45,0.45)",
    backfaceVisibility: "hidden",
  }}
>
              <div
                className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(122,42,50,0.12) 20%, rgba(122,42,50,0.12) 80%, transparent)",
                }}
              />
              <div className="h-px w-16" style={{ background: "rgba(122,42,50,0.4)" }} />
              <p
                className="mt-5 text-[10px] uppercase"
                style={{ letterSpacing: "0.42em", color: "#8a5b58" }}
              >
                Together with their families
              </p>
              <h2
                className="mt-6 text-[2.6rem] leading-[1.05]"
                style={{ fontFamily: "'Great Vibes', cursive", color: "#7a2a32" }}
              >
                Samantha
                <span className="mx-2 text-[1.6rem]" style={{ color: "#b08a5a" }}>
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
              <div className="mt-7 h-px w-16" style={{ background: "rgba(122,42,50,0.4)" }} />
              <p
                className="mt-5 text-[10px] uppercase"
                style={{ letterSpacing: "0.3em", color: "#b08a5a" }}
              >
                Opening the invitation…
              </p>
            </div>
          </div>
        </div>

        {/* envelope + flaps */}
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
          {/* warm inner glow */}
          <div
            className="absolute inset-0 transition-opacity duration-600"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,214,160,0.45), rgba(255,238,214,0.2) 45%, transparent 70%)",
              opacity: opened ? 1 : 0,
            }}
          />

          <Flap texture='/paper-texture.jpg' side="top" opened={opened} />
          <Flap texture='/paper-texture.jpg' side="bottom" opened={opened} />
          <Flap texture='/paper-texture.jpg' side="left" opened={opened} />
          <Flap texture='/paper-texture.jpg' side="right" opened={opened} />

          {/* wax seal button */}
          <button
            onClick={open}
            aria-label="Open the invitation"
            disabled={stage !== "sealed"}
            className="group absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
            style={{
              width: "34%",
              transition: "transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 500ms",
              transform: opened
                ? "translate(-50%, 40%) rotate(24deg) scale(0.8)"
                : `translate(-50%, -50%) scale(${press ? 0.92 : 1})`,
              opacity: opened ? 0 : 1,
              animation:
                !opened && !press ? "seal-breathe 3.2s ease-in-out infinite" : undefined,
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full -z-10"
              style={{
                background:
                  "radial-gradient(circle at 30% 26%, rgba(176,138,90,0.45), rgba(122,42,50,0.25), rgba(0,0,0,0) 70%)",
                opacity: 0.25,
                filter: "blur(12px)",
              }}
            />
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
  const clip: Record<typeof side, string> = {
    top: "polygon(0 0, 100% 0, 50% 50%)",
    bottom: "polygon(0 100%, 100% 100%, 50% 50%)",
    left: "polygon(0 0, 0 100%, 50% 50%)",
    right: "polygon(100% 0, 100% 100%, 50% 50%)",
  };

  const origin: Record<typeof side, string> = {
    top: "top center",
    bottom: "bottom center",
    left: "center left",
    right: "center right",
  };

  const openTransform: Record<typeof side, string> = {
    top: "rotateX(-172deg)",
    bottom: "rotateX(172deg)",
    left: "rotateY(172deg)",
    right: "rotateY(-172deg)",
  };

  const delay: Record<typeof side, number> = {
    top: 0,
    left: 120,
    right: 120,
    bottom: 240,
  };

  const shade: Record<typeof side, string> = {
    top: "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(160,110,110,0.14))",
    bottom: "linear-gradient(0deg, rgba(255,255,255,0.4), rgba(160,110,110,0.18))",
    left: "linear-gradient(90deg, rgba(255,255,255,0.45), rgba(160,110,110,0.16))",
    right: "linear-gradient(270deg, rgba(255,255,255,0.45), rgba(160,110,110,0.16))",
  };

  return (
    <div
      className="absolute inset-0 z-10"
      style={{
        clipPath: clip[side],
        transformOrigin: origin[side],
        transformStyle: "preserve-3d",
        backgroundImage: `${shade[side]}, url(${texture})`,
        backgroundSize: "cover",
        filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.5))",
        transform: opened ? openTransform[side] : "rotateX(0deg) rotateY(0deg)",
        transition: `transform 1100ms cubic-bezier(0.65,0,0.35,1) ${delay[side]}ms`,
      }}
    />
  );
}

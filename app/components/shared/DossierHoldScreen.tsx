import { DOSSIER_HOLD_PREVIEW_IMAGE } from "@/app/lib/dossier-hold";

export function DossierHoldScreen() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        overflow: "hidden",
      }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="dossier-hold-title"
    >
      {/* Blurred dossier preview */}
      <img
        src={DOSSIER_HOLD_PREVIEW_IMAGE}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          position: "absolute",
          top: "-40px",
          left: "-40px",
          width: "calc(100% + 80px)",
          height: "calc(100% + 80px)",
          objectFit: "cover",
          objectPosition: "top center",
          filter: "blur(16px)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* Semi-transparent dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: "40rem", padding: "0 1.5rem", textAlign: "center" }}>
          <p
            style={{
              marginBottom: "1rem",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#8f9098",
            }}
          >
            Temporarily unavailable
          </p>
          <h1
            id="dossier-hold-title"
            style={{
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#f7f6f2",
              textWrap: "balance",
              margin: 0,
            }}
          >
            This page goes live on August 7.
          </h1>
        </div>
      </div>
    </div>
  );
}

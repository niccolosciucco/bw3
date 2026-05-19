import { useState } from "react"

export default function PanelCarousel({ profile }) {
  const [cur, setCur] = useState(0)

  const slides = [
    {
      cards: [
        {
          title: "Disponibile a lavorare",
          sub: `${profile.area} +1 altra · In sede · Ibrido · Da remoto`,
          link: "Mostra dettagli",
          hasClose: false,
        },
        {
          bold: "Fai sapere che stai facendo selezione",
          after: " e attrai candidati qualificati.",
          link: "Inizia",
          hasClose: true,
        },
      ],
    },
    {
      cards: [
        {
          title: "Aggiungi una sezione",
          sub: "Metti in evidenza i tuoi punti di forza.",
          link: "Aggiungi",
          hasClose: false,
        },
        {
          title: "Migliora il tuo profilo",
          sub: "Completa il profilo per aumentare la visibilità.",
          link: "Inizia",
          hasClose: false,
        },
      ],
    },
  ]

  const go = (n) => setCur((n + slides.length) % slides.length)

  return (
    <div style={{ position: "relative", padding: "0 20px" }}>
      {cur > 0 && (
        <button
          onClick={() => go(cur - 1)}
          className="rounded-circle p-0 position-absolute"
          style={{
            width: "36px",
            height: "36px",
            top: "50%",
            left: "-4px",
            transform: "translateY(-50%)",
            zIndex: 10,
            fontSize: "20px",
            border: "1px solid #e0e0e0",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            cursor: "pointer",
          }}
        >
          ‹
        </button>
      )}

      {cur < slides.length - 1 && (
        <button
          onClick={() => go(cur + 1)}
          className="rounded-circle p-0 position-absolute"
          style={{
            width: "36px",
            height: "36px",
            top: "50%",
            right: "-4px",
            transform: "translateY(-50%)",
            zIndex: 10,
            fontSize: "20px",
            border: "1px solid #e0e0e0",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            cursor: "pointer",
          }}
        >
          ›
        </button>
      )}

      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
            transform: `translateX(-${cur * 100}%)`,
          }}
        >
          {slides.map((slide, si) => (
            <div
              key={si}
              style={{
                minWidth: "100%",
                display: "flex",
                gap: "8px",
                boxSizing: "border-box",
              }}
            >
              {slide.cards.map((card, ci) => (
                <div
                  key={ci}
                  className="panel position-relative"
                  style={{ flex: 1 }}
                >
                  {card.bold ? (
                    <p className="small mb-1">
                      <strong>{card.bold}</strong>
                      {card.after}
                    </p>
                  ) : (
                    <p className="fw-semibold mb-1">{card.title}</p>
                  )}
                  {card.sub && (
                    <p className="text-secondary small mb-1">{card.sub}</p>
                  )}
                  <span className="text-primary small">{card.link}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center gap-1 mt-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => go(i)}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              cursor: "pointer",
              background: i === cur ? "#0a66c2" : "#ccc",
            }}
          />
        ))}
      </div>
    </div>
  )
}

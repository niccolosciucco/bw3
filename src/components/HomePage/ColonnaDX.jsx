import { Card, Button, ListGroup, Stack } from "react-bootstrap"
import { BsInfoSquareFill, BsChevronDown, BsChevronRight } from "react-icons/bs"
import SpanFooterDX from "./SpanFooterDX"
import { useState, useEffect } from "react"

const ColonnaDX = () => {
  /*const newsItems = [
    {
      id: 1,
      title: "Playatomic, Canva: cercasi country man...",
      time: "2 giorni fa",
      readers: "393 lettori",
    },
    {
      id: 2,
      title: "L'auto europea parla sempre più cinese",
      time: "2 giorni fa",
      readers: "369 lettori",
    },
    {
      id: 3,
      title: "Aumentano i consumi per cani e gatti",
      time: "2 giorni fa",
      readers: "104 lettori",
    },
    {
      id: 4,
      title: "Le nuove Top Voices di LinkedIn",
      time: "4 giorni fa",
      readers: "1312 lettori",
    },
    {
      id: 5,
      title: "Internazionali di Roma: vince Sinner",
      time: "2h fa",
      readers: "1237 lettori",
    },
  ]*/

  const seztioneNotizie = () => {
    const url = `https://api.currentsapi.services/v1/latest-news?language=it&apiKey=${API_KEY}`
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error("errore nel recupero notizie")
        }
      })
      .then((data) => {
        const primeCinque = data.news.slice(0, 5)
        setNewsItems(primeCinque)
      })
      .catch((err) => {
        console.log("errore", err)
      })
  }

  useEffect(() => {
    seztioneNotizie()
  }, [])

  const gamesItems = [
    {
      id: 1,
      name: "Patches #62",
      desc: "Riuscirai a vincere?",
      IconComponent: BsGrid3X3GapFill,
      color: "#f39c12",
    },
    {
      id: 2,
      name: "Zip #42",
      desc: "Completa il percorso",
      IconComponent: BsLink45Deg,
      color: "#e67e22",
    },
    {
      id: 3,
      name: "Mini Sudoku #280",
      desc: "Il gioco classico, in versione mini",
      IconComponent: Bs123,
      color: "#2ecc71",
    },
    {
      id: 4,
      name: "Tango #588",
      desc: "Armonizza la griglia",
      IconComponent: BsGrid1X2Fill,
      color: "#3498db",
    },
  ]

  return (
    <div
      style={{ maxWidth: "315px", width: "100%" }}
      className="mx-auto d-none d-lg-block"
    >
      {/* 1. SEZIONE LINKEDIN NOTIZIE */}
      <Card className="mb-2 shadow-sm">
        <Card.Body className="p-0">
          <div className="d-flex justify-content-between align-items-center my-2 px-3">
            <h5 className="mb-0 fw-bold fs-6 text-dark mt-2">
              LinkedIn Notizie
            </h5>
            <BsInfoSquareFill
              className="text-secondary mt-2"
              style={{ fontSize: "0.75rem", cursor: "pointer" }}
            />
          </div>
          <p
            className="text-muted fw-semibold my-2 px-3"
            style={{ fontSize: "0.8rem" }}
          >
            Storie principali
          </p>

          <ListGroup variant="flush" style={{ fontSize: "0.85rem" }}>
            {newsItems.map((item, index) => (
              <ListGroup.Item
                key={item.id || index}
                className="p-0 border-0 mb-2"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgb(232, 232, 232)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
                onClick={() =>
                  window.open(item.url, "_blank", "noopener,noreferrer")
                }
              >
                <div className="mb-1">
                  <div
                    className="fw-semibold text-dark text-truncate px-3"
                    style={{
                      lineHeight: "1.3",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="text-muted px-3"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {item.author || "fonte sconosciuta"} • {item.category}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Button
            variant="link"
            className="text-decoration-none p-0 fw-semibold text-secondary-emphasis d-flex align-items-center gap-1 mt-2 justify-content-start"
            style={{ fontSize: "0.8rem" }}
          >
            <span className="ps-3 mb-2">Mostra altre notizie</span>
            <BsChevronDown
              className="mb-2 mt-1"
              style={{ fontSize: "0.75rem" }}
              size={13}
            />
          </Button>
        </Card.Body>
      </Card>

      {/* 2. SEZIONE I ROMPICAPO DI OGGI */}
      <Card className="mb-2 shadow-sm">
        <Card.Body>
          <h5 className="fw-bold mb-3 fs-6 text-dark">I rompicapo di oggi</h5>

          <ListGroup variant="flush" style={{ fontSize: "0.85rem" }}>
            {gamesItems.map((game) => {
              const Icon = game.IconComponent
              return (
                <ListGroup.Item
                  key={game.id}
                  className="p-0 border-0 bg-transparent mb-3 d-flex align-items-center justify-content-between"
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-2 d-flex align-items-center justify-content-center text-white"
                      style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: game.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div
                      className="overflow-hidden"
                      style={{ maxWidth: "220px" }}
                    >
                      <div
                        className="fw-semibold text-dark text-truncate"
                        style={{ lineHeight: "1.2" }}
                      >
                        {game.name}
                      </div>
                      <div
                        className="text-muted text-truncate"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {game.desc}
                      </div>
                    </div>
                  </div>
                  <BsChevronRight
                    className="text-muted"
                    style={{ fontSize: "0.75rem" }}
                  />
                </ListGroup.Item>
              )
            })}
          </ListGroup>

          <Button
            variant="link"
            className="text-decoration-none p-0 fw-semibold text-secondary-emphasis d-flex align-items-center gap-1 mt-1 justify-content-start"
            style={{ fontSize: "0.8rem" }}
          >
            <span>Mostra altro</span>
            <BsChevronDown style={{ fontSize: "0.75rem" }} />
          </Button>
        </Card.Body>
      </Card>

      {/* 3. SEZIONE PROMOZIONALE */}
      <Card className="mb-2 shadow-sm overflow-hidden text-center bg-white">
        <div className="p-2 text-end text-muted" style={{ fontSize: "0.7rem" }}>
          <span className="fw-semibold">Promosso</span> •••
        </div>

        <Card.Body className="pt-0 px-3 pb-3" style={{ fontSize: "0.8rem" }}>
          <p className="text-secondary mb-3" style={{ fontSize: "0.75rem" }}>
            Guido, scopri le opportunità offerte da BRANDART
          </p>

          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-center align-items-center mb-3"
          >
            <img
              src="https://placecats.com/70/70"
              alt="User avatar"
              className="rounded-circle border"
              style={{ width: "64px", height: "64px", objectFit: "cover" }}
            />
            <div
              className="bg-dark rounded-2 d-flex align-items-center justify-content-center text-white fw-bold"
              style={{ width: "64px", height: "64px", fontSize: "0.65rem" }}
            >
              BRANDART
            </div>
          </Stack>

          <p
            className="fw-semibold text-dark mb-3"
            style={{ fontSize: "0.85rem" }}
          >
            Scopri le ultime offerte di lavoro e notizie
          </p>

          <Button
            variant="outline-primary"
            className="rounded-pill fw-semibold py-1 px-4 w-100"
            style={{ fontSize: "0.85rem", borderWidth: "1.5px" }}
          >
            Segui
          </Button>
        </Card.Body>
      </Card>

      {/* FOOTER DI SERVIZIO LINKEDIN */}
      <div
        className="text-center text-muted px-2 mt-3"
        style={{ fontSize: "0.7rem", lineHeight: "1.8" }}
      >
        <SpanFooterDX text="Informazioni" />
        <SpanFooterDX text="Accessibilità" />
        <SpanFooterDX text="Centro assistenza" />
        <SpanFooterDX text="Privacy e condizioni" />
        <SpanFooterDX text="Opzioni per gli annunci pubblicitari" />
        <SpanFooterDX text="Pubblicità" />
        <SpanFooterDX text="Servizi alle aziende" />
        <SpanFooterDX text="Scarica l'app LinkedIn" />
        <SpanFooterDX text="Altro" />
        <SpanFooterDX text="Informazioni" />
        <div
          className="fw-semibold mt-2 text-dark d-flex align-items-center justify-content-center gap-1"
          style={{ fontSize: "0.75rem" }}
        >
          <span
            className="text-primary fw-bold"
            style={{ letterSpacing: "-0.5px" }}
          >
            Linked
            <span
              className="bg-primary text-white px-1 rounded-1 ms-0.5"
              style={{ padding: "1px 3px" }}
            >
              in
            </span>
          </span>
          <span className="text-muted fw-normal">
            LinkedIn Corporation © 2026
          </span>
        </div>
      </div>
    </div>
  )
}

export default ColonnaDX

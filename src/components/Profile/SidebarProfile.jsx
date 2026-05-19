import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBhZGEzYjA2YmJlOTAwMTVkZWU1ODEiLCJpYXQiOjE3NzkwOTYxMjMsImV4cCI6MTc4MDMwNTcyM30.4JBZcE70K5YVN4QRpIVSD1AO8yNJrWtf7Q0WS-E2mtw"
const API_URL = "https://striveschool-api.herokuapp.com/api/profile/"
const HEADERS = { Authorization: `Bearer ${TOKEN}` }

export default function LinkedInProfileSidebar() {
  const [profile, setProfile] = useState(null)
  const [viewed, setViewed] = useState([])

  useEffect(() => {
    fetch(API_URL + "me", { headers: HEADERS })
      .then((res) => res.json())
      .then((me) => {
        setProfile(me)
        fetch(API_URL, { headers: HEADERS })
          .then((res) => res.json())
          .then((all) =>
            setViewed(all.filter((p) => p._id !== me._id).slice(0, 5)),
          )
      })
  }, [])

  return (
    <>
      <div className="p-3 ">
        <section className=" p-3 border border-2 rounded-2 mb-3">
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <strong>Lingua del profilo</strong>
              <i className="bi bi-pencil" />
            </div>
            <span className="text-muted">Italiano</span>
          </div>
          <hr />

          <div className="mb-2 ">
            <div className="d-flex justify-content-between">
              <strong>Profilo pubblico e URL</strong>
              <i className="bi bi-pencil" />
            </div>
            <span className="text-primary small">
              www.linkedin.com/in/
              {profile?.name?.toLowerCase()}
            </span>
          </div>
        </section>
        <div className="card mb-3 rounded-0 border-2">
          <div className="card-body p-1 mt-2">
            <div
              className="position-relative bg-secondary rounded mb-2"
              style={{ height: 80 }}
            >
              <div
                className="bg-primary rounded z-1  position-absolute"
                style={{ width: 60, height: 60, top: 30, left: 15 }}
              />
              <span className="position-absolute top-0 end-0  border border-2 rounded-4 bg-light">
                Promosso <i className="bi bi-three-dots" />
              </span>
            </div>
            <div>
              <p className="fw-bold mb-1">Outreach</p>
              <p className="mb-1 small">
                Coach Improve Your Sales Team's Performance
              </p>
              <p className="text-success small mb-1">
                <i className="bi bi-recycle" /> Workflows make winning
                repeatable <i className="bi bi-recycle" />
              </p>
              <p className="text-muted small">Anche Haroon segue</p>
              <button className="btn btn-outline-primary rounded-pill w-100">
                Segui
              </button>
            </div>
          </div>
        </div>
        <section className="border border-2 p-2 rounded-3">
          <strong>Altri profili consultati</strong>
          <p className="text-muted small mb-2">Visibile solo a te</p>

          {viewed.map((p) => (
            <div
              key={p._id}
              className="d-flex align-items-center gap-2 mb-3 border-bottom ms-2"
            >
              <div
                className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white flex-shrink-0"
                style={{ width: 48, height: 48 }}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="rounded-circle w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <i className="bi bi-person-fill fs-4" />
                )}
              </div>
              <div>
                <div className="fw-semibold small ">{p.name || "Utente"}</div>
                <div className="text-muted small ">
                  {p.title || p.area || ""}
                </div>
                <button className="btn btn-outline-secondary btn-sm rounded-pill mt-1 mb-2">
                  Visualizza
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}

import { useEffect, useState } from "react"
import "../../style/ProfileHeader.css"

export default function ProfileHeader() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://striveschool-api.herokuapp.com/api/profile/",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBhZGEzYjA2YmJlOTAwMTVkZWU1ODEiLCJpYXQiOjE3NzkwOTYxMjMsImV4cCI6MTc4MDMwNTcyM30.4JBZcE70K5YVN4QRpIVSD1AO8yNJrWtf7Q0WS-E2mtw",
            },
          },
        )
        const data = await res.json()
        const user = data.find((p) => p.username === "guido_la_vespa")
        setProfile(user)
      } catch (error) {
        console.error("Errore nel fetch profilo:", error)
      }
    }
    fetchProfile()
  }, [])

  if (!profile) return <p>Caricamento profilo...</p>

  return (
    <>
      <div className="card profile-card mx-auto">
        <div className="profile-cover position-relative">
          <button className="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M21.13 2.86a3 3 0 0 0-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 0 0 0-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
            </svg>
          </button>
        </div>

        <div className="px-3 position-relative">
          <div className="profile-avatar d-flex align-items-center justify-content-center">
            <img
              src={profile.image}
              alt={`${profile.name} ${profile.surname}`}
              className="img-fluid rounded-circle"
            />
          </div>
        </div>

        <div className="card-body">
          <h5 className="d-flex align-items-center gap-2 mb-1">
            {profile.name} {profile.surname}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="#0a66c2">
              <path d="M10 1.5L12.39 6.24L17.72 7.02L13.86 10.78L14.77 16.09L10 13.57L5.23 16.09L6.14 10.78L2.28 7.02L7.61 6.24L10 1.5Z" />
              <path
                d="M7.5 10L9.5 12L12.5 8.5"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </h5>

          <p className="text-muted mb-1">
            {profile.title} · {profile.bio}
          </p>
          <p className="text-secondary mb-1">
            {profile.area} ·{" "}
            <span className="text-primary">Informazioni di contatto</span>
          </p>
          <p className="fw-semibold text-primary mb-2">
            {profile.followers || 0} follower · {profile.connections || 0}{" "}
            collegamenti
          </p>

          {profile.university && (
            <div className="d-flex align-items-center gap-2 mb-2">
              <div className="univ-logo">
                {profile.universityInitials || ""}
              </div>
              <span className="text-secondary small">{profile.university}</span>
            </div>
          )}

          <div className="d-flex flex-wrap gap-2 mb-3">
            <button className="btn btn-primary btn-sm rounded-pill">
              Disponibile per
            </button>
            <button className="btn btn-outline-secondary btn-sm rounded-pill">
              Aggiungi sezione
            </button>
            <button className="btn btn-outline-secondary btn-sm rounded-pill">
              Migliora profilo
            </button>
            <button className="btn btn-outline-secondary btn-sm rounded-pill">
              Risorse
            </button>
          </div>

          <div className="row g-2">
            <div className="col-6">
              <div className="panel position-relative">
                <p className="fw-semibold mb-1">Disponibile a lavorare</p>
                <p className="text-secondary small mb-1">
                  {profile.area} + altre · In sede · Ibrido · Da remoto
                </p>
                <span className="text-primary small">Mostra dettagli</span>
              </div>
            </div>

            <div className="col-6">
              <div className="panel position-relative">
                <button className="btn btn-link p-0 text-secondary border-0 fs-6 position-absolute top-0 end-0">
                  ✕
                </button>
                <p className="small mb-1">
                  <strong>Fai sapere che stai facendo selezione</strong> e
                  attrai candidati qualificati.
                </p>
                <span className="text-primary small">Inizia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card profile-card mt-3 mx-auto">
        <div className="card-body">
          <h6 className="fw-semibold mb-1">Consigliato per te</h6>
          <p className="text-secondary small mb-2">Visibile solo a te</p>

          <div className="d-flex align-items-center gap-2 mb-2">
            <img
              src="https://placewaifu.com/image/50"
              alt="profile suggestion"
              className="rounded-circle"
              width="40"
              height="40"
            />
            <div>
              <p className="small mb-1">
                Fai sapere alla tua rete per quali ruoli e aziende sei
                disponibile
              </p>
              <p className="text-secondary small">
                Pubblicare può aiutarti a ottenere più visualizzazioni del
                profilo
              </p>
            </div>
          </div>

          <button className="btn btn-outline-primary btn-sm rounded-pill">
            Crea un post
          </button>
        </div>
      </div>
    </>
  )
}

import { useEffect, useState } from "react"
import ExperienceSection from "./ExperiencesProfile.jsx"
import "../../style/ProfileHeader.css"
import PanelCarousel from "./leftside.jsx/carousel"
import EditProfileModal from "../Profile/leftside.jsx/EditProfileModal"

export default function ProfileHeader() {
  const [profile, setProfile] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/me",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBhZGEzYjA2YmJlOTAwMTVkZWU1ODEiLCJpYXQiOjE3NzkwOTYxMjMsImV4cCI6MTc4MDMwNTcyM30.4JBZcE70K5YVN4QRpIVSD1AO8yNJrWtf7Q0WS-E2mtw",
          },
        },
      )
      if (res.ok) {
        const myProfile = await res.json()
        setProfile(myProfile)
      } else {
        console.error("Errore nel recupero profilo personale")
      }
    } catch (error) {
      console.error("Errore nel fetch profilo:", error)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    fetchProfile()
  }, [])

  const handleProfileUpdate = async () => {
    await fetchProfile()
  }

  if (!profile) return <p>Caricamento profilo...</p>

  return (
    <>
      <div className="card profile-card ">
        <div className="profile-cover position-relative">
          <button className="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="camera-small"
              fill="currentColor"
              aria-hidden="true"
              data-supported-dps="16x16"
              viewBox="0 0 16 16"
              data-token-id="525"
              width="16"
              height="16"
              className="_3edc2961 _4cecf8c6 df2b129f _680a7526 c6867557 _824c8c41"
              role="img"
              aria-label=""
            >
              <path d="M10 9a2 2 0 1 1-2-2 2 2 0 0 1 2 2m5-2.5V14H1V6.5A2.5 2.5 0 0 1 3.5 4h.75L5 2h6l.75 2h.75A2.5 2.5 0 0 1 15 6.5M11 9a3 3 0 1 0-3 3 3 3 0 0 0 3-3"></path>
            </svg>
          </button>
        </div>

        <div className="px-3 position-relative mt-3">
          <div className="profile-avatar d-flex align-items-center justify-content-center">
            <img
              src={profile.image}
              alt={`${profile.name} ${profile.surname}`}
              className="img-fluid rounded-circle"
            />
            <button
              className="btn btn-light btn-sm rounded-circle position-absolute bottom-0 end-0 translate-middle mt-5"
              onClick={() => setIsEditModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path d="M21.13 2.86a3 3 0 0 0-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 0 0 0-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
              </svg>
            </button>
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
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a66c2"
              strokeWidth="2"
              className="ms-1"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </p>
          <p className="fw-semibold text-primary mb-2">
            {profile.followers || 250} follower · {profile.connections || 88}{" "}
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
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="ms-1"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button className="btn btn-outline-secondary btn-sm rounded-pill">
              Aggiungi sezione
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="ms-1"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button className="btn btn-outline-secondary btn-sm rounded-pill">
              Migliora profilo
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="ms-1"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
            <button className="btn btn-outline-secondary btn-sm rounded-pill">
              Risorse
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="ms-1"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.03.03A10 10 0 0 0 12 17.66a10 10 0 0 0 6.37-2.63z" />
              </svg>
            </button>
          </div>

          <div className="row g-2">
            <PanelCarousel profile={profile} />
          </div>
        </div>
      </div>

      <div className="card profile-card mt-3 mx-auto">
        <div className="card-body">
          <h6 className="fw-semibold mb-1">Consigliato per te</h6>
          <p className="text-secondary small mb-2">Visibile solo a te</p>

          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="position-relative">
              <img
                src="https://placewaifu.com/image/50"
                alt="profile suggestion"
                className="rounded-circle"
                width="40"
                height="40"
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#0a66c2"
                className="position-absolute bottom-0 end-0 bg-white rounded-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
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
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="ms-1"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>

      <div className="card profile-card mx-auto mt-3">
        <div className="card-body">
          <h6 className="fw-semibold mb-1">Analisi</h6>
          <p className="text-secondary small mb-3">Visibile solo a te</p>

          <div className="row g-3">
            <div className="col-4">
              <div className="analytics-panel text-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                  className="mx-auto mb-2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <p className="fw-semibold mb-1">
                  0 visualizzazioni del profilo
                </p>
                <p className="text-secondary small">
                  Aggiorna il tuo profilo per attrarre visitatori
                </p>
              </div>
            </div>

            <div className="col-4">
              <div className="analytics-panel text-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                  className="mx-auto mb-2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="2.18" />
                  <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" />
                </svg>
                <p className="fw-semibold mb-1">0 impressioni dei post</p>
                <p className="text-secondary small mb-1">
                  Crea un post per aumentare l'interesse
                </p>
                <p className="text-secondary small">Ultimi 7 giorni</p>
              </div>
            </div>

            <div className="col-4">
              <div className="analytics-panel text-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                  className="mx-auto mb-2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <p className="fw-semibold mb-1">0 comparse nelle ricerche</p>
                <p className="text-secondary small">
                  Aggiorna il tuo profilo per comparire di più nei risultati di
                  ricerca
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-2">
            <span className="text-primary small">Mostra tutto →</span>
          </div>
        </div>
      </div>

      <div className="card profile-card mx-auto mt-3">
        <div className="card-body pb-0">
          <div className="d-flex align-items-start justify-content-between">
            <div>
              <h6 className="fw-semibold mb-1">Attività</h6>
              <span className="linkedin-follower fw-semibold small">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="me-1"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                0 follower
              </span>
              <p className="fw-semibold mb-0 mt-2" style={{ fontSize: "14px" }}>
                Non hai ancora pubblicato nulla
              </p>
              <p className="text-secondary mb-0" style={{ fontSize: "14px" }}>
                I post che condividi appariranno qui
              </p>
            </div>
            <div className="d-flex align-items-center gap-2 flex-shrink-0">
              <button className="btn linkedin-btn-post">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="me-1"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Crea un post
              </button>
              <button className="btn btn-link p-1 text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path d="M21.13 2.86a3 3 0 0 0-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 0 0 0-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <hr className="mt-3 mb-0" />
        <div className="card-footer bg-white border-0 text-center py-2">
          <a
            href="#"
            className="mostra-tutto fw-semibold text-decoration-none small"
          >
            Mostra tutto →
          </a>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onUpdate={handleProfileUpdate}
      />
      <div className="mt-3">
        <ExperienceSection />
      </div>
    </>
  )
}

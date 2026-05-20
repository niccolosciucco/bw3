import { useState } from "react"

const ProfileCover = ({ currentCoverImage, onCoverUpdate }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [coverImage, setCoverImage] = useState(currentCoverImage)
  const [showImageGallery, setShowImageGallery] = useState(false)

  const presetImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop", // Montagna
      name: "Montagna",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=400&fit=crop", // Foresta
      name: "Foresta",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=400&fit=crop", // Spiaggia
      name: "Spiaggia",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=400&fit=crop", // Natura
      name: "Natura",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=400&fit=crop", // Foresta pluviale
      name: "Foresta Pluviale",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&h=400&fit=crop", // Deserto
      name: "Deserto",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&h=400&fit=crop", // Città
      name: "Città",
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=400&fit=crop", // Oceano
      name: "Oceano",
    },
  ]

  const handleAddCoverImage = () => {
    setShowOptions(false)
    setShowModal(true)
    setShowImageGallery(false)
  }

  const handleUploadImage = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const newImage = event.target.result
          setCoverImage(newImage)
          onCoverUpdate(newImage)
          setShowModal(false)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleSelectPresetImage = (imageUrl) => {
    fetch(imageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const newImage = event.target.result
          setCoverImage(newImage)
          onCoverUpdate(newImage)
          setShowModal(false)
          setShowImageGallery(false)
        }
        reader.readAsDataURL(blob)
      })
      .catch((error) => {
        console.error("Errore nel caricamento immagine:", error)

        setCoverImage(imageUrl)
        onCoverUpdate(imageUrl)
        setShowModal(false)
        setShowImageGallery(false)
      })
  }

  return (
    <>
      <div className="profile-cover position-relative">
        <div
          style={{
            height: "164px",
            backgroundColor: "#f0f2f5",
            backgroundImage: coverImage ? `url(${coverImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
            position: "relative",
          }}
        >
          <button
            className="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center"
            onClick={() => setShowOptions(!showOptions)}
            style={{ width: "36px", height: "36px", zIndex: 10 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              width="18"
              height="18"
            >
              <path d="M10 9a2 2 0 1 1-2-2 2 2 0 0 1 2 2m5-2.5V14H1V6.5A2.5 2.5 0 0 1 3.5 4h.75L5 2h6l.75 2h.75A2.5 2.5 0 0 1 15 6.5M11 9a3 3 0 1 0-3 3 3 3 0 0 0 3-3"></path>
            </svg>
          </button>
        </div>

        {showOptions && (
          <>
            <div
              onClick={() => setShowOptions(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 998,
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "55px",
                right: "10px",
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 999,
                width: "280px",
                overflow: "hidden",
              }}
            >
              <div
                onClick={handleAddCoverImage}
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  borderBottom: "1px solid #e9ecef",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8f9fa")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M10 9a2 2 0 1 1-2-2 2 2 0 0 1 2 2m5-2.5V14H1V6.5A2.5 2.5 0 0 1 3.5 4h.75L5 2h6l.75 2h.75A2.5 2.5 0 0 1 15 6.5M11 9a3 3 0 1 0-3 3 3 3 0 0 0 3-3"></path>
                </svg>
                <div>
                  <div style={{ fontWeight: 500 }}>
                    Aggiungi immagine di copertina
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "12px 16px",
                  opacity: 0.6,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  backgroundColor: "#fafafa",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="#0a66c2">
                  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 12.5A5.5 5.5 0 1 1 8 2.5a5.5 5.5 0 0 1 0 11Z" />
                  <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
                </svg>
                <div>
                  <div style={{ fontWeight: 500 }}>
                    Crea una presentazione Premium
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c757d" }}>
                    Fai un'ottima prima impressione usando fino a 5 immagini
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#0a66c2",
                      marginTop: "6px",
                      fontWeight: 500,
                    }}
                  >
                    🔒 Premium
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {showModal && !showImageGallery && (
        <>
          <div
            onClick={() => setShowModal(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 9999,
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "16px",
              width: "90%",
              maxWidth: "500px",
              zIndex: 10000,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                padding: "24px 24px 16px 24px",
                borderBottom: "1px solid #e9ecef",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
                Aggiungi un'immagine di copertina
              </h2>
            </div>

            <div style={{ padding: "24px" }}>
              <div
                onClick={handleUploadImage}
                style={{
                  padding: "16px",
                  border: "1px solid #e9ecef",
                  borderRadius: "12px",
                  marginBottom: "16px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0a66c2"
                  e.currentTarget.style.backgroundColor = "#f0f7ff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef"
                  e.currentTarget.style.backgroundColor = "white"
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: "8px" }}>
                  Carica la tua immagine
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  Mostra la tua personalità, i tuoi interessi, il tuo lavoro o
                  istantanee del tuo team
                </div>
              </div>

              <div
                onClick={() => setShowImageGallery(true)}
                style={{
                  padding: "16px",
                  border: "1px solid #e9ecef",
                  borderRadius: "12px",
                  marginBottom: "16px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0a66c2"
                  e.currentTarget.style.backgroundColor = "#f0f7ff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef"
                  e.currentTarget.style.backgroundColor = "white"
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: "8px" }}>
                  Scegli un'immagine dalla galleria
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  Seleziona tra le immagini disponibili
                </div>
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginBottom: "24px",
                }}
              >
                Un'immagine di copertina può farti risaltare.{" "}
                <a
                  href="#"
                  style={{ color: "#0a66c2", textDecoration: "none" }}
                >
                  Per saperne di più
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {showModal && showImageGallery && (
        <>
          <div
            onClick={() => setShowImageGallery(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 9999,
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "16px",
              width: "90%",
              maxWidth: "800px",
              maxHeight: "80vh",
              zIndex: 10000,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #e9ecef",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
                Scegli un'immagine di copertina
              </h2>
              <button
                onClick={() => setShowImageGallery(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                padding: "24px",
                overflowY: "auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              {presetImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => handleSelectPresetImage(image.url)}
                  style={{
                    cursor: "pointer",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "2px solid transparent",
                    transition: "all 0.2s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#0a66c2"
                    e.currentTarget.style.transform = "scale(1.02)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: 500,
                      backgroundColor: "white",
                    }}
                  >
                    {image.name}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid #e9ecef",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowImageGallery(false)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#e9ecef",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Annulla
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProfileCover

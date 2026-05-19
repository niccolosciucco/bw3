import { useState } from "react"

export default function EditProfileImage({ profile, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSaveImage = async () => {
    if (!imageUrl) {
      alert("Inserisci un URL immagine")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBhZGEzYjA2YmJlOTAwMTVkZWU1ODEiLCJpYXQiOjE3NzkwOTYxMjMsImV4cCI6MTc4MDMwNTcyM30.4JBZcE70K5YVN4QRpIVSD1AO8yNJrWtf7Q0WS-E2mtw",
          },
          body: JSON.stringify({
            name: profile.name,
            surname: profile.surname,
            title: profile.title,
            bio: profile.bio,
            area: profile.area,
            image: imageUrl,
          }),
        },
      )

      if (response.ok) {
        await onUpdate()
        setIsModalOpen(false)
        setImageUrl("")
        alert("Immagine aggiornata!")
      } else {
        const error = await response.text()
        alert("Errore: " + error)
      }
    } catch (error) {
      console.error("Errore:", error)
      alert("Errore di connessione")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        className="btn btn-light btn-sm rounded-circle position-absolute bottom-0 end-0 translate-middle mt-5"
        onClick={() => setIsModalOpen(true)}
        style={{ zIndex: 10 }}
      >
        📷
      </button>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "450px",
              padding: "20px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 20px 0" }}>Modifica immagine profilo</h3>

            <input
              type="text"
              placeholder="Incolla URL immagine qui"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "14px",
                marginBottom: "16px",
                boxSizing: "border-box",
              }}
            />

            {imageUrl && (
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: "8px 20px",
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Annulla
              </button>
              <button
                onClick={handleSaveImage}
                disabled={loading}
                style={{
                  padding: "8px 20px",
                  background: "#0a66c2",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                {loading ? "Salvataggio..." : "Salva"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

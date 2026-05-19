import { useState, useEffect } from "react"

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    surname: profile?.surname || "",
    title: profile?.title || "",
    bio: profile?.bio || "",
    area: profile?.area || "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line
      setFormData({
        name: profile.name || "",
        surname: profile.surname || "",
        title: profile.title || "",
        bio: profile.bio || "",
        area: profile.area || "",
      })
    }
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
          body: JSON.stringify(formData),
        },
      )

      if (response.ok) {
        await onUpdate()
        onClose()
      } else {
        alert("Errore nel salvataggio. Verifica i dati o l'endpoint.")
        console.error("Errore API:", await response.text())
      }
    } catch (error) {
      console.error("Errore di rete:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Modifica profilo</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Cognome</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Titolo professionale</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Biografia</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Area/Luogo</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annulla
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? "Salvataggio..." : "Salva"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

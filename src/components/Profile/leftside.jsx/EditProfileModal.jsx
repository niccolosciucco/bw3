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
    image: profile?.image || "",
  })
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(profile?.image || "")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageUrl, setImageUrl] = useState(profile?.image || "")

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line
      setFormData({
        name: profile.name || "",
        surname: profile.surname || "",
        title: profile.title || "",
        bio: profile.bio || "",
        area: profile.area || "",
        image: profile.image || "",
      })
      setImagePreview(profile.image || "")
      setImageUrl(profile.image || "")
    }
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Per favore, seleziona un file immagine valido")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("L'immagine non può superare i 5MB")
        return
      }

      setUploadingImage(true)

      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrlResult = event.target.result
        setImagePreview(imageUrlResult)
        setImageUrl(imageUrlResult)
        setFormData({
          ...formData,
          image: imageUrlResult,
        })
        setUploadingImage(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlChange = (e) => {
    const url = e.target.value
    setImageUrl(url)
    setImagePreview(url)
    setFormData({
      ...formData,
      image: url,
    })
  }

  const handleRemoveImage = () => {
    setImagePreview("")
    setImageUrl("")
    setFormData({
      ...formData,
      image: "",
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
          body: JSON.stringify({
            name: formData.name,
            surname: formData.surname,
            title: formData.title,
            bio: formData.bio,
            area: formData.area,
            image: formData.image,
          }),
        },
      )

      if (response.ok) {
        await onUpdate()
        onClose()
      } else {
        alert("Errore nel salvataggio")
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
              <label>Immagine profilo</label>
              <div className="profile-image-section">
                <div className="current-image">
                  {imagePreview ? (
                    <div className="image-preview-container">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="image-preview"
                      />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={handleRemoveImage}
                        disabled={uploadingImage}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="no-image">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="#ccc"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      <p>Nessuna immagine</p>
                    </div>
                  )}
                </div>

                <div className="image-upload-buttons">
                  <label className="btn-upload-image">
                    {uploadingImage ? "Caricamento..." : "📸 Carica da file"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>

                <div className="image-url-input" style={{ marginTop: "12px" }}>
                  <input
                    type="text"
                    placeholder="O inserisci URL immagine"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <p className="image-hint">
                  Carica un file o inserisci un URL immagine (JPG, PNG, GIF. Max
                  5MB)
                </p>
              </div>
            </div>

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

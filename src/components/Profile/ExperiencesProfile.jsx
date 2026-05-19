import { useState, useEffect, useCallback } from "react"
import { Button, Modal, Form, Spinner } from "react-bootstrap"

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBhZGEzYjA2YmJlOTAwMTVkZWU1ODEiLCJpYXQiOjE3NzkwOTYxMjMsImV4cCI6MTc4MDMwNTcyM30.4JBZcE70K5YVN4QRpIVSD1AO8yNJrWtf7Q0WS-E2mtw"
const BASE_URL = "https://striveschool-api.herokuapp.com/api/profile"
const USER_ID = "6a0ada3b06bbe90015dee581"

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingExp, setEditingExp] = useState(null)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [form, setForm] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
  })

  const authHeaders = {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  }

  const fetchExperiences = useCallback(() => {
    setLoading(true)
    fetch(`${BASE_URL}/${USER_ID}/experiences`, { headers: authHeaders })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero")
        return res.json()
      })
      .then((data) => {
        setExperiences(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        alert("Impossibile caricare le esperienze")
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExperiences()
  }, [fetchExperiences])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.role || !form.company || !form.startDate) {
      alert("Compila tutti i campi obbligatori (*)")
      return
    }

    setSaving(true)
    const method = editingExp ? "PUT" : "POST"
    const url = editingExp
      ? `${BASE_URL}/${USER_ID}/experiences/${editingExp._id}`
      : `${BASE_URL}/${USER_ID}/experiences`

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Errore salvataggio")
      const savedExp = await res.json()

      if (imageFile) {
        const fd = new FormData()
        fd.append("experience", imageFile)
        await fetch(
          `${BASE_URL}/${USER_ID}/experiences/${savedExp._id}/picture`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${TOKEN}` },
            body: fd,
          },
        )
      }

      setShowModal(false)
      fetchExperiences()
      alert(editingExp ? "Esperienza modificata" : "Esperienza aggiunta")
    } catch (err) {
      console.error(err)
      alert("Errore durante il salvataggio")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = (id) => {
    if (!window.confirm("Eliminare questa esperienza?")) return
    fetch(`${BASE_URL}/${USER_ID}/experiences/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => {
        if (res.status === 204 || res.ok) {
          fetchExperiences()
          alert("Esperienza eliminata")
        } else {
          throw new Error()
        }
      })
      .catch(() => alert("Errore durante l'eliminazione"))
  }

  const openAddModal = () => {
    setEditingExp(null)
    setForm({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      area: "",
    })
    setImageFile(null)
    setShowModal(true)
  }

  const openEditModal = (exp) => {
    setEditingExp(exp)
    setForm({
      role: exp.role || "",
      company: exp.company || "",
      startDate: exp.startDate?.slice(0, 10) || "",
      endDate: exp.endDate?.slice(0, 10) || "",
      description: exp.description || "",
      area: exp.area || "",
    })
    setImageFile(null)
    setShowModal(true)
  }

  return (
    <div className="bg-white rounded-3 shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Esperienze</h5>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={openAddModal}
          className="rounded-pill"
        >
          + Aggiungi
        </Button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}

      {!loading && experiences.length === 0 && (
        <p className="text-muted text-center py-4">
          Nessuna esperienza. Aggiungi la tua prima esperienza lavorativa.
        </p>
      )}

      {experiences.map((exp, idx) => (
        <div key={exp._id}>
          <div className="d-flex gap-3 py-3">
            <div
              className="bg-light border rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: "56px", height: "56px" }}
            >
              {exp.image ? (
                <img
                  src={exp.image}
                  alt="logo azienda"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ) : (
                <span style={{ fontSize: "1.5rem" }}>🏢</span>
              )}
            </div>

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="fw-bold mb-0">{exp.role}</h6>
                  <div className="text-dark">{exp.company}</div>
                  <div className="small text-muted">
                    {exp.startDate?.slice(0, 10)} –{" "}
                    {exp.endDate?.slice(0, 10) || "Presente"}
                  </div>
                  {exp.area && (
                    <div className="small text-muted mt-1">📍 {exp.area}</div>
                  )}
                </div>
                <div className="d-flex gap-1">
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => openEditModal(exp)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => handleDelete(exp._id)}
                  >
                    🗑️
                  </Button>
                </div>
              </div>
              {exp.description && (
                <p className="small mt-2 mb-0 text-secondary">
                  {exp.description}
                </p>
              )}
            </div>
          </div>
          {idx < experiences.length - 1 && <hr className="my-0" />}
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingExp ? "Modifica esperienza" : "Aggiungi esperienza"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave} id="exp-form">
            <Form.Group className="mb-3">
              <Form.Label>Ruolo *</Form.Label>
              <Form.Control
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="es. Full Stack Developer"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Azienda *</Form.Label>
              <Form.Control
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="es. LinkedIn"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Località</Form.Label>
              <Form.Control
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                placeholder="es. Milano, Italia"
              />
            </Form.Group>
            <div className="d-flex gap-2 mb-3">
              <Form.Group className="flex-grow-1">
                <Form.Label>Data inizio *</Form.Label>
                <Form.Control
                  type="date"
                  required
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="flex-grow-1">
                <Form.Label>Data fine</Form.Label>
                <Form.Control
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                />
                <Form.Text muted>Lascia vuoto se attuale</Form.Text>
              </Form.Group>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Descrivi le tue mansioni..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Logo azienda</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button
            type="submit"
            form="exp-form"
            variant="primary"
            disabled={saving}
          >
            {saving ? <Spinner size="sm" animation="border" /> : "Salva"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

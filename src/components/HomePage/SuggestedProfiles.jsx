import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Row, Col, Modal, Spinner } from "react-bootstrap"

const SuggestedProfiles = () => {
  const [profiles, setProfiles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalExperiences, setModalExperiences] = useState([])
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile?search=a", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const casual = [...data].sort(() => Math.random() - 0.5)
        setProfiles(casual.slice(0, 4))
      })
      .catch((err) => console.error(err))
  }, [token])

  const handleViewProfile = (id) => {
    setShowModal(true)
    setModalLoading(true)
    setModalExperiences([])

    fetch(`https://striveschool-api.herokuapp.com/api/profile/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedProfile(data)
        setModalLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setModalLoading(false)
      })

    fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${id}/experiences`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((res) => res.json())
      .then((data) => setModalExperiences(data))
      .catch((err) => console.error(err))
  }

  return (
    <>
      <div className="card p-3 rounded-4 mb-3">
        <h6 className="fw-bold mb-3">Profili consigliati</h6>

        <Row xs={1} sm={2} md={4} className="g-2">
          {profiles.map((prof) => (
            <Col key={prof._id}>
              <div
                className="card text-center p-2 h-100 border d-flex flex-column"
                style={{ cursor: "pointer" }}
                onClick={() => handleViewProfile(prof._id)}
              >
                <img
                  src={
                    prof.image ||
                    "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
                  }
                  alt={prof.name}
                  className="rounded-circle mx-auto mb-2"
                  style={{ width: "48px", height: "48px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
                  }}
                />
                <p className="fw-semibold mb-0" style={{ fontSize: "0.8rem" }}>
                  {prof.name} {prof.surname}
                </p>
                <p className="text-muted mb-2" style={{ fontSize: "0.7rem" }}>
                  {prof.title || "Disoccupato"}
                </p>
                <button
                  className="btn btn-outline-primary btn-sm rounded-pill w-100 mt-auto"
                  style={{ fontSize: "0.75rem" }}
                  onClick={(e) => e.stopPropagation()} // evita di aprire il modale
                >
                  <i className="bi bi-person-plus me-1"></i>
                  Collegati
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* MODALE */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalLoading && (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          {!modalLoading && selectedProfile && (
            <div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={
                    selectedProfile.image ||
                    "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
                  }
                  alt={selectedProfile.name}
                  className="rounded-circle"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
                  }}
                />
                <div>
                  <h5 className="mb-0">
                    {selectedProfile.name} {selectedProfile.surname}
                  </h5>
                  <p className="text-muted mb-0">{selectedProfile.title}</p>
                  <p className="text-secondary small mb-0">
                    {selectedProfile.area}
                  </p>
                </div>
              </div>

              {selectedProfile.bio && (
                <p className="text-secondary">{selectedProfile.bio}</p>
              )}

              {modalExperiences.length > 0 && (
                <>
                  <hr />
                  <h6 className="fw-semibold mb-3">Esperienze</h6>
                  {modalExperiences.map((exp) => (
                    <div key={exp._id} className="d-flex gap-3 mb-3">
                      <div
                        className="bg-light border rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: "48px", height: "48px" }}
                      >
                        {exp.image ? (
                          <img
                            src={exp.image}
                            alt="logo"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        ) : (
                          <i className="bi bi-building fs-5"></i>
                        )}
                      </div>
                      <div>
                        <p className="fw-bold mb-0">{exp.role}</p>
                        <p className="mb-0">{exp.company}</p>
                        <p className="text-muted small mb-0">
                          {exp.startDate?.slice(0, 10)} –{" "}
                          {exp.endDate?.slice(0, 10) || "Presente"}
                        </p>
                        {exp.description && (
                          <p className="small text-secondary mt-1 mb-0">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SuggestedProfiles

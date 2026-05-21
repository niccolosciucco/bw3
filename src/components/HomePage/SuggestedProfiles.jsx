import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router"
import { Row, Col } from "react-bootstrap"

const SuggestedProfiles = () => {
  const [profiles, setProfiles] = useState([])
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

  return (
    <div className="card p-3 rounded-4 mb-3">
      <h6 className="fw-bold mb-3">Profili consigliati</h6>

      <Row xs={1} sm={2} md={4} className="g-2">
        {profiles.map((prof) => (
          <Col key={prof._id}>
            <Link
              to={`/profile/${prof._id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card text-center p-2 h-100 border d-flex justify-content-between">
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
                  className="btn btn-outline-primary btn-sm rounded-pill w-100"
                  style={{ fontSize: "0.75rem" }}
                >
                  <i className="bi bi-person-plus me-1"></i>
                  Collegati
                </button>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SuggestedProfiles

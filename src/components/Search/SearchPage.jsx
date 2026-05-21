import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container, Row, Col, Card, Modal, Form, Spinner } from "react-bootstrap"
import { Link, useSearchParams } from "react-router"
import NavbarL from "../Navbar/NavbarL" 

const SearchPage = () => {
    const [profiles, setProfiles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q") || "" 
    const profileId = searchParams.get("profile")      
    const { token } = useSelector((state) => state.auth)
    const [showModal, setShowModal] = useState(false)
    const [selectedProfile, setSelectedProfile] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)
    const [modalExperiences, setModalExperiences] = useState([])


    useEffect(() => {
        if (!query) {
            fetch("https://striveschool-api.herokuapp.com/api/profile?search=a", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => res.json())
                .then((data) => setProfiles(data))
                .catch((err) => console.error(err))
            return
        }

        setIsLoading(true)
        fetch(`https://striveschool-api.herokuapp.com/api/profile?search=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setProfiles(data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setIsLoading(false)
            })
    }, [token, query])

    const pageTitle = query ? `Risultati per "${query}"` : " Persone che potresti conoscere " 

    const handleViewProfile = (id) => {
        setShowModal(true)
        setModalLoading(true)
        setModalExperiences([])

        fetch(`https://striveschool-api.herokuapp.com/api/profile/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
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

        fetch(`https://striveschool-api.herokuapp.com/api/profile/${id}/experiences`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setModalExperiences(data))
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        if (profileId) {
            handleViewProfile(profileId)
        }
    }, [profileId])

    return (
        <>
            <NavbarL />
            <Container>
                <h1>{pageTitle}</h1>
                {isLoading && <p>Caricamento...</p>}
                <Row xs={1} md={2} lg={3} className="g-3">
                    {profiles.map((prof) => (
                        <Col key={prof._id}>
                            <Card className="mb-3 h-100 d-flex flex-column">
                                <Card.Body className="d-flex flex-column">
                                    <img
                                        src={prof.image || "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"}
                                        alt={prof.name}
                                        style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", marginBottom: "8px" }}
                                        onError={(e) => {
                                            e.target.src = "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
                                        }}
                                    />
                                    <Card.Title>{prof.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{prof.surname}</Card.Subtitle>
                                    <Card.Text>{prof.title}</Card.Text>
                                    <Card.Text>{prof.area}</Card.Text>
                                    <div className="d-flex gap-2 mt-auto pt-2">
                                        <button className="btn btn-outline-primary btn-sm rounded-pill flex-grow-1">
                                            Collegati
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary btn-sm rounded-pill flex-grow-1"
                                            onClick={() => handleViewProfile(prof._id)}
                                        >
                                            Profilo
                                        </button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
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
                                    src={selectedProfile.image || "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"}
                                    alt={selectedProfile.name}
                                    className="rounded-circle"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                    onError={(e) => { e.target.src = "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg" }}
                                />
                                <div>
                                    <h5 className="mb-0">{selectedProfile.name} {selectedProfile.surname}</h5>
                                    <p className="text-muted mb-0">{selectedProfile.title}</p>
                                    <p className="text-secondary small mb-0">{selectedProfile.area}</p>
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
                                            <div className="bg-light border rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{ width: "48px", height: "48px" }}>
                                                {exp.image
                                                    ? <img src={exp.image} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }} />
                                                    : <i className="bi bi-building fs-5"></i>
                                                }
                                            </div>
                                            <div>
                                                <p className="fw-bold mb-0">{exp.role}</p>
                                                <p className="mb-0">{exp.company}</p>
                                                <p className="text-muted small mb-0">{exp.startDate?.slice(0, 10)} – {exp.endDate?.slice(0, 10) || "Presente"}</p>
                                                {exp.description && <p className="small text-secondary mt-1 mb-0">{exp.description}</p>}
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
export default SearchPage
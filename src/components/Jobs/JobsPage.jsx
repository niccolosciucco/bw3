import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap"
import NavbarL from "../Navbar/NavbarL" 

const JobsPage = () => {
    const [jobs, setJobs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    console.log("Token in JobsPage:", token) // Debug: verifica se il token è presente
    const navigate = useNavigate()
    const [showLoginModal, setShowLoginModal] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch("https://strive-benchmark.herokuapp.com/api/jobs")
            .then((res) => res.json())
            .then((data) => {
                setJobs(data.data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setIsLoading(false)
            })
    }, [])
    const handleViewOffer = (url) => {
        if (token) {
            window.open(url, "_blank")
        } else {
            setShowLoginModal(true)
        }
    }

    return (
        <>
            <NavbarL />
            <div className="px-3 py-2 d-flex flex-wrap gap-2 justify-content-center">
                <Button className="rounded-pill" variant="outline-primary" style={{ minWidth: "120px" }}>Lavoro</Button>
                <Button className="rounded-pill" variant="outline-primary" style={{ minWidth: "120px" }}>Data di pubblicazione</Button>
                <Button className="rounded-pill" variant="outline-primary" style={{ minWidth: "120px" }}>Livello di esperienza</Button>
                <Button className="rounded-pill" variant="outline-primary" style={{ minWidth: "120px" }}>Tipo di contratto</Button>
                <Button className="rounded-pill" variant="outline-primary" style={{ minWidth: "120px" }}>Località</Button>
                <Button className="rounded-pill" variant="outline-primary" style={{ minWidth: "120px" }}>Azienda</Button>
                <Button className="rounded-pill" variant="outline-primary" style={{ minWidth: "120px" }}>Tutti i filtri</Button>
            </div >
            <Container>
                <h1>Offerte di lavoro</h1>
                {isLoading && <p>Caricamento...</p>}
                <Row xs={1} md={2} lg={3} className="g-3">
                    {jobs.map((job) => (
                        <Col key={job._id}>
                            <Card className="mb-3 h-100 d-flex flex-column">
                                <Card.Body>
                                    <Card.Title>{job.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{job.company_name}</Card.Subtitle>
                                    <Card.Text>{job.location}</Card.Text>
                                    <Card.Text>{job.category}</Card.Text>
                                    <Card.Text>
                                        <span
                                            className="text-primary"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleViewOffer(job.url)}
                                        >
                                            Vedi offerta
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accedi a LinkedIn</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center py-4">
                    <p className="mb-4">Per candidarti devi prima accedere a LinkedIn</p>
                    <Button variant="primary" className="rounded-pill px-4" onClick={() => navigate("/login")}>
                        Accedi
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}


export default JobsPage
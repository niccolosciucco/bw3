import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import NavbarL from "../Navbar/NavbarL" 

const JobsPage = () => {
    const [jobs, setJobs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)

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

    return (
        <>
            <NavbarL />
            <div className="px-3 py-2 d-flex gap-2 justify-content-center">
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
                                    <Card.Text><a href={job.url} target="_blank" rel="noopener noreferrer">Vedi offerta</a></Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}


export default JobsPage
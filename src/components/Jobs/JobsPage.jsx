import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container, Row, Col, Card } from "react-bootstrap"

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
        <Container>
            <h1>Offerte di lavoro</h1>
            {isLoading && <p>Caricamento...</p>}
            <Row xs={1} md={2} lg={3} className="g-3">
                {jobs.map((job) => (
                    <Col key={job._id}>
                        <Card className="h-100">
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
    )
}


export default JobsPage
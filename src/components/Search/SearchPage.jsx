import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container, Row, Col, Card, Form } from "react-bootstrap"
import { Link } from "react-router"
import NavbarL from "../Navbar/NavbarL" 

const SearchPage = () => {
    const [profiles, setProfiles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [query, setQuery] = useState("")
    const { token } = useSelector((state) => state.auth)
    useEffect(() => {
    if (!query) {
        setProfiles([])
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

    return (
        <>
            <NavbarL />
            <Container>
                <h1>Profili</h1>
                {isLoading && <p>Caricamento...</p>}
                <Form.Control
                        type="text"
                        placeholder="Cerca profili..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                <Row xs={1} md={2} lg={3} className="g-3">
                    {profiles.map((prof) => (
                        <Col key={prof._id}>
                            <Card className="mb-3 h-100 d-flex flex-column">
                                <Card.Body>
                                    <Card.Title>{prof.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{prof.surname}</Card.Subtitle>
                                    <Card.Text>{prof.title}</Card.Text>
                                    <Card.Text>{prof.area}</Card.Text>
                                    <Card.Text><Link to={`/profile/${prof._id}`}>Vedi profilo</Link></Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default SearchPage
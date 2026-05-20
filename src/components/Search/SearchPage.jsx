import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container, Row, Col, Card, Form } from "react-bootstrap"
import { Link, useSearchParams } from "react-router"
import NavbarL from "../Navbar/NavbarL" 

const SearchPage = () => {
    const [profiles, setProfiles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q") || ""       
    const { token } = useSelector((state) => state.auth)

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
                                <Card.Body>
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
                                    <Card.Text>
                                        <Link to={`/profile/${prof._id}`}>Vedi profilo</Link>
                                    </Card.Text>
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
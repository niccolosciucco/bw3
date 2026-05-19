import { useNavigate } from "react-router"
import { Container, Button, Row, Col, Nav, Navbar } from "react-bootstrap"
import { FaLinkedin, FaGoogle, FaApple } from "react-icons/fa"
import styles from "./LandingPage.module.css"



const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.pageWrapper}>

            {/* NAVBAR */}
            <Navbar bg="white" className="border-bottom py-2">
                <Container fluid className="px-4">
                    <Navbar.Brand>
                        <FaLinkedin className="text-primary" size={38} />
                    </Navbar.Brand>
                    <Nav className="ms-auto d-flex align-items-center gap-2">
                        <Button variant="outline-dark" className="rounded-pill px-3" onClick={() => navigate("/login")}>
                            Accedi
                        </Button>
                        <Button variant="primary" className="rounded-pill px-3">
                            Iscriviti ora
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            {/* HERO */}
            <Container fluid className="px-4 py-5">
                <Row className="align-items-center">
                    <Col md={6}>
                        <h1 className={styles.heroTitle}>Ti diamo il benvenuto nella tua community professionale</h1>
                        <Button variant="primary" className="rounded-pill w-100 mb-2" onClick={() => navigate("/login")}>
                            Accedi con l'email
                        </Button>
                    </Col>
                    <Col md={6}>
                        <img
                            src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"
                            alt="hero"
                            className="img-fluid"
                        />
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default LandingPage 
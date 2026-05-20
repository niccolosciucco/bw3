import { useNavigate } from "react-router"
import { Container, Button, Row, Col, Nav, Navbar } from "react-bootstrap"
import { FaLinkedin, FaGoogle, FaApple } from "react-icons/fa"
import styles from "./LandingPage.module.css"
import { Link } from "react-router"
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
            <Button
              variant="outline-dark"
              className="rounded-pill px-3"
              onClick={() => navigate("/login")}
            >
              Accedi
            </Button>
            <Button
              as={Link}
              to="/register"
              variant="primary"
              className="rounded-pill px-3"
            >
              Iscriviti ora
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* HERO */}
      <Container fluid className="px-4 py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className={styles.heroTitle}>
              Ti diamo il benvenuto nella tua community professionale
            </h1>
            <div style={{ maxWidth: "400px" }}>
              <Button
                variant="primary"
                className="rounded-pill w-100 mb-2"
                onClick={() => navigate("/login")}
              >
                Accedi con l'email
              </Button>
              <Button
                variant="primary"
                className="rounded-pill w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
              >
                <FaGoogle size={20} /> Continua con Google
              </Button>
              <Button
                variant="dark"
                className="rounded-pill w-100 mb-4 d-flex align-items-center justify-content-center gap-2"
              >
                <FaApple size={20} /> Continua con Apple
              </Button>

              <p
                className="text-center text-muted"
                style={{ fontSize: "0.8rem" }}
              >
                Cliccando su "Continua" accetti il{" "}
                <a href="#">Contratto di licenza</a>, l'
                <a href="#">Informativa sulla privacy</a> e l'
                <a href="#">Informativa sui cookie</a> di LinkedIn.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <img
              src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"
              alt="hero"
              className="img-fluid"
            />
          </Col>
          {/* SEZIONE CATEGORIE */}
          <div className={styles.categoriesFooter}>
            <Container>
              <Row className="align-items-center">
                <Col md={6}>
                  <h2>Trova il lavoro o lo stage giusto per te</h2>
                </Col>
                <Col md={6} className="d-flex flex-wrap gap-2">
                  <Button variant="outline-dark" className="rounded-pill">
                    Ingegneria
                  </Button>
                  <Button variant="outline-dark" className="rounded-pill">
                    Business Development
                  </Button>
                  <Button variant="outline-dark" className="rounded-pill">
                    Finanza
                  </Button>
                  <Button variant="outline-dark" className="rounded-pill">
                    Assistente amministrativo
                  </Button>
                  <Button variant="outline-dark" className="rounded-pill">
                    Addetto alle vendite
                  </Button>
                  <Button variant="outline-dark" className="rounded-pill">
                    Informatica
                  </Button>
                  <Button variant="outline-dark" className="rounded-pill">
                    Marketing
                  </Button>
                  <Button variant="outline-dark" className="rounded-pill">
                    Servizio clienti
                  </Button>
                  <Button variant="outline-dark" className="rounded-pill">
                    Operazioni
                  </Button>
                  <Button variant="outline-dark" className="rounded-pill">
                    Risorse umane
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage

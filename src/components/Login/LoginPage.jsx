import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../../store/slices/authSlice"
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router"
import styles from "./LoginPage.module.css"
import { FaLinkedin, FaApple, FaGoogle } from "react-icons/fa"
import { setUser } from "../../store/slices/profileSlice"
import { Link } from "react-router"
const LoginPage = () => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Validazione Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      dispatch(loginFailure("Inserisci un'email valida"))
      return
    }

    // 2. Chiamata API
    dispatch(loginStart())
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/me",
        {
          headers: {
            Authorization: `Bearer ${password}`, // Il token viene inserito nel campo password
          },
        },
      )

      if (response.ok) {
        const userData = await response.json()

        // Successo: salviamo token e dati utente
        dispatch(loginSuccess(password))
        dispatch(setUser(userData))
        navigate("/profile")
      } else {
        dispatch(loginFailure("Token non valido o scaduto"))
      }
    } catch (err) {
      dispatch(loginFailure("Errore di connessione: " + err.message))
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.logo}>
        <FaLinkedin className="text-primary" size={38} />
      </div>

      <Container style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className={styles.formBox}>
          <h2 className="mb-4">Accedi al tuo account</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) dispatch(clearError())
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password (Token)</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci il tuo token"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) dispatch(clearError())
                }}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
              className="w-100"
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Caricamento...
                </>
              ) : (
                "Accedi"
              )}
            </Button>

            <Form.Check
              type="checkbox"
              label="Mantieni attiva la sessione"
              className="my-3"
            />

            <hr />
            <p className="text-center text-muted">oppure</p>

            <Button
              variant="outline-secondary"
              className="w-100 mb-2 rounded-pill"
            >
              <FaGoogle className="me-2" /> Accedi con Google
            </Button>

            <Button variant="outline-secondary" className="w-100 rounded-pill">
              <FaApple className="me-2" /> Accedi con Apple
            </Button>
          </Form>

          <hr />
          <p className="text-center">
            Hai dimenticato la <a href="#">password?</a>
          </p>
          <p className="text-center">
            Non hai un account? <Link to="/register">Iscriviti ora</Link>
          </p>
        </div>
      </Container>

      <footer className={styles.footerLogin}>
        <span>LinkedIn Corporation © 2026</span>
        <span>Contratto di licenza</span>
        <span>Informativa sulla privacy</span>
        <span>Linee guida della community</span>
        <span>Informativa sui cookie</span>
      </footer>
    </div>
  )
}

export default LoginPage

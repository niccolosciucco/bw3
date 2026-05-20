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
import styles from "./LoginPage.module.css" // riusa gli stessi stili
import { FaLinkedin, FaApple, FaGoogle } from "react-icons/fa"
import { setUser } from "../../store/slices/profileSlice"

const RegisterPage = () => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "", // usato come token (stessa logica di LoginPage)
    confirmPassword: "",
    title: "",
  })

  const [localError, setLocalError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) dispatch(clearError())
    if (localError) setLocalError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validazioni lato client
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setLocalError("Inserisci un'email valida.")
      return
    }
    if (formData.password.length < 6) {
      setLocalError("Il token deve essere di almeno 6 caratteri.")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError("I token inseriti non coincidono.")
      return
    }

    // Chiamata API — verifica il token esattamente come in LoginPage
    dispatch(loginStart())
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/me",
        {
          headers: {
            Authorization: `Bearer ${formData.password}`,
          },
        },
      )

      if (response.ok) {
        const userData = await response.json()
        dispatch(loginSuccess(formData.password))
        dispatch(setUser(userData))
        navigate("/profile")
      } else {
        dispatch(loginFailure("Token non valido o scaduto."))
      }
    } catch (err) {
      dispatch(loginFailure("Errore di connessione: " + err.message))
    }
  }

  const displayError = localError || error

  return (
    <div className={styles.pageWrapper}>
      {/* Logo */}
      <div className={styles.logo}>
        <FaLinkedin className="text-primary" size={38} />
      </div>

      <Container style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className={styles.formBox}>
          <h2 className="mb-1">Iscriviti ora</h2>
          <p className="text-muted mb-4">
            Hai già un account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                navigate("/login")
              }}
            >
              Accedi
            </a>
          </p>

          {displayError && <Alert variant="danger">{displayError}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Nome */}
            <Form.Group className="mb-3" controlId="registerName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Inserisci il tuo nome"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Cognome */}
            <Form.Group className="mb-3" controlId="registerSurname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                placeholder="Inserisci il tuo cognome"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Inserisci la tua email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Titolo professionale */}
            <Form.Group className="mb-3" controlId="registerTitle">
              <Form.Label>Titolo professionale</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Es: Frontend Developer"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Token (campo password) */}
            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Password (Token)</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Inserisci il tuo token"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Conferma token */}
            <Form.Group className="mb-3" controlId="registerConfirmPassword">
              <Form.Label>Conferma Password (Token)</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Ripeti il token"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Checkbox privacy */}
            <Form.Check
              type="checkbox"
              id="privacyCheck"
              className="mb-3"
              required
              label={
                <span>
                  Accetto l&apos; <a href="#">Informativa sulla privacy</a> e il{" "}
                  <a href="#">Contratto di licenza</a> di LinkedIn.
                </span>
              }
            />

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
                "Iscriviti"
              )}
            </Button>

            <hr />
            <p className="text-center text-muted">oppure</p>

            <Button
              variant="outline-secondary"
              className="w-100 mb-2 rounded-pill"
            >
              <FaGoogle className="me-2" /> Iscriviti con Google
            </Button>

            <Button variant="outline-secondary" className="w-100 rounded-pill">
              <FaApple className="me-2" /> Iscriviti con Apple
            </Button>
          </Form>
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

export default RegisterPage

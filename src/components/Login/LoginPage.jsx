import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginStart, loginSuccess, loginFailure, clearError } from "../../store/slices/authSlice"
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router"
import styles from "./LoginPage.module.css"
import { FaLinkedin, FaApple, FaGoogle } from "react-icons/fa"

const LoginPage = () => {
    const dispatch = useDispatch()
    const { isLoading, error } = useSelector((state) => state.auth)
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        // 1. Prima valida l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            dispatch(loginFailure("Inserisci un'email valida"))
            return  // ← blocca tutto
        }

        // 2. Solo se l'email è ok, parte la chiamata API



        dispatch(loginStart())
        try {
            const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
                headers: {
                    Authorization: `Bearer ${password}`  // password è il token inserito dall'utente
                },
            })

            if (response.ok) {
                dispatch(loginSuccess(password))  // salva il token nel localStorage
                navigate("/profile")  // reindirizza al profilo
            } else {
                dispatch(loginFailure("Token non valido"))
            }

        } catch (err) {
            dispatch(loginFailure("Credenziali non valide"))
        }
    }

    return (
        <div className={styles.pageWrapper}>

            {/* Logo in alto a sinistra */}
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            if (error) dispatch(clearError())
                        }}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading} className="w-100">
                    {isLoading ? (
                        <><Spinner
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
                        {/* Checkbox */}
                        <Form.Check
                            type="checkbox"
                            label="Mantieni attiva la sessione"
                            className="my-3"
                        />

                        <hr />
                        <p className="text-center text-muted">oppure</p>

                        {/* Bottoni social */}
                        <Button variant="outline-secondary" className="w-100 mb-2 rounded-pill">
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
                        Non hai un account? <a href="#">Iscriviti ora</a>
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



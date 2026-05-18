import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginStart, loginSuccess, loginFailure, clearError } from "../../store/slices/authSlice"
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router"

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
        <Container style={{ maxWidth: "400px", marginTop: "50px" }}>
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
            </Form>
        </Container>
    )
}

export default LoginPage



import { Container, Card, Button, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import {
  BsArrowLeft,
  BsArrowCounterclockwise,
  BsCheckCircleFill,
} from "react-icons/bs";
import { useState } from "react";

const generateCrosswordData = () => {
  const solution = [
    "S",
    "O",
    "L",
    "E",
    " ",
    "T",
    " ",
    "U",
    "R",
    "O",
    "A",
    "L",
    "A",
    " ",
    "L",
    "R",
    "I",
    " ",
    "D",
    "I",
    " ",
    "O",
    "S",
    "S",
    "O",
  ];

  return {
    solution: solution,
    user: solution.map((char) => (char === " " ? " " : "")),
    clues: {
      across: [
        { num: 1, text: "Splende di giorno" },
        { num: 4, text: "Bovino preistorico" },
        { num: 6, text: "L'arto dell'uccello" },
        { num: 8, text: "Preposizione semplice" },
        { num: 9, text: "Parte dello scheletro" },
      ],
      down: [
        { num: 1, text: "Inizio di una stella" },
        { num: 2, text: "Lo dice chi ha capito" },
        { num: 3, text: "Eredità... genetica" },
        { num: 5, text: "Città dell'Oregon (USA)" },
        { num: 7, text: "Opposto di NO" },
      ],
    },
  };
};

const Cruciverba = () => {
  const navigate = useNavigate();

  const [puzzleData, setPuzzleData] = useState(() => generateCrosswordData());
  const [gameStatus, setGameStatus] = useState("playing");

  const userGrid = puzzleData.user;
  const solutionGrid = puzzleData.solution;

  const startNewGame = () => {
    setPuzzleData(generateCrosswordData());
    setGameStatus("playing");
  };

  const handleInputChange = (index, value) => {
    if (solutionGrid[index] === " ") return;

    const char = value.toUpperCase().slice(-1);
    if (char !== "" && !/^[A-Z]$/.test(char)) return;

    const newGrid = [...userGrid];
    newGrid[index] = char;

    setPuzzleData((prev) => ({
      ...prev,
      user: newGrid,
    }));
  };

  const checkSolution = () => {
    const isCorrect = userGrid.every((char, i) => char === solutionGrid[i]);

    if (isCorrect) {
      setGameStatus("won");
    } else {
      setGameStatus("lost");
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: "850px" }}>
      {/* Intestazione */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center gap-2 border-0 shadow-none bg-transparent text-secondary hover-bg-light"
          onClick={() => navigate(-1)}
          style={{ fontSize: "0.9rem", fontWeight: "500" }}
        >
          <BsArrowLeft size={18} /> Torna al Feed
        </Button>
        <div className="d-flex align-items-center gap-2 text-secondary font-monospace small bg-light px-3 py-1 rounded-pill fw-medium">
          LINKEDIN GAMES
        </div>
      </div>

      <Card className="shadow-sm rounded-4 border-0 p-3 bg-white text-center">
        <Card.Body>
          <Card.Title className="fw-bold fs-4 mb-1 text-dark">
            Cruciverba del Giorno
          </Card.Title>
          <Card.Text
            className="text-muted small mb-4 mx-auto"
            style={{ maxWidth: "500px" }}
          >
            Metti alla prova il tuo lessico. Leggi le definizioni e riempi la
            griglia.
          </Card.Text>

          {gameStatus === "won" && (
            <Alert
              variant="success"
              className="rounded-3 fw-semibold small py-2 border-0 d-flex align-items-center justify-content-center gap-2 mb-4"
              style={{ backgroundColor: "#e1f5fe", color: "#0288d1" }}
            >
              <BsCheckCircleFill size={16} /> Fantastico! Hai completato lo
              schema.
            </Alert>
          )}
          {gameStatus === "lost" && (
            <Alert
              variant="danger"
              className="rounded-3 small py-2 border-0 mb-4"
              style={{ backgroundColor: "#ffebee", color: "#c62828" }}
            >
              Alcune parole non sono corrette. Controlla gli incroci e riprova.
            </Alert>
          )}

          <Row className="g-4 mb-4">
            {/* GRIGLIA CRUCIVERBA */}
            <Col
              lg={6}
              className="d-flex justify-content-center align-items-start"
            >
              <div
                className="rounded-2 overflow-hidden"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  width: "100%",
                  maxWidth: "320px",
                  aspectRatio: "1/1",
                  backgroundColor: "#263238",
                  gap: "2px",
                  border: "3px solid #263238",
                }}
              >
                {userGrid.map((cellValue, index) => {
                  const isBlack = solutionGrid[index] === " ";

                  return (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        backgroundColor: isBlack ? "#263238" : "white",
                      }}
                    >
                      {!isBlack && (
                        <input
                          type="text"
                          value={cellValue}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          disabled={gameStatus === "won"}
                          className="text-center fw-bold shadow-none m-0 p-0"
                          style={{
                            width: "100%",
                            height: "100%",
                            fontSize: "1.4rem",
                            border: "none",
                            backgroundColor: "transparent",
                            color: "#0a66c2",
                            outline: "none",
                            textTransform: "uppercase",
                          }}
                          onFocus={(e) => {
                            e.target.parentElement.style.backgroundColor =
                              "#e8f0fe";
                          }}
                          onBlur={(e) => {
                            e.target.parentElement.style.backgroundColor =
                              "white";
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </Col>

            {/* DEFINIZIONI */}
            <Col lg={6} className="text-start">
              <div className="bg-light p-3 rounded-4 h-100 border border-light-subtle">
                <div className="mb-4">
                  <h6 className="fw-bold text-primary d-flex align-items-center gap-2 mb-3">
                    <span className="badge bg-primary rounded-pill">A</span>{" "}
                    ORIZZONTALI
                  </h6>
                  <ul className="list-unstyled small ps-1">
                    {puzzleData.clues.across.map((clue) => (
                      <li key={clue.num} className="mb-2 d-flex">
                        <span className="fw-bold me-2 text-secondary">
                          {clue.num}.
                        </span>
                        <span>{clue.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h6 className="fw-bold text-success d-flex align-items-center gap-2 mb-3">
                    <span className="badge bg-success rounded-pill">D</span>{" "}
                    VERTICALI
                  </h6>
                  <ul className="list-unstyled small ps-1">
                    {puzzleData.clues.down.map((clue) => (
                      <li key={clue.num} className="mb-2 d-flex">
                        <span className="fw-bold me-2 text-secondary">
                          {clue.num}.
                        </span>
                        <span>{clue.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>

          {/* CONTROLLI */}
          <div className="d-flex justify-content-center gap-3 pt-2">
            <Button
              variant="outline-primary"
              className="rounded-pill px-4 d-flex align-items-center gap-2 fw-semibold"
              onClick={startNewGame}
              style={{ fontSize: "0.85rem", borderWidth: "1.5px" }}
            >
              <BsArrowCounterclockwise size={16} /> Nuova Partita
            </Button>
            <Button
              variant="primary"
              className="rounded-pill px-4 d-flex align-items-center gap-2 fw-semibold"
              disabled={gameStatus === "won"}
              onClick={checkSolution}
              style={{
                fontSize: "0.85rem",
                backgroundColor: "#0a66c2",
                borderColor: "#0a66c2",
              }}
            >
              <BsCheckCircleFill size={14} /> Verifica Risposte
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cruciverba;

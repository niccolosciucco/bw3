import { Container, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import {
  BsArrowLeft,
  BsArrowCounterclockwise,
  BsCheckCircleFill,
} from "react-icons/bs";
import sudoku from "sudoku";
import { useState } from "react";

const generatePuzzleData = () => {
  const rawPuzzle = sudoku.makepuzzle();
  const formattedPuzzle = rawPuzzle.map((val) =>
    val !== null ? val + 1 : null,
  );
  return {
    initial: formattedPuzzle,
    user: [...formattedPuzzle],
  };
};

const SudokuPage = () => {
  const navigate = useNavigate();

  const [puzzleData, setPuzzleData] = useState(() => generatePuzzleData());
  const [gameStatus, setGameStatus] = useState("playing");

  const initialGrid = puzzleData.initial;
  const userGrid = puzzleData.user;

  const startNewGame = () => {
    setPuzzleData(generatePuzzleData());
    setGameStatus("playing");
  };

  const handleInputChange = (index, value) => {
    if (initialGrid[index] !== null) return;

    const parsedValue = parseInt(value, 10);
    const newGrid = [...userGrid];

    if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 9) {
      newGrid[index] = null;
    } else {
      newGrid[index] = parsedValue;
    }

    setPuzzleData((prev) => ({
      ...prev,
      user: newGrid,
    }));
  };

  const checkSolution = () => {
    const rawUserGrid = userGrid.map((val) => (val !== null ? val - 1 : null));
    const solution = sudoku.solve(rawUserGrid);

    if (solution && rawUserGrid.every((val, i) => val === solution[i])) {
      setGameStatus("won");
    } else {
      setGameStatus("lost");
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: "600px" }}>
      {/* Intestazione e Pulsante Torna Indietro */}
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
            Sudoku del Giorno
          </Card.Title>
          <Card.Text
            className="text-muted small mb-4 mx-auto"
            style={{ maxWidth: "400px" }}
          >
            Allena la mente. Completa la griglia senza ripetere numeri nelle
            righe, colonne e quadranti 3x3.
          </Card.Text>

          {gameStatus === "won" && (
            <Alert
              variant="success"
              className="rounded-3 fw-semibold small py-2 border-0 d-flex align-items-center justify-content-center gap-2 mb-4"
              style={{ backgroundColor: "#e1f5fe", color: "#0288d1" }}
            >
              <BsCheckCircleFill size={16} /> Puzzle completato con successo!
            </Alert>
          )}
          {gameStatus === "lost" && (
            <Alert
              variant="danger"
              className="rounded-3 small py-2 border-0 mb-4"
              style={{ backgroundColor: "#ffebee", color: "#c62828" }}
            >
              Ci sono incongruenze nella griglia. Controlla la disposizione dei
              numeri.
            </Alert>
          )}

          {/* LA GRIGLIA DEL SUDOKU */}
          <div
            className="mx-auto mb-4 rounded-2 overflow-hidden p-0"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(9, 1fr)",
              maxWidth: "400px",
              width: "100%",
              aspectRatio: "1/1",
              backgroundColor: "#b0bec5",
              gap: "1px",
              border: "3px solid #263238",
            }}
          >
            {userGrid.map((cellValue, index) => {
              const isInitial = initialGrid[index] !== null;
              const row = Math.floor(index / 9);
              const col = index % 9;

              const borderBottom =
                row === 2 || row === 5 ? "3px solid #263238" : "0px";
              const borderRight =
                col === 2 || col === 5 ? "3px solid #263238" : "0px";

              return (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  pattern="[1-9]*"
                  inputMode="numeric"
                  value={cellValue || ""}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  disabled={isInitial || gameStatus === "won"}
                  className="text-center fw-bold shadow-none m-0 p-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: "1.35rem",
                    borderBottom: borderBottom,
                    borderRight: borderRight,
                    borderTop: "0px",
                    borderLeft: "0px",
                    backgroundColor: isInitial ? "#f5f5f5" : "#ffffff",
                    color: isInitial ? "#263238" : "#0a66c2",
                    outline: "none",
                    cursor: isInitial ? "not-allowed" : "text",
                    transition: "background-color 0.15s ease",
                  }}
                  onFocus={(e) => {
                    if (!isInitial) e.target.style.backgroundColor = "#e8f0fe";
                  }}
                  onBlur={(e) => {
                    if (!isInitial) e.target.style.backgroundColor = "#ffffff";
                  }}
                />
              );
            })}
          </div>

          {/* CONTROLLI DI GIOCO */}
          <div className="d-flex justify-content-center gap-3">
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
              <BsCheckCircleFill size={14} /> Verifica Soluzione
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SudokuPage;

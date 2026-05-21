import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Chessboard } from "react-chessboard";
import { BsArrowLeft, BsArrowCounterclockwise } from "react-icons/bs";

const ChessPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-4" style={{ maxWidth: "700px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center gap-2 border-0 shadow-none bg-transparent text-secondary"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft size={18} /> Torna al Feed
        </Button>
        <div className="bg-light px-3 py-1 rounded-pill small fw-medium text-secondary">
          LINKEDIN GAMES
        </div>
      </div>

      <Card className="shadow-sm rounded-4 border-0 p-3 bg-white">
        <Card.Body>
          <div className="text-center mb-4">
            <Card.Title className="fw-bold fs-4 mb-1">
              Scacchi del Giorno
            </Card.Title>
            <Card.Text className="text-muted small">
              "Trascina una pedina per iniziare."
            </Card.Text>
          </div>

          <div className="d-flex flex-column align-items-center">
            <div style={{ width: "100%", maxWidth: "450px" }}>
              <Chessboard />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="outline-primary"
              className="rounded-pill px-4 d-flex align-items-center gap-2 fw-semibold"
            >
              <BsArrowCounterclockwise size={16} /> Ricomincia
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChessPage;

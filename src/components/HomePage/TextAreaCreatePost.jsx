import { useState } from "react";
import { Modal, Button, Form, Spinner, Stack } from "react-bootstrap";
import { BsGlobe2, BsImage, BsEmojiSmile } from "react-icons/bs";

const TextAreaCreatePost = ({ onPostSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageField, setShowImageField] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setText("");
    setImageUrl("");
    setShowImageField(false);
  };

  const handleOpen = () => setShowModal(true);

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsPublishing(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBhZGEzYjA2YmJlOTAwMTVkZWU1ODEiLCJpYXQiOjE3NzkwOTYxMjMsImV4cCI6MTc4MDMwNTcyM30.4JBZcE70K5YVN4QRpIVSD1AO8yNJrWtf7Q0WS-E2mtw";

    const payload = {
      text: text.trim(),
    };

    if (imageUrl.trim()) {
      payload.image = imageUrl.trim();
    }

    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/posts/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("Errore durante la pubblicazione del post");
      }

      const data = await response.json();
      console.log("Post pubblicato con successo!", data);

      handleClose();

      if (onPostSuccess) {
        onPostSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("Impossibile pubblicare il post, riprova più tardi.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="form-control rounded-pill bg-light border text-muted d-flex align-items-center px-3 py-2"
        style={{
          cursor: "text",
          fontSize: "14px",
          fontWeight: "600",
          height: "48px",
          width: "100%",
          backgroundColor: "#f4f2ee",
        }}
      >
        Crea un post...
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
        className="rounded-4"
      >
        <Modal.Header closeButton className="border-0 pt-3 px-4">
          <Modal.Title className="fs-5 fw-normal text-secondary d-flex align-items-center gap-2">
            <img
              src="https://placecats.com/70/70"
              alt="Profilo"
              className="rounded-circle"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <div>
              <div className="fw-bold text-dark fs-6">Guido La Vespa</div>
              <Button
                variant="outline-secondary"
                size="sm"
                className="rounded-pill py-0 px-2 d-flex align-items-center gap-1 text-muted border-secondary-subtle"
                style={{ fontSize: "12px", fontWeight: "600" }}
              >
                <BsGlobe2 size={12} />
                <span>Chiunque</span>
              </Button>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handlePublish}>
          <Modal.Body className="px-4 pt-2 pb-4">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Di cosa vorresti parlare oggi?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border-0 shadow-none p-0 resize-none"
              style={{ fontSize: "16px", resize: "none" }}
              autoFocus
              disabled={isPublishing}
            />

            {showImageField && (
              <Form.Group className="mt-3 p-3 border rounded bg-light">
                <Form.Label className="fw-semibold text-muted small">
                  Inserisci l'URL di un'immagine
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://esempio.com/immagine.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-white border shadow-none"
                  style={{ fontSize: "14px" }}
                  disabled={isPublishing}
                />
              </Form.Group>
            )}
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-between align-items-center border-top px-4 py-2 bg-light rounded-bottom-4">
            <Stack direction="horizontal" gap={3}>
              <Button
                variant="link"
                className="p-0 text-secondary"
                onClick={() => setShowImageField(!showImageField)}
                disabled={isPublishing}
              >
                <BsImage size={20} className="text-primary" />
              </Button>
              <Button
                variant="link"
                className="p-0 text-secondary"
                disabled={isPublishing}
              >
                <BsEmojiSmile size={20} style={{ color: "#c37d16" }} />
              </Button>
            </Stack>

            <Button
              type="submit"
              variant={text.trim() ? "primary" : "secondary"}
              disabled={!text.trim() || isPublishing}
              className="rounded-pill fw-semibold px-4 py-1"
              style={{ fontSize: "14px" }}
            >
              {isPublishing ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  <span>Pubblicazione...</span>
                </>
              ) : (
                <span>Pubblica</span>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default TextAreaCreatePost;

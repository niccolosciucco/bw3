import { useState, useRef } from "react";
import { Modal, Button, Form, Spinner, Stack } from "react-bootstrap";
import { BsGlobe2, BsImage, BsEmojiSmile, BsCloudUpload } from "react-icons/bs";
import { useSelector } from "react-redux";

const TextAreaCreatePost = ({ onPostSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showImageField, setShowImageField] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const fileInputRef = useRef(null);
  const currentUser = useSelector((state) => state.profile?.user);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBhZGEzYjA2YmJlOTAwMTVkZWU1ODEiLCJpYXQiOjE3NzkwOTYxMjMsImV4cCI6MTc4MDMwNTcyM30.4JBZcE70K5YVN4QRpIVSD1AO8yNJrWtf7Q0WS-E2mtw";

  const handleClose = () => {
    setShowModal(false);
    setText("");
    setImageUrl("");
    setSelectedFile(null);
    setShowImageField(false);
  };

  const handleOpen = () => setShowModal(true);

  // Gestore del cambio file dal PC locale
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setImageUrl(""); // Resetta l'URL testuale se l'utente sceglie un file locale
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsPublishing(true);

    // Costruiamo il payload iniziale per il testo
    const payload = {
      text: text.trim(),
    };

    // Se l'utente ha inserito un URL web lo allego subito
    if (imageUrl.trim() && !selectedFile) {
      payload.image = imageUrl.trim();
    }

    try {
      // FASE 1: Creazione del Post
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
        throw new Error("Errore durante la pubblicazione del testo del post");
      }

      const createdPost = await response.json();

      // FASE 2: Se è presente un file locale dal PC, eseguo la seconda chiamata per caricare l'immagine
      if (selectedFile && createdPost._id) {
        const formData = new FormData();
        formData.append("post", selectedFile);

        const imageResponse = await fetch(
          `https://striveschool-api.herokuapp.com/api/posts/${createdPost._id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              // Nota: 'Content-Type' NON deve essere impostato manualmente quando si invia un FormData
            },
            body: formData,
          },
        );

        if (!imageResponse.ok) {
          throw new Error(
            "Testo salvato, ma si è verificato un errore nel caricamento del file immagine.",
          );
        }
      }

      console.log("Post pubblicato con successo!");
      handleClose();

      if (onPostSuccess) {
        onPostSuccess();
      }
    } catch (error) {
      console.error(error);
      alert(
        error.message || "Impossibile pubblicare il post, riprova più tardi.",
      );
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
              src={currentUser?.image || "https://placecats.com/70/70"}
              alt="Profilo"
              className="rounded-circle border"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placecats.com/70/70";
              }}
            />
            <div>
              <div className="fw-bold text-dark fs-6">
                {currentUser
                  ? `${currentUser.name} ${currentUser.surname}`
                  : "Guido La Vespa"}
              </div>
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
                <div className="d-flex flex-column gap-3">
                  {/* Sezione 1: Caricamento File Locale dal Computer */}
                  <div>
                    <Form.Label className="fw-semibold text-muted small d-block">
                      Opzione A: Carica un file dal computer
                    </Form.Label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="d-none"
                      disabled={isPublishing}
                    />
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="d-flex align-items-center gap-2 mt-1 rounded-pill"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isPublishing}
                    >
                      <BsCloudUpload size={16} />
                      <span>
                        {selectedFile
                          ? "Cambia immagine"
                          : "Sfoglia file locali"}
                      </span>
                    </Button>
                    {selectedFile && (
                      <div className="text-success small fw-medium mt-2 ps-1">
                        ✓ Pronto per l'invio:{" "}
                        <strong>{selectedFile.name}</strong>
                      </div>
                    )}
                  </div>

                  <div className="border-top my-1 text-center position-relative">
                    <span className="px-2 bg-light text-muted small position-absolute top-50 start-50 translate-middle">
                      oppure
                    </span>
                  </div>

                  {/* Sezione 2: Inserimento URL Immagine remota */}
                  <div>
                    <Form.Label className="fw-semibold text-muted small">
                      Opzione B: Inserisci l'URL di un'immagine web
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="https://esempio.com/immagine.jpg"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setSelectedFile(null); // Resetta il file locale se inserisci un URL testuale
                      }}
                      className="bg-white border shadow-none mt-1"
                      style={{ fontSize: "14px" }}
                      disabled={isPublishing || !!selectedFile}
                    />
                  </div>
                </div>
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
                <BsImage
                  size={20}
                  className={
                    showImageField || selectedFile || imageUrl
                      ? "text-success"
                      : "text-primary"
                  }
                />
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

import { useState, useEffect } from "react";
import { Form, Button, Spinner, Stack } from "react-bootstrap";
import {
  BsSendFill,
  BsPencilSquare,
  BsXCircle,
  BsCheckCircle,
} from "react-icons/bs";
import { useSelector } from "react-redux";

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stati per la gestione della modifica del commento
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const profileImage = useSelector((state) => state.image?.profileImage);
  const profileName = useSelector((state) => state.image?.profileName);
  const profileSurname = useSelector((state) => state.image?.profileSurname);

  // Fallback dell'avatar
  const myAvatarImage =
    profileImage ||
    "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg";

  const myFullName =
    profileName && profileSurname
      ? `${profileName} ${profileSurname}`
      : "Tu (Guido)";

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBhZGEzYjA2YmJlOTAwMTVkZWU1ODEiLCJpYXQiOjE3NzkwOTYxMjMsImV4cCI6MTc4MDMwNTcyM30.4JBZcE70K5YVN4QRpIVSD1AO8yNJrWtf7Q0WS-E2mtw";

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/?elementId=${postId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const filtered = data.filter((c) => c.elementId === postId);
            setComments(filtered);
          } else {
            setComments([]);
          }
        }
      } catch (error) {
        console.error("Errore nel recupero dei commenti:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // Funzione di supporto per ricaricare i commenti
  const refreshCommentsList = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/?elementId=${postId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const filtered = data.filter((c) => c.elementId === postId);
          setComments(filtered);
        }
      }
    } catch (error) {
      console.error("Errore durante il refresh dei commenti:", error);
    }
  };

  // Invio del nuovo commento
  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    const payload = {
      comment: newComment.trim(),
      rate: "5",
      elementId: postId,
    };

    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) throw new Error("Impossibile inviare il commento");

      setNewComment("");
      await refreshCommentsList();
    } catch (error) {
      console.error(error);
      alert("Errore durante l'invio del commento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditingText(currentText);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  // Salvataggio del commento modificato
  const handleUpdateComment = async (commentId) => {
    if (!editingText.trim()) return;

    setIsUpdating(true);

    const payload = {
      comment: editingText.trim(),
      rate: "5",
      elementId: postId,
    };

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) throw new Error("Impossibile modificare il commento");

      setEditingCommentId(null);
      setEditingText("");
      await refreshCommentsList();
    } catch (error) {
      console.error(error);
      alert("Errore durante la modifica del commento.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="border-top p-3 bg-light rounded-bottom-4">
      {/* Form di inserimento commento */}
      <Form
        onSubmit={handlePostComment}
        className="d-flex gap-2 mb-3 align-items-center"
      >
        <img
          src={myAvatarImage}
          alt="Mio Profilo"
          className="rounded-circle border"
          style={{ width: "32px", height: "32px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg";
          }}
        />
        <Form.Control
          type="text"
          placeholder="Aggiungi un commento..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={isSubmitting || editingCommentId !== null}
          className="rounded-pill bg-white border shadow-none py-2 px-3"
          style={{ fontSize: "13px" }}
        />
        {newComment.trim() && (
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="rounded-circle p-2 d-flex align-items-center justify-content-center"
            style={{ width: "35px", height: "35px" }}
          >
            {isSubmitting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <BsSendFill size={14} />
            )}
          </Button>
        )}
      </Form>

      {/* Lista dei commenti */}
      {isLoading ? (
        <div className="text-center py-2">
          <Spinner animation="border" size="sm" variant="secondary" />
        </div>
      ) : comments.length > 0 ? (
        <Stack gap={2} className="mt-2">
          {comments.map((c, index) => {
            const authorClean = c.author?.toLowerCase().trim() || "";

            const reduxFullNameClean =
              `${profileName || ""}_${profileSurname || ""}`
                .toLowerCase()
                .trim();
            const reduxSpaceNameClean =
              `${profileName || ""} ${profileSurname || ""}`
                .toLowerCase()
                .trim();

            const isMe =
              authorClean !== "" &&
              (authorClean === reduxFullNameClean ||
                authorClean === reduxSpaceNameClean ||
                authorClean === "guido_la_vespa" ||
                authorClean.includes("guido") ||
                authorClean.includes("vespa"));

            const isCurrentlyEditing = editingCommentId === c._id;

            return (
              <div
                key={c._id || index}
                className="d-flex gap-2 align-items-start text-start p-2 rounded bg-white shadow-sm position-relative"
              >
                <img
                  src={
                    isMe
                      ? myAvatarImage
                      : `https://ui-avatars.com/api/?name=${c.author || "Utente"}&background=random`
                  }
                  alt="Autore"
                  className="rounded-circle border"
                  style={{ width: "28px", height: "28px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${c.author || "Utente"}&background=random`;
                  }}
                />
                <div className="w-100" style={{ fontSize: "13px" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="fw-bold text-dark">
                      {isMe ? myFullName : c.author || "Anonimo"}
                    </div>

                    {isMe && !isCurrentlyEditing && (
                      <Button
                        variant="link"
                        className="text-secondary p-0 border-0 shadow-none text-decoration-none"
                        onClick={() => startEditing(c._id, c.comment)}
                        title="Modifica commento"
                        style={{ height: "fit-content" }}
                      >
                        <BsPencilSquare size={14} className="text-muted" />
                      </Button>
                    )}
                  </div>

                  {isCurrentlyEditing ? (
                    <div className="mt-2 d-flex gap-2 align-items-center">
                      <Form.Control
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="form-control-sm border shadow-none bg-light py-1 px-2"
                        style={{ fontSize: "12px" }}
                        disabled={isUpdating}
                        autoFocus
                      />
                      <Stack direction="horizontal" gap={1}>
                        <Button
                          variant="link"
                          className="p-0 text-success"
                          disabled={isUpdating || !editingText.trim()}
                          onClick={() => handleUpdateComment(c._id)}
                        >
                          {isUpdating ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            <BsCheckCircle size={16} />
                          )}
                        </Button>
                        <Button
                          variant="link"
                          className="p-0 text-danger"
                          disabled={isUpdating}
                          onClick={cancelEditing}
                        >
                          <BsXCircle size={16} />
                        </Button>
                      </Stack>
                    </div>
                  ) : (
                    <div className="text-secondary mt-1">{c.comment}</div>
                  )}
                </div>
              </div>
            );
          })}
        </Stack>
      ) : (
        <div className="text-muted text-center small py-2">
          Nessun commento per questo post. Sii il primo!
        </div>
      )}
    </div>
  );
};

export default CommentsSection;

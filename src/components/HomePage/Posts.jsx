import { useState, useEffect, useRef } from "react";
import { Spinner, Container } from "react-bootstrap";
import PostCard from "./PostCard";

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  // Quanti post stiamo mostrando attualmente a schermo
  const [visibleCount, setVisibleCount] = useState(5);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Spinner per i post successivi
  const [error, setError] = useState(null);

  const observerTarget = useRef(null);

  // 1. GET iniziale per scaricare i dati
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBhZGEzYjA2YmJlOTAwMTVkZWU1ODEiLCJpYXQiOjE3NzkwOTYxMjMsImV4cCI6MTc4MDMwNTcyM30.4JBZcE70K5YVN4QRpIVSD1AO8yNJrWtf7Q0WS-E2mtw";

    fetch("https://striveschool-api.herokuapp.com/api/posts/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero dei post");
        return res.json();
      })
      .then((data) => {
        setAllPosts(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 2. Infinite Scroll
  useEffect(() => {
    // Se stiamo ancora caricando il primo blocco o se abbiamo già mostrato tutti i post, non osserviamo nulla
    if (loading || visibleCount >= allPosts.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Se l'elemento target entra nell'inquadratura dello schermo
        if (entries[0].isIntersecting && !loadingMore) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prevCount) => prevCount + 5);
            setLoadingMore(false);
          }, 800);
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loading, visibleCount, allPosts.length, loadingMore]);

  // Schermata di caricamento iniziale globale
  if (loading) {
    return (
      <Container className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="secondary" role="status">
          <span className="visually-hidden">Caricamento post...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger my-4">
        Si è verificato un errore: {error}
      </div>
    );
  }

  const postsToRender = allPosts.slice(0, visibleCount);

  return (
    <>
      {postsToRender.map((singoloPost) => (
        <PostCard key={singoloPost._id} post={singoloPost} />
      ))}

      <div ref={observerTarget} style={{ height: "40px", margin: "20px 0" }}>
        {loadingMore && (
          <Container className="d-flex justify-content-center">
            <Spinner
              animation="border"
              variant="primary"
              size="sm"
              role="status"
              className="me-2"
            />
            <span className="text-muted" style={{ fontSize: "13px" }}>
              Caricamento altri post...
            </span>
          </Container>
        )}
      </div>
    </>
  );
};

export default Posts;

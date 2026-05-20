import {
  BsChevronDown,
  BsImageFill,
  BsNewspaper,
  BsPlayBtnFill,
} from "react-icons/bs"
import TextAreaCreatePost from "./TextAreaCreatePost"
import PostActionButton from "../HomePage/PostActionButton"
import Posts from "./Posts"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"

const CentralContent = function () {
  const navigate = useNavigate()
  const profileImage = useSelector((state) => state.image.profileImage)
  return (
    <>
      <div
        className="card border-light shadow-sm rounded-4 p-3 mx-auto"
        style={{ maxWidth: "640px", borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div className="d-flex align-items-center gap-3 mb-2">
          <img
            onClick={() => navigate("/profile")}
            src={
              profileImage ||
              "https://i.pinimg.com/736x/24/a5/4c/24a54c075ae7a7e7ae16d69e2766cefe.jpg"
            }
            alt="Profilo"
            className="rounded-circle border"
            style={{
              width: "48px",
              height: "48px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
          <TextAreaCreatePost
            onPostSuccess={() => window.location.reload()}
          />{" "}
        </div>

        <div className="d-flex align-items-center justify-content-between pt-1">
          <PostActionButton
            icon={BsPlayBtnFill}
            label="Video"
            iconColor="#3a783a"
          />

          <PostActionButton
            icon={BsImageFill}
            label="Foto"
            iconColor="#2b72c4"
          />

          <PostActionButton
            icon={BsNewspaper}
            label="Scrivi un articolo"
            iconColor="#b25b29"
          />
        </div>
      </div>

      <div
        className="d-flex align-items-center justify-content-end gap-1 mt-2 mx-auto text-secondary"
        style={{ maxWidth: "640px", fontSize: "13px", paddingRight: "4px" }}
      >
        <span>Seleziona la visualizzazione del feed:</span>
        <button
          className="btn btn-link text-decoration-none p-0 fw-semibold text-secondary-emphasis d-flex align-items-center gap-1"
          style={{ fontSize: "13px" }}
        >
          <span>più pertinenti per primi</span>
          <BsChevronDown style={{ fontSize: "11px", strokeWidth: "1.5" }} />
        </button>
      </div>

      <Posts />
    </>
  )
}

export default CentralContent

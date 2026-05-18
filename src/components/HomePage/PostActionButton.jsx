const PostActionButton = ({ icon: Icon, label, iconColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-link text-decoration-none text-secondary-emphasis fw-semibold d-flex align-items-center gap-2 px-3 py-2 border-0 rounded-2 hover-element"
      style={{ fontSize: "15px" }}
    >
      <Icon style={{ color: iconColor, fontSize: "20px" }} />
      <span>{label}</span>
    </button>
  );
};

export default PostActionButton;

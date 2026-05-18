const SingleIconAndTextFooter = function ({ icon: Icon, title, subTitle }) {
  return (
    <div className="d-flex align-items-start mb-3">
      {Icon && (
        <Icon
          className="me-2 mt-1 text-secondary"
          style={{ fontSize: "1.2rem" }}
        />
      )}

      <div style={{ color: "rgba(126, 126, 123)", cursor: "pointer" }}>
        <span className="fw-bold d-block">{title}</span>
        <p className="mb-0" style={{ fontSize: "0.9rem" }}>
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default SingleIconAndTextFooter;

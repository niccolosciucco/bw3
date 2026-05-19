const TextAreaCreatePost = function () {
  return (
    <textarea
      className="form-control flex-grow-1 border-1 border-secondary bg-light px-3 py-2 text-secondary-emphasis"
      placeholder="Crea un post..."
      rows="1"
      style={{
        fontSize: "15px",
        resize: "none",
        borderRadius: "20px",
        minHeight: "44px",
        maxHeight: "150px",
        paddingTop: "10px",
      }}
    />
  );
};

export default TextAreaCreatePost;

const SingleTextFooter = function (props) {
  return (
    <p
      className="mb-0"
      style={{ color: "rgba(130, 128, 126)", cursor: "pointer" }}
    >
      {props.text}
    </p>
  );
};
export default SingleTextFooter;

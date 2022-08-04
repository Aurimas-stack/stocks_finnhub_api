const Error = (props) => {
  return <p className={`message ${props.className}`}>{props.message}</p>;
};

export default Error;

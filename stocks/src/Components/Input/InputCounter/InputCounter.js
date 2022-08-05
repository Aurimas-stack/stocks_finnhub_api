const InputCounter = (props) => {
  const counterContStyles = `letter-count-container 
    ${props.hasError && "invalid-counter-container"}`;

  const counterStyles = `letter-counter ${
    props.length > 35 && "invalid-counter"
  }`;
  return (
    <div className={counterContStyles} onClick={props.onInputFocus}>
      {props.isTouched && (
        <p className={counterStyles}>({props.length} / 35)</p>
      )}
    </div>
  );
};

export default InputCounter;

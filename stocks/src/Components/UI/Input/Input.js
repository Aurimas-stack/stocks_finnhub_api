import { useState, useEffect, useRef } from "react";

import { validateInput } from "../../../util/validate-input";

import Button from "../Button/Button";
import Error from "../Error/Error";

const Input = (props) => {
  const [symbol, setSymbol] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const input = useRef(null);

  const validSymbol = validateInput(symbol);
  const hasError = !validSymbol.valid && isTouched;

  let formIsValid = false;

  if (validSymbol.valid) {
    formIsValid = true;
  }

  useEffect(() => {
    if (!validSymbol.valid) {
      props.setError(validSymbol.message);
    }
    if (validSymbol.valid) {
      props.setError(null);
    }
  }, [validSymbol.valid, validSymbol.message, props]);

  const resetInput = () => {
    setSymbol("");
    setIsTouched(false);
  };

  const handleInputFocus = () => {
    input.current.focus();
  };

  const searchHandler = (event) => {
    event.preventDefault();

    if (!validSymbol.valid) {
      return;
    }

    if (symbol.trim().length === 0) {
      props.setError("Empty input is not allowed!");
      return;
    }

    props.onSymbolSearch(symbol);
    resetInput();
  };

  return (
    <form onSubmit={searchHandler} className="form">
      {hasError && <Error message={props.error} className="input-error" />}
      <input
        type="text"
        className={hasError ? "valid invalid" : "valid"}
        placeholder="Enter a symbol of the company, ex.: AAPL"
        value={symbol}
        maxLength={40}
        ref={input}
        onFocus={() => setIsTouched(true)}
        onChange={(e) => setSymbol(e.target.value)}
        onBlur={() => setIsTouched(false)}
      />
      <div
        className={`letter-count-container ${
          isTouched && !hasError && "focused-counter-container"
        }
      ${hasError && "invalid-counter-container"}`}
        onClick={handleInputFocus}
      >
        {isTouched && (
          <p
            className={`letter-counter ${
              symbol.length > 35 && "invalid-counter"
            }`}
          >
            ({symbol.length} / 35)
          </p>
        )}
      </div>
      <Button type="submit" disabled={!formIsValid}>
        Search
      </Button>
    </form>
  );
};

export default Input;

import { useEffect, useReducer, useRef } from "react";

import { defaultInputState, inputReducer } from "./InputReducer/state";
import { validateInput } from "../../util/validate-input";

import InputSelect from "./InputSelect/InputSelect";
import InputCounter from "./InputCounter/InputCounter";
import Button from "../UI/Button/Button";
import Error from "../UI/Error/Error";

const Input = (props) => {
  const [state, dispatch] = useReducer(inputReducer, defaultInputState);
  const input = useRef(null);

  const validString = validateInput(state.string);
  const hasError = !validString.valid && state.isTouched;
  let formIsValid = false;

  if (validString.valid) {
    formIsValid = true;
  }

  useEffect(() => {
    if (!validString.valid) {
      dispatch({ type: "error", value: validString.message });
    }
    if (validString.valid) {
      dispatch({ type: "error", value: null });
    }
  }, [validString.valid, validString.message]);

  const resetInput = () => {
    dispatch({ type: "search", value: "" });
    dispatch({ type: "input_is_touched", value: false });
  };

  const handleInputFocus = () => {
    input.current.focus();
  };

  const searchHandler = (event) => {
    event.preventDefault();

    if (!validString.valid) {
      return;
    }

    props.onSearch(state.searchFor, state.string);
    resetInput();
  };

  const placeHolderText =
    state.searchFor === "profile"
      ? "Enter a string of the company, ex.: AAPL"
      : "Enter a name of the company, ex.: Apple";

  return (
    <form onSubmit={searchHandler} className="form">
      {hasError && <Error message={state.error} className="input-error" />}
      <InputSelect hasError={hasError} dispatch={dispatch} />
      <input
        type="text"
        className={hasError ? "valid invalid" : "valid"}
        placeholder={placeHolderText}
        value={state.string}
        maxLength={40}
        ref={input}
        onFocus={() => dispatch({ type: "input_is_touched", value: true })}
        onChange={(e) => dispatch({ type: "search", value: e.target.value })}
        onBlur={() => dispatch({ type: "input_is_touched", value: false })}
      />
      <InputCounter
        isTouched={state.isTouched}
        onInputFocus={handleInputFocus}
        length={state.string.length}
        hasError={hasError}
      />
      <Button type="submit" disabled={!formIsValid}>
        Search
      </Button>
    </form>
  );
};

export default Input;

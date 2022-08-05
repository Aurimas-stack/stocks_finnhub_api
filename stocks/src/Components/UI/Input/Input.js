import { useState, useEffect, useRef } from "react";

import { validateInput } from "../../../util/validate-input";

import Button from "../Button/Button";
import Error from "../Error/Error";

const Input = (props) => {
  const [string, setString] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState(null);
  const [searchFor, setSearchFor] = useState("profile");
  const input = useRef(null);

  const validString = validateInput(string);
  const hasError = !validString.valid && isTouched;

  let formIsValid = false;

  if (validString.valid) {
    formIsValid = true;
  }
  useEffect(() => {
    if (!validString.valid) {
      setError(validString.message);
    }
    if (validString.valid) {
      setError(null);
    }
  }, [validString.valid, validString.message]);

  const resetInput = () => {
    setString("");
    setIsTouched(false);
  };

  const handleInputFocus = () => {
    input.current.focus();
  };

  const searchHandler = (event) => {
    event.preventDefault();

    if (!validString.valid) {
      return;
    }

    props.onSearch(searchFor, string);
    resetInput();
  };

  const counterContStyles = `letter-count-container 
   ${hasError && "invalid-counter-container"}`;

  const counterStyles = `letter-counter ${
    string.length > 35 && "invalid-counter"
  }`;

  const selectStyles = `search-by-opt 
  ${hasError && "invalid-search-by-opt"}`;

  const placeHolderText =
    searchFor === "profile"
      ? "Enter a string of the company, ex.: AAPL"
      : "Enter a name of the company, ex.: Apple";

  return (
    <form onSubmit={searchHandler} className="form">
      {hasError && <Error message={error} className="input-error" />}
      <select
        name="search-by-opt"
        className={selectStyles}
        onChange={(e) => setSearchFor(e.target.value)}
        >
        <option value="profile">Company Profile</option>
        <option value="symbol">Symbol</option>
      </select>
      <input
        type="text"
        className={hasError ? "valid invalid" : "valid"}
        placeholder={placeHolderText}
        value={string}
        maxLength={40}
        ref={input}
        onFocus={() => setIsTouched(true)}
        onChange={(e) => setString(e.target.value)}
        onBlur={() => setIsTouched(false)}
      />
      <div className={counterContStyles} onClick={handleInputFocus}>
        {isTouched && <p className={counterStyles}>({string.length} / 35)</p>}
      </div>
      <Button type="submit" disabled={!formIsValid}>
        Search
      </Button>
    </form>
  );
};

export default Input;

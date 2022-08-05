const InputSelect = (props) => {
  const selectStyles = `search-by-opt 
  ${props.hasError && "invalid-search-by-opt"}`;

  return (
    <select
      name="search-by-opt"
      className={selectStyles}
      onChange={(e) =>
        props.dispatch({ type: "search_for", value: e.target.value })
      }
    >
      <option value="profile">Company Profile</option>
      <option value="symbol">Symbol</option>
    </select>
  );
};

export default InputSelect;

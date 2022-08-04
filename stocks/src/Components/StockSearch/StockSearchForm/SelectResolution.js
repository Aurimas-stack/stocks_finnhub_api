const SelectResolution = (props) => {
  return (
    <select
      name="resolution"
      className="resolution"
      onChange={(e) => props.onPickResolution(e.target.value)}
      defaultValue="D"
    >
      <option value="1" >1</option>
      <option value="5">5</option>
      <option value="15">15</option>
      <option value="30">30</option>
      <option value="60">60</option>
      <option value="D">D</option>
      <option value="W">W</option>
      <option value="M">M</option>
    </select>
  );
};

export default SelectResolution;

import { useState } from "react";

import { dateToday } from "../../../util/date-today";
import { getUnixDate } from "../../../util/unix-date";

import SelectResolution from "./SelectResolution";
import Button from "../../UI/Button/Button";

const StockSearchForm = (props) => {
  const [startDate, setStartDate] = useState(dateToday());
  const [endDate, setEndDate] = useState(dateToday());
  const [resolution, setResolution] = useState("D");

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onStockSearch({
      resolution: resolution,
      from: getUnixDate(startDate),
      to: getUnixDate(endDate),
    });
  };

  return (
    <form className="date-input-container">
      <div className="date-input">
        <label htmlFor="start_date">Start date</label>
        <input
          type="date"
          name="start_date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="date-input">
        <label htmlFor="end_date">End date</label>
        <input
          type="date"
          name="end_date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="date-input">
        <label htmlFor="resolution">Resolution</label>
        <SelectResolution onPickResolution={setResolution}/>
      </div>
      <Button type="submit" onClick={handleSubmit}>
        Search Stock
      </Button>
    </form>
  );
};

export default StockSearchForm;

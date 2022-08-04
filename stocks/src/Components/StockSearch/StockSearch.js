import { useState } from "react";

import Modal from "../UI/Modal/Modal";
import CloseIcon from "../UI/Icons/CloseIcon";
import StockSearchForm from "./StockSearchForm/StockSearchForm";
import Spinner from "../UI/Spinner/Spinner";
import Error from "../UI/Error/Error";
import StockChart from "./StockChart";

import { converStockData } from "../../util/convert-stock-data";
import { getResponse } from "../../util/get-response";

const StockSearch = (props) => {
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCandles, setShowCandles] = useState(true);

  const handleStockSearch = async (options) => {
    setIsLoading(true);
    const stockInformation = {
      symbol: props.symbol,
      resolution: options.resolution,
      from: options.from,
      to: options.to,
    };
    try {
      const response = await getResponse("stock", stockInformation);
      const data = await response.json();
      if (data.s === "no_data") {
        setError("Data was not found!");
        return;
      }
      setStockData([converStockData(data)]);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleChartSwitch = () => {
    setShowCandles((prevState) => {
      return !prevState;
    });
  };

  let content;

  if (isLoading) {
    content = <Spinner className="stock-loader" />;
  }

  if (error) {
    content = <Error message={error} className="error-msg" />;
  }

  if (stockData.length > 0) {
    content = (
      <StockChart
        data={stockData}
        symbol={props.symbol}
        showCandles={showCandles}
        onChartSwitch={handleChartSwitch}
      />
    );
  }

  return (
    <Modal onClose={props.onClose}>
      <div className="stock-search-container">
        <h1 className="stock-search-title">{props.name}</h1>
        <StockSearchForm onStockSearch={handleStockSearch} />
        {content}
      </div>
      <CloseIcon onClose={props.onClose} />
    </Modal>
  );
};

export default StockSearch;

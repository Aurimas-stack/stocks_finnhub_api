import { useReducer } from "react";

import {
  defaultStockSearchState,
  stockSearchReducer,
} from "./StockSearchReducer/state";

import { converStockData } from "../../util/convert-stock-data";
import { getResponse } from "../../util/get-response";
import { sendData } from "../../util/send-data";

import Modal from "../UI/Modal/Modal";
import CloseIcon from "../UI/Icons/CloseIcon";
import StockSearchForm from "./StockSearchForm/StockSearchForm";
import Spinner from "../UI/Spinner/Spinner";
import ErrorMsg from "../UI/Error/ErrorMsg";
import StockChart from "./StockChart";


const StockSearch = (props) => {
  const [state, dispatch] = useReducer(
    stockSearchReducer,
    defaultStockSearchState
  );

  const handleStockSearch = async (options) => {
    dispatch({ type: "load", value: true });
    const stockInformation = {
      symbol: props.symbol,
      resolution: options.resolution,
      from: options.from,
      to: options.to,
    };

    try {
      const response = await getResponse("stock", stockInformation);
      if (!response.ok) {
        const status =
          response.status === 403
            ? `You don't have access to this resource (${response.status})`
            : `${response.status} Error`;
        throw new Error(status);
      }
      const data = await response.json();
      if (data.s === "no_data") {
        throw new Error("Data was not found!");
      }
      const convertedData = converStockData(data);
      dispatch({ type: "set_stocks", value: convertedData });
      sendData({
        name: props.name,
        price: convertedData[0].candle
      });
    } catch (error) {
      dispatch({ type: "handle_error", value: error.message });
    }
    dispatch({ type: "load", value: false });
  };

  const handleChartSwitch = () => {
    dispatch({ type: "show_candles", value: !state.showCandles });
  };

  let content;

  if (state.isLoading) {
    content = <Spinner className="stock-loader" />;
  }

  if (state.error) {
    content = <ErrorMsg message={state.error} className="error-msg" />;
  }

  if (state.stockData.length > 0) {
    content = (
      <StockChart
        data={state.stockData}
        symbol={props.symbol}
        showCandles={state.showCandles}
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

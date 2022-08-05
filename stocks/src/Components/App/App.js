import { useReducer } from "react";

import { defaultAppState, appReducer } from "./AppReducer/state";
import { getResponse } from "../../util/get-response";

import Spinner from "../UI/Spinner/Spinner";
import Error from "../UI/Error/Error";
import Input from "../Input/Input";
import CompanyProfile from "../CompanyProfile/CompanyProfile";
import StockSearch from "../StockSearch/StockSearch";
import SymbolLookUp from "../SymbolLookUp/SymbolLookUp";

import "../../styles/styles.scss";

function App() {
  const [state, dispatch] = useReducer(appReducer, defaultAppState);

  const handleSearch = async (searchFor, searchItem) => {
    dispatch({ type: "load", value: true });
    dispatch({ type: "error", value: null });
    if (searchFor === "profile") {
      dispatch({ type: "show_company_profile", value: true });
    }
    if (searchFor === "symbol") {
      dispatch({ type: "show_symbol_search", value: true });
    }

    try {
      const response = await getResponse(searchFor, searchItem);
      if (!response.ok) {
        dispatch({ type: "error", value: "Something went wrong!" });
        return;
      }
      const data = await response.json();
      if (typeof data === "object" && Object.keys(data).length === 0) {
        dispatch({ type: "error", value: "No data was found!" });
        dispatch({ type: "load", value: false });
        return;
      }
      dispatch({ type: "set_data", value: [data] });
    } catch (error) {
      dispatch({ type: "error", value: error.message });
      dispatch({ type: "load", value: false });
      dispatch({ type: "set_data", value: [] });
    }
    dispatch({ type: "did_search", value: true });
    dispatch({ type: "load", value: false });
  };

  const handleOpenStockSearch = () => {
    dispatch({ type: "show_stock_form", value: !state.isStockFormOpen });
  };

  const handleStockInfo = (name, symbol) => {
    dispatch({
      type: "set_stock_info",
      value: {
        name: name,
        symbol: symbol,
      },
    });
  };

  let content;

  if (state.error) {
    content = <Error message={state.error} className="search-error" />;
  }

  if (state.isLoading) {
    content = <Spinner />;
  }

  if (!state.isLoading && state.didSearch && state.showCompanyProfile) {
    content = (
      <CompanyProfile
        data={state.data}
        onOpenStockSearch={handleOpenStockSearch}
        onStockInfo={handleStockInfo}
      />
    );
  }

  if (!state.isLoading && state.didSearch && state.showSymbolSearch) {
    content = (
      <SymbolLookUp
        data={state.data}
        onOpenStockSearch={handleOpenStockSearch}
        onStockInfo={handleStockInfo}
      />
    );
  }

  return (
    <div className="app">
      <Input onSearch={handleSearch} />
      {content}
      {state.isStockFormOpen && (
        <StockSearch
          onClose={handleOpenStockSearch}
          name={state.stockInfo.name}
          symbol={state.stockInfo.symbol}
        />
      )}
    </div>
  );
}

export default App;

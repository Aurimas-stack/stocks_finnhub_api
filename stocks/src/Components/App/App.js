import { useReducer } from "react";

import { defaultAppState, appReducer } from "./AppReducer/state";
import { getResponse } from "../../util/get-response";

import Spinner from "../UI/Spinner/Spinner";
import ErrorMsg from "../UI/Error/ErrorMsg";
import Input from "../Input/Input";
import CompanyProfile from "../CompanyProfile/CompanyProfile";
import StockSearch from "../StockSearch/StockSearch";
import SymbolLookUp from "../SymbolLookUp/SymbolLookUp";

import "../../styles/styles.scss";

function App() {
  const [state, dispatch] = useReducer(appReducer, defaultAppState);

  const handleSearch = async (searchFor, searchItem) => {
    dispatch({ type: "start_search" });

    if (searchFor === "profile") {
      dispatch({ type: "show_company_profile", value: true });
    }
    if (searchFor === "symbol") {
      dispatch({ type: "show_symbol_search", value: true });
    }

    try {
      const response = await getResponse(searchFor, searchItem);
      if (!response.ok) {
        throw new Error(`${response.status} Error`);
      }
      const data = await response.json();
      if (typeof data === "object" && Object.keys(data).length === 0) {
        throw new Error("No data was found!");
      }
      dispatch({ type: "set_data", value: [data] });
    } catch (error) {
      dispatch({ type: "handle_error", value: error.message });
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
  const searched = !state.isLoading && state.didSearch;

  if (state.error) {
    content = <ErrorMsg message={state.error} className="search-error" />;
  }

  if (state.isLoading) {
    content = <Spinner />;
  }

  if (searched && state.showCompanyProfile) {
    content = (
      <CompanyProfile
        data={state.data}
        onOpenStockSearch={handleOpenStockSearch}
        onStockInfo={handleStockInfo}
      />
    );
  }

  if (searched && state.showSymbolSearch) {
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

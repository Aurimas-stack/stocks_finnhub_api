import { useState } from "react";

import { getResponse } from "./util/get-response";

import Spinner from "./Components/UI/Spinner/Spinner";
import Error from "./Components/UI/Error/Error";
import Input from "./Components/Input/Input";
import CompanyProfile from "./Components/CompanyProfile/CompanyProfile";
import StockSearch from "./Components/StockSearch/StockSearch";
import SymbolLookUp from "./Components/SymbolLookUp/SymbolLookUp";

import "./styles/styles.scss";

function App() {
  const [data, setData] = useState([]);
  const [stockInfo, setStockInfo] = useState({ name: "", symbol: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [didSearch, setDidSearch] = useState(false);
  const [isStockFormOpen, setIsStockFormOpen] = useState(false);
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);
  const [showSymbolSearch, setShowSymbolSearch] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchFor, searchItem) => {
    setIsLoading(true);
    if (searchFor === "profile") {
      setShowCompanyProfile(true);
    }
    if (searchFor === "symbol") {
      setShowSymbolSearch(true);
    }
    setError(null);
    try {
      const response = await getResponse(searchFor, searchItem);
      if (!response.ok) {
        setError("Something went wrong!");
        return;
      }
      const data = await response.json();
      if (typeof data === "object" && Object.keys(data).length === 0) {
        setError("No data was found!");
        setData([])
        setIsLoading(false);
        return;
      }
      setData([data]);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      setData([]);
    }
    setDidSearch(true);
    setIsLoading(false);
  };

  const handleOpenStockSearch = () => {
    setIsStockFormOpen((prevState) => {
      return !prevState;
    });
  };

  const handleStockInfo = (name, symbol) => {
    setStockInfo({
      name: name,
      symbol: symbol,
    });
  };

  let content;

  if (error) {
    content = <Error message={error} className="search-error" />;
  }

  if (isLoading) {
    content = <Spinner />;
  }

  if (!isLoading && didSearch && showCompanyProfile) {
    content = (
      <CompanyProfile
        data={data}
        onOpenStockSearch={handleOpenStockSearch}
        onStockInfo={handleStockInfo}
      />
    );
  }

  if (!isLoading && didSearch && showSymbolSearch) {
    content = (
      <SymbolLookUp
        data={data}
        onOpenStockSearch={handleOpenStockSearch}
        onStockInfo={handleStockInfo}
      />
    );
  }

  return (
    <div className="app">
      <Input onSearch={handleSearch} />
      {content}
      {isStockFormOpen && (
        <StockSearch
          onClose={handleOpenStockSearch}
          name={stockInfo.name}
          symbol={stockInfo.symbol}
        />
      )}
    </div>
  );
}

export default App;

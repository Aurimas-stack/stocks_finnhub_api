import { useState } from "react";

import { getResponse } from "./util/get-response";

import Spinner from "./Components/UI/Spinner/Spinner";
import Input from "./Components/UI/Input/Input";
import CompanyProfile from "./Components/CompanyProfile/CompanyProfile";
import StockSearch from "./Components/StockSearch/StockSearch";

import "./styles/styles.scss";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [didSearch, setDidSearch] = useState(false);
  const [isStockFormOpen, setIsStockFormOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleAPI = async (symbol) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getResponse("profile", symbol);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      if (typeof data === "object" && Object.keys(data).length === 0) {
        setData([]);
        setIsLoading(false);
        return;
      }
      setData([data]);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
    setDidSearch(true);
    setIsLoading(false);
  };

  const handleOpenStockSearch = () => {
    setIsStockFormOpen((prevState) => {
      return !prevState;
    });
  };

  const test = [
    {
      name: "Company One Inc.",
      country: "US",
      currency: "USD",
      weburl: "www.testPage.com",
    },
  ];

  console.log(data[0])
  return (
    <div className="app">
      {isStockFormOpen && (
        <StockSearch
          onClose={handleOpenStockSearch}
          name={data[0].name}
          symbol={data[0].ticker}
        />
      )}
      <Input onSymbolSearch={handleAPI} setError={setError} error={error} />
      {isLoading ? (
        <Spinner />
      ) : (
        didSearch && (
          <CompanyProfile
            data={data}
            onOpenStockSearch={handleOpenStockSearch}
          />
        )
      )}
    </div>
  );
}

export default App;

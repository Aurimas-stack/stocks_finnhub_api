import Button from "react-bootstrap/Button";
import Card from "../UI/Card/Card";

const SymbolLookUp = (props) => {
  const count = props.data[0].count;
  return (
    <Card className="symbol-lookup">
      <p className="lookup-count">
        Amount of companies found: <span>{count}</span>
      </p>
      <div className="lookup-items">
        <ul>
          {props.data[0].result.map((item, key) => {
            return (
              <li key={key} className="lookup-item-cont">
                <p className="lookup-item-numb">{key + 1}</p>
                <div className="lookup-item-desc">
                  <p>
                    <span>Name of the company: </span>
                    {item.description}
                  </p>
                  <p>
                    <span>Symbol: </span>
                    <Button
                      variant="primary"
                      className="lookup-btn"
                      onClick={() => {
                        props.onStockInfo(item.description, item.symbol);
                        props.onOpenStockSearch();
                      }}
                    >
                      {item.symbol}
                    </Button>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
};

export default SymbolLookUp;

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const CompanyProfile = (props) => {
  return (
    <Card className="company-profile">
      <Button
        onClick={() => {
          props.onStockInfo(props.data[0].name, props.data[0].ticker);
          props.onOpenStockSearch();
        }}
      >
        {props.data[0].name} stocks
      </Button>
      <h3>
        Country: <span>{props.data[0].country}</span>
      </h3>
      <h3>
        Currency: <span>{props.data[0].currency}</span>
      </h3>
      <h3>
        Web Url:{" "}
        <span>
          <a href={props.data[0].weburl}>{props.data[0].weburl}</a>
        </span>
      </h3>
    </Card>
  );
};

export default CompanyProfile;

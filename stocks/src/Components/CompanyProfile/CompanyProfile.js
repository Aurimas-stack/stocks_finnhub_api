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
        {props.data[0].name}
      </Button>
      <h3>Country: {props.data[0].country}</h3>
      <h3>Currency: {props.data[0].currency}</h3>
      <h3>
        Web Url: <a href={props.data[0].weburl}>{props.data[0].weburl}</a>
      </h3>
    </Card>
  );
};

export default CompanyProfile;

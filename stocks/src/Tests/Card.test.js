import { render, cleanup } from "@testing-library/react";
import Card from "../Components/UI/Card/Card";


jest.mock("../Components/UI/Error/ErrorMsg", () => ({
  ErrorMsg: () => {
    return <Mock-errorMsg />;
  },
}));

describe("Testing Card component", () => {
  afterEach(() => {
    cleanup();
  });
  
  it("should render a spinner", () => {
    const { container } = render(<Card></Card>);
    expect(container.getElementsByClassName("card").length).toBe(1);
  });

  it("should have a className 'spinner' ", () => {
    const { container } = render(<Card></Card>);
    expect(container.firstChild).toHaveClass("card");
  });

  it("should render another element", () => {
    const { container } = render(
      <Card>
        <p>Test</p>
      </Card>
    );
    expect(container).toContainHTML(
      "<div><div class='card undefined'><p>Test</p></div></div>"
    );
  });

  it("should render another component", () => {
    const { container } = render(
      <Card>
        <Mock-errorMsg />
      </Card>
    );
    expect(container).toContainHTML(
      "<div><div class='card undefined'><mock-errormsg /></div></div>"
    );
  });

  it("should have an additional className", () => {
    const { container } = render(<Card className="second"></Card>);
    expect(container.firstChild).toHaveClass("card second", { exact: true });
  });
});

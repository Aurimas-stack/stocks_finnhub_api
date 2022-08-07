import { render, cleanup, screen } from "@testing-library/react";
import Button from "../Components/UI/Button/Button";

describe("Testing Button component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render a spinner", () => {
    const { container } = render(<Button></Button>);
    expect(container.getElementsByClassName("button").length).toBe(1);
  });

  it("should have a className 'spinner' ", () => {
    const { container } = render(<Button></Button>);
    expect(container.firstChild).toHaveClass("button");
  });

  it("should have an additional className", () => {
    const { container } = render(<Button className="second"></Button>);
    expect(container.firstChild).toHaveClass("button second", { exact: true });
  });

  it("should render a text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});

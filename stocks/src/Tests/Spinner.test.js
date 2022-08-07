import { render, cleanup } from "@testing-library/react";
import Spinner from "../Components/UI/Spinner/Spinner";

describe("Testing Spinner component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render a spinner", () => {
    const { container } = render(<Spinner />);
    expect(container.getElementsByClassName("spinner").length).toBe(1);
  });

  it("should have a className 'spinner' ", () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toHaveClass("spinner");
  });

  it("should have an additional className", () => {
    const { container } = render(<Spinner className="second" />);
    expect(container.firstChild).toHaveClass("spinner second", { exact: true });
  });
});

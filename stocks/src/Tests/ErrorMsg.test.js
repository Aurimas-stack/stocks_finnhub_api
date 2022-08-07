import { render, screen, cleanup } from "@testing-library/react";
import ErrorMsg from "../Components/UI/Error/ErrorMsg";

describe("Testing ErrorMsg component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render ErrorMsg component", () => {
    const { container } = render(<ErrorMsg message="error" />);
    expect(container.getElementsByClassName("message").length).toBe(1);
  });

  it("should have 'error' as a message", () => {
    render(<ErrorMsg message="error" />);
    expect(screen.getByText("error")).toBeInTheDocument();
  });

  it("should not have a 'message' property", () => {
    const { container } = render(<ErrorMsg />);
    expect(container).not.toHaveAttribute(
      "message",
      expect.not.stringContaining("message")
    );
  });

  it("should have a className 'message' ", () => {
    const { container } = render(<ErrorMsg message="error" />);
    expect(container.firstChild).toHaveClass("message");
  });

  it("should have an additional className", () => {
    const { container } = render(
      <ErrorMsg className="second" message="error" />
    );
    expect(container.firstChild).toHaveClass("message second", { exact: true });
  });
});

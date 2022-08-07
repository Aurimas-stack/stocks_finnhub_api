import { render, cleanup, screen } from "@testing-library/react";
import CloseIcon from "../Components/UI/Icons/CloseIcon";

describe("Testing CloseIcon component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render CloseIcon component", () => {
    const { container } = render(<CloseIcon />);
    expect(container.getElementsByClassName("close-icon").length).toBe(1);
    expect(container.firstChild).toBeInTheDocument();
  });

});

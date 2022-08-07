import { render, screen, cleanup } from "@testing-library/react";
import { appReducer } from "../Components/App/AppReducer/state";
import App from "../Components/App/App";

describe("Testing App Component", () => {
  afterEach(() => {
    cleanup();
  });
  
  it("should render elements", () => {
    const { container } = render(<App />);
    expect(container.getElementsByClassName("app").length).toBe(1);
    expect(container.getElementsByClassName("form").length).toBe(1);
    expect(container.getElementsByClassName("input-container").length).toBe(1);
    expect(container.getElementsByClassName("valid").length).toBe(1);
    expect(container.getElementsByClassName("search-by-opt").length).toBe(1);
    expect(
      container.getElementsByClassName("letter-count-container").length
    ).toBe(1);
    expect(container.getElementsByClassName("button").length).toBe(1);
  });

  it("it sets default state", () => {
    expect(appReducer(undefined, {})).toEqual({
      data: [],
      stockInfo: { name: "", symbol: "" },
      isLoading: false,
      didSearch: false,
      isStockFormOpen: false,
      showCompanyProfile: false,
      showSymbolSearch: false,
      error: null,
    });
  });

  
});

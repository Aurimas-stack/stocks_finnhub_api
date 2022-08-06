export const defaultStockSearchState = {
  stockData: [],
  isLoading: false,
  showCandles: true,
  error: null,
};

export const stockSearchReducer = (state, action) => {
  switch (action.type) {
    case "set_stocks":
      return { ...state, stockData: action.value };
    case "load":
      return { ...state, isLoading: action.value };
    case "show_candles":
      return { ...state, showCandles: action.value };
    case "handle_error":
      return { ...defaultStockSearchState, error: action.value};;
    default:
      return defaultStockSearchState;
  }
};

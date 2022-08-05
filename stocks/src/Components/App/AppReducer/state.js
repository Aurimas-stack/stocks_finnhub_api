export const defaultAppState = {
  data: [],
  stockInfo: { name: "", symbol: "" },
  isLoading: false,
  didSearch: false,
  isStockFormOpen: false,
  showCompanyProfile: false,
  showSymbolSearch: false,
  error: null,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "set_data":
      return { ...state, data: action.value };
    case "set_stock_info":
      return { ...state, stockInfo: action.value };
    case "load":
      return { ...state, isLoading: action.value };
    case "did_search":
      return { ...state, didSearch: action.value };
    case "show_stock_form":
      return { ...state, isStockFormOpen: action.value };
    case "show_company_profile":
        return { ...state, showCompanyProfile: action.value };
    case "show_symbol_search":
      return { ...state, showSymbolSearch: action.value };
    case "error":
      return { ...state, error: action.value };
    default:
      return defaultAppState;
  }
};

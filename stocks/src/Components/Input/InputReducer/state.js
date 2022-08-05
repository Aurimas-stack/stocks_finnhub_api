export const defaultInputState = {
    string: "",
    searchFor: "profile",
    isTouched: false,
    error: null
};

export const inputReducer = (state, action) => {
    switch(action.type) {
        case "search":
            return { ...state, string: action.value};
        case "search_for":
            return { ...state, searchFor: action.value};
        case "input_is_touched":
            return { ...state, isTouched: action.value};
        case "error":
            return { ...state, error: action.value};
        default: 
            return defaultInputState;
    }
};
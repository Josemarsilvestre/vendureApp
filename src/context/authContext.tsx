import createContext from "./createContext";

const initialState = {
  isLogged: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "isLogged":
      return { ...state, isLogged: action.payload };
    default:
      return state;
  }
};


const setIsLogged = (dispatch) => {
  return (boolean) => {
    dispatch({ type: "isLogged", payload: boolean });
  };
};

export const { Context, Provider } = createContext(
  reducer,
  { setIsLogged },
  initialState,
);
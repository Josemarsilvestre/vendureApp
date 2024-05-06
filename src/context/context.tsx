// authContext.tsx
import createContext from "./createContext";

interface AuthState {
  isLogged: boolean;
  maxPrice: string;
  minPrice: string;
}

interface UpdateFilterPayload {
  name: string;
  value: boolean | string;
}

interface ResetFilterPayload {
  maxPrice: string;
  minPrice: string;
}

interface LoadFiltersPayload {
  price?: string;
}

type AuthAction =
  | { type: "isLogged"; payload: boolean }
  | { type: "updateFilter"; payload: UpdateFilterPayload }
  | { type: "resetFilter"; payload: ResetFilterPayload }
  | { type: "loadFilters"; payload: LoadFiltersPayload };

const initialState: AuthState = {
  isLogged: false,
  maxPrice: "0",
  minPrice: "0",
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "isLogged":
      return { ...state, isLogged: action.payload };
    case "updateFilter":
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case "resetFilter":
      const { maxPrice, minPrice } = action.payload;
      return { ...initialState, maxPrice, minPrice };
    case "loadFilters":
      const newState = { ...state };
      if (action.payload.price) {
        const [min, max] = action.payload.price.split("-");
        newState.minPrice = min;
        newState.maxPrice = max;
      }
      return newState;
    default:
      return state;
  }
};

const actionCreators = {
  setIsLogged: (dispatch: React.Dispatch<AuthAction>) => (boolean: boolean) => {
    dispatch({ type: "isLogged", payload: boolean });
  },
  updateFilter: (dispatch: React.Dispatch<AuthAction>) => (name: string, value: boolean | string) => {
    dispatch({ type: "updateFilter", payload: { name, value } });
  },
  resetFilter: (dispatch: React.Dispatch<AuthAction>) => (maxPrice: string, minPrice: string) => {
    dispatch({ type: "resetFilter", payload: { maxPrice, minPrice } });
  },
  loadFilters: (dispatch: React.Dispatch<AuthAction>) => (price?: string) => {
    dispatch({ type: "loadFilters", payload: { price } });
  },
};

const mappedActionCreators = Object.keys(actionCreators).reduce((acc, key) => {
  acc[key] = (...args: any[]) => actionCreators[key](...args);
  return acc;
}, {} as { [key: string]: (...args: any[]) => AuthAction });

export const { Context, Provider } = createContext({
  reducer,
  actions: mappedActionCreators,
  initialState
});

import { Product } from "../types/product";

// Reducer állapotok
interface State {
  details: Product | null;
  loading: boolean;
  error: string | null;
}

// Reducer álltal kezelt akciók
type Action =
  | { type: "FETCH_DETAILS_REQUEST" }
  | { type: "FETCH_DETAILS_SUCCESS"; payload: Product }
  | { type: "FETCH_DETAILS_FAILURE"; payload: string };

// Kezdő értékek
export const initialState: State = {
  details: null,
  loading: false,
  error: null,
};

// A reducer függvény kezeli az állapot változását az akciók hatására
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_DETAILS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_DETAILS_SUCCESS":
      return { ...state, loading: false, details: action.payload };
    case "FETCH_DETAILS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

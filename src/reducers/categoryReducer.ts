import { Categories } from "../types/category";

interface State {
  categories: Categories;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "FETCH_CATEGORIES_REQUEST" }
  | { type: "FETCH_CATEGORIES_SUCCESS"; payload: Categories }
  | { type: "FETCH_CATEGORIES_FAILURE"; payload: string };

export const initialState: State = {
  categories: [],
  loading: false,
  error: null,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_CATEGORIES_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_CATEGORIES_SUCCESS":
      return { ...state, loading: false, categories: action.payload };
    case "FETCH_CATEGORIES_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

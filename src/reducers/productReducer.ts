// reducer.ts

import { Product } from "../types/product";

interface State {
  products: Product[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "FETCH_PRODUCTS_REQUEST" }
  | { type: "FETCH_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "FETCH_PRODUCTS_FAILURE"; payload: string };

export const initialState: State = {
  products: [],
  loading: false,
  error: null,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

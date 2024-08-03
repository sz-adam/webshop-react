import { Categories } from "../types/category";
import { Product } from "../types/product";

//api url
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
//details endpoint
export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

//összes kategória lekérése
export async function fetchCategory(): Promise<Categories> {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

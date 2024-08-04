import Home from "./pages/Home";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Favorites from "./pages/Favourites";
import { FavoritesProvider } from "./context/FavouritesContext";
import { CartProvider } from "./context/CartContext";

const pages = [
  { name: "Home", path: "/", menubar: true, element: <Home /> },
  {
    name: "Favorites",
    path: "/favorites",
    menubar: true,
    element: <Favorites />,
  },
  {
    name: "Details",
    path: "/details/:id",
    menubar: false,
    element: <Details />,
  },
  { name: "Cart", path: "/cart", menubar: true, element: <Cart /> },
  { name: "NotFound", path: "*", menubar: false, element: <PageNotFound /> },
];

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="w-full">
          <BrowserRouter>
            <Navbar menu={pages} />
            <Content routes={pages} />
          </BrowserRouter>
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;

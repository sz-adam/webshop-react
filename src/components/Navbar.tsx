import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavouritesContext";
import { useCart } from "../context/CartContext";

interface MenuItem {
  name: string;
  path: string;
  menubar: boolean;
}

interface NavbarProps {
  menu: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ menu }) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();
  return (
    <nav className="bg-gradient-to-t from-gray-600 to-slate-800 shadow-md">
      <div className="flex justify-between items-center p-4">
        {/* Brand */}
        <div className="text-white text-2xl font-bold flicker">
          <Link to="/">
            <h1>Webshop</h1>
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="flex space-x-6">
          {menu
            .filter((e) => e.menubar)
            .map((element) => (
              <Link
                key={element.path}
                to={element.path}
                className="text-white hover:text-yellow-400 transition duration-300 ease-in-out font-bold"
              >
                {element.name}
                {element.path === "/favorites" && favorites.length > 0 && (
                  <> ({favorites.length})</>
                )}
                {element.path === "/cart" && cart.length > 0 && (
                  <> ({cart.length})</>
                )}
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

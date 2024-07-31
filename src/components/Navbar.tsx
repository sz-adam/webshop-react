import React from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
  menubar: boolean;
}

interface NavbarProps {
  menu: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ menu }) => {
  return (
    <nav className="bg-gradient-to-t from-gray-600 to-slate-800 shadow-md">
      <div className="flex justify-between items-center p-4">
        {/* Brand */}
        <div className="text-white text-2xl font-bold flicker">
          <h1>Webshop</h1>
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
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

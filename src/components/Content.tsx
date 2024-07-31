import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";

interface RouteType {
  name: string;
  path: string;
  menubar: boolean;
  element: React.ReactElement;
}

interface ContentProps {
  routes: RouteType[];
}

const Content: React.FC<ContentProps> = ({ routes }) => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Content;

import React from "react";
import { Link } from "react-router-dom";
import { SiBasicattentiontoken } from "react-icons/si";

const PageNotFound: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-9xl font-semibold text-red-500">404</h1>
      <p className="mb-4 text-lg text-gray-600">
        Oops! Looks like you're lost.
      </p>
      <div className="animate-bounce">
        <SiBasicattentiontoken className="mx-auto h-16 w-16 text-red-500" />
      </div>
      <p className="mt-4 text-gray-600">
        Let's get you back{" "}
        <Link to="/" className="text-blue-500">
          home
        </Link>
        .
      </p>
    </div>
  );
};

export default PageNotFound;

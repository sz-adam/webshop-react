import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

interface StarProps {
  rating: number;
  count: number;
}

const Star: React.FC<StarProps> = ({ rating, count }) => {
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <FaStar />
        ) : rating >= number ? (
          <FaStarHalfAlt />
        ) : (
          <AiOutlineStar />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center">
      <div className="flex space-x-1 text-yellow-400">{ratingStar}</div>
      <p className="ml-2 text-sm font-medium text-gray-500 ">
        {rating.toFixed(1)}
      </p>
      <span className="ml-2 text-sm text-gray-500">({count} reviews)</span>
    </div>
  );
};

export default Star;

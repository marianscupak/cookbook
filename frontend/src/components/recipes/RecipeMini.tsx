import React, { MouseEvent, useRef, useState } from "react";
import { Recipe } from "../../state/types";

const RecipeMini = ({ recipe }: { recipe: Recipe }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  let interval: any = useRef();

  const handleHover = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    interval.current = window.setInterval(() => {
      setImageIndex((index) => (index + 1) % recipe.images.length);
    }, 3000);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    clearInterval(interval.current);
  };

  return (
    <div
      className="recipe-miniature"
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <h2>{recipe.name}</h2>
      <img
        src={`http://localhost:5000/${recipe._id}/${recipe.images[imageIndex]}`}
      />
      <div className="shadow"></div>
      {isHovered ? <p>{recipe.description}</p> : ""}
      <button className="detail">Detail</button>
    </div>
  );
};

export default RecipeMini;

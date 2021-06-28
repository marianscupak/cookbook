import React, { useState } from "react";
import RightArrow from "../../../public/right-arrow.svg";

const ImageSlider = ({ images, id }: { images: string[]; id: string }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent((current + 1) % length);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="slider">
      <img
        src={RightArrow.toString()}
        alt="Previous Image"
        className="arrow left-arrow"
        onClick={prevSlide}
      />
      <img
        src={RightArrow.toString()}
        alt="Next Image"
        className="arrow right-arrow"
        onClick={nextSlide}
      />
      {images.map((val, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={val}
          >
            {index === current && (
              <img
                src={`http://localhost:5000/${id}/${val}`}
                alt="Food"
                className="image"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageSlider;

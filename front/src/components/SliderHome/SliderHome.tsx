/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

const images: string[] = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
];

export function SliderHome() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container relative w-full h-[400px] overflow-hidden">
      <div
        className="carousel-inner flex transition-transform duration-500 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}vw)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-screen h-full">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-full z-10 hover:scale-150 hover:text-customPink transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2  px-3 py-1 rounded-full z-10 hover:scale-150 hover:text-customPink transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="dots absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-customGreen" : "bg-customBlue"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

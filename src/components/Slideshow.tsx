"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
const Slideshow = () => {
  const images = ["/Pic5.jpg", "/Pic3.jpg", "/Pic4.jpg", "/Pic1.jpg"];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 1500);
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div>
        <Image
          src={images[index]}
          alt="Slider image"
          fill
          className={`object-cover	 transition-opacity duration-1500 ease-in ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
      </div>
    </>
  );
};

export default Slideshow;

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
const Slideshow = () => {
  const images = ["/Pic5.jpg", "/Pic4.jpg", "/Pic1.jpg"];
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
      <Image
        src={images[index]}
        alt="Slider image"
        width={800}
    height={600}
        className={`object-cover rounded-sm	 transition-opacity duration-1500 ease-in ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        priority
      />
    </>
  );
};

export default Slideshow;

import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from "gsap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./carousal.css"

function Carousel() {
  const { data, loading } = useContext(DataContext);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const titleRefs = useRef([]);
  const descRefs = useRef([]);
  const btnRefs = useRef([]);
  const sliderRef = useRef(null);

  const keepRef = (arr, el, i) => {
    if (el) arr.current[i] = el;
  };

  /* ----------- Optimized Animation ----------- */
  const animateSlide = (i) => {
    const items = [
      titleRefs.current[i],
      descRefs.current[i],
      btnRefs.current[i],
    ].filter(Boolean);

    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        overwrite: true,
      }
    );
  };

  /* ----------- Preload First Image ----------- */
  useEffect(() => {
    if (data?.length > 0) {
      const img = new Image();
      img.src = data[0].thumbnail;
      animateSlide(0);
    }
  }, [data]);

  /* ----------- Slider Settings ----------- */
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    arrows: false,
    lazyLoad: "ondemand",
    beforeChange: (_, next) => setActiveIndex(next),
    afterChange: (i) => animateSlide(i),
  };

  /* ----------- Skeleton Loader ----------- */
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {data.slice(0, 6).map((item, index) => (
          <div key={item.id}>
            <div
              className={`min-h-[93vh] flex items-center ${
                theme === "dark"
                  ? "bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
                  : "bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-100"
              }`}
            >
              <div className="max-w-6xl mx-auto mb-17  px-5 py-16 flex flex-col md:flex-row items-center justify-between gap-60">
                {/* TEXT */}
                <div className="max-w-xl  space-y-8 text-center md:text-left">
                  <h3
                    ref={(el) => keepRef(titleRefs, el, index)}
                    className="text-2xl font-semibold text-red-500"
                  >
                    Premium Electronics Collection
                  </h3>

                  <h1
                    className={`text-4xl fnt  tracking-tight sm:text-4xl md:text-6xl  ${
                      theme === "dark" ? "text-white" : "text-[#2e213c]"
                    }`}
                  >
                    {item.title}
                  </h1>
                  <p
                    ref={(el) => keepRef(descRefs, el, index)}
                    className={`text-sm  sm:text-base ${
                      theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {item.description}
                  </p>

                  <button
                    ref={(el) => keepRef(btnRefs, el, index)}
                    onClick={() => navigate(`/products/${item.id}`)}
                    className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                  >
                    View Product
                  </button>
                </div>

                {/* IMAGE */}
                <div className="flex justify-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    width={320}
                    height={320}
                    className="w-52 sm:w-64 md:w-80 aspect-square rounded-full shadow-2xl object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* CUSTOM ARROWS */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-20"
      >
        <FiChevronLeft className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-20"
      >
        <FiChevronRight className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
      </button>

      {/* THUMBNAILS */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 sm:gap-4">
        {data.slice(0, 6).map((item, idx) => (
          <div
            key={item.id}
            onClick={() => sliderRef.current?.slickGoTo(idx)}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full cursor-pointer transition-all duration-300 ${
              idx === activeIndex
                ? "ring-4 ring-[#16deca] scale-110"
                : "opacity-60"
            }`}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full rounded-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;

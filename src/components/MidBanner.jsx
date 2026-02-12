import React, { useRef, useEffect } from "react";
import banner from "../assets/banner1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";

const MidBanner = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const textRef = useRef([]);
  const containerRef = useRef(null);

  const goToProducts = () => {
    navigate("/products");
  };

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }

    if (textRef.current.length) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      } md:py-24 transition-colors duration-500`}
    >
      <div
        className="relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-[550px] md:h-[600px] overflow-hidden"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 md:rounded-2xl flex items-center justify-center">
          <div className="text-center text-white px-4" ref={containerRef}>
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg"
              ref={(el) => (textRef.current[0] = el)}
            >
              Next-Gen Electronics at Your Fingertips
            </h1>
            <p
              className="text-lg md:text-xl mb-6 drop-shadow-md"
              ref={(el) => (textRef.current[1] = el)}
            >
              Discover the latest tech innovations with unbeatable prices and
              free shipping on all orders.
            </p>

            {/* Button */}
            <Link to="/products">
              <button
                onClick={goToProducts}
                ref={(el) => (textRef.current[2] = el)}
                className="relative bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 md:py-3 md:px-8 rounded-lg overflow-hidden group transition-all duration-300"
              >
                <span className="relative z-10">Shop Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidBanner;

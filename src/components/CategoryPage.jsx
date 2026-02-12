import React, { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "../context/DataContext";
import { useParams, useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../assets/Loading4.webm";
import gsap from "gsap";

function CategoryPage() {
  const { categoryName } = useParams();
  const { data } = useContext(DataContext);
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const productRefs = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const filtered = data.filter(
      (product) =>
        product.category?.toLowerCase() === categoryName.toLowerCase(),
    );
    setCategoryProducts(filtered);
  }, [data, categoryName]);

  useEffect(() => {
    if (!categoryProducts.length || hasAnimated.current) return;

    gsap.set(productRefs.current, { opacity: 0, y: 40, scale: 0.92 });

    gsap.fromTo(
      productRefs.current,
      { opacity: 0, y: 40, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
      },
    );

    hasAnimated.current = true;
  }, [categoryProducts]);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "colored",
    style: {
      fontWeight: "500",
      borderRadius: "10px",
      padding: "6px 12px",
      fontSize: "14px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.title} added to cart!`, toastOptions);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 
        ${
          theme === "dark"
            ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-gray-900"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex-grow pb-16">
        {" "}
        {/* flex-grow + pb-16 for better spacing */}
        <h1 className="text-2xl font-bold my-6 capitalize">
          {categoryName} Products
        </h1>
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {categoryProducts.map((product, i) => (
              <div
                key={product.id}
                ref={(el) => (productRefs.current[i] = el)}
                className={`rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 
                  will-change-transform translate-z-0
                  ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
              >
                <div
                  className="w-full h-[200px] bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <img
                    src={product.thumbnail || product.image}
                    alt={product.title}
                    className="w-full h-full object-cover will-change-transform backface-hidden"
                    loading="lazy"
                  />
                </div>

                <div className="p-3 flex flex-col gap-1">
                  <h3
                    className={`font-semibold text-sm line-clamp-2 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {product.title}
                  </h3>
                  <p
                    className={`font-bold text-sm ${
                      theme === "dark" ? "text-yellow-400" : "text-gray-600"
                    }`}
                  >
                    ${product.price}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`mt-2 w-full flex justify-center items-center gap-1 py-1.5 rounded transition-all duration-300 text-sm 
                      ${
                        theme === "dark"
                          ? "bg-yellow-500 hover:bg-yellow-400 text-gray-900"
                          : "bg-teal-600 hover:bg-teal-500 text-white"
                      }`}
                  >
                    <IoCart /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[400px]">
            <video muted loop autoPlay>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default CategoryPage;

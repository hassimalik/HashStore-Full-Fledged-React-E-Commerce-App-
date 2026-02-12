import React, { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "../context/DataContext";
import { ThemeContext } from "../context/ThemeContext"; 
import FilterSection from "../components/FilterSection";
import Loading from "../assets/Loading4.webm";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { gsap } from "gsap";

function Products() {
  const { data, fetchAllProducts } = useContext(DataContext);
  const { theme } = useContext(ThemeContext); 
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const productsPerPage = 8;

  const productRefs = useRef([]); // array of refs
  const tl = useRef(gsap.timeline({ paused: true })); // better control

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...data].map(p => ({ ...p, price: Number(p.price) }));
    if (filters.searchText?.trim()) {
      const search = filters.searchText.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(search));
    }
    if (filters.priceRange?.length === 2 && filters.selectedPrice) {
      const [minPrice] = filters.priceRange;
      const maxPrice = Math.min(filters.selectedPrice, 500);
      result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);
    }
    if (filters.selectedCategories?.length > 0) {
      result = result.filter(p => filters.selectedCategories.includes(p.category));
    }
    if (filters.selectedBrand) {
      result = result.filter(p => p.brand?.name === filters.selectedBrand || p.brand === filters.selectedBrand);
    }
    setFilteredData(result);
    setPage(1);
  }, [data, filters]);

  const pageHandler = (selectedPage) => setPage(selectedPage);
  const dynamicPage = Math.ceil(filteredData.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const currentProducts = filteredData.slice(startIndex, startIndex + productsPerPage);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "colored",
    style: { fontWeight: '500', borderRadius: '10px', padding: '6px 12px', fontSize: '14px' }
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.title} added to cart!`, toastOptions);
  };

  // GSAP animation - runs when currentProducts change
  useEffect(() => {
    // Clear old refs
    productRefs.current = [];

    // Kill and reset timeline
    if (tl.current) {
      tl.current.kill();
    }
    tl.current = gsap.timeline();

    // Set initial hidden state for new elements
    tl.current.set(productRefs.current.filter(Boolean), { opacity: 0, y: 50 });

    // Animate in
    tl.current.to(productRefs.current.filter(Boolean), {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      force3D: true,
    });

    // Play the timeline
    tl.current.play();

    // Cleanup on unmount or re-run
    return () => {
      if (tl.current) tl.current.kill();
    };
  }, [currentProducts]); // depend on currentProducts

  return (
    <div className={`w-full py-6 px-4 mb-10 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {data?.length > 0 ? (
        <div className="flex gap-8 flex-wrap">
          <FilterSection onFilterChange={setFilters} />
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {currentProducts.map((product, index) => (
                <div
                  key={product.id}
                  ref={el => {
                    if (el) productRefs.current[index] = el;
                  }}
                  className={`rounded-2xl flex flex-col gap-3 w-70 h-90 overflow-hidden shadow-lg cursor-pointer transition-shadow duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
                >
                  <div className={`w-70 h-50 flex justify-center items-center overflow-hidden ${theme === "dark" ? "bg-gray-700" : "bg-[#00000025]"}`}>
                    <img
                      src={product.thumbnail || product.image}
                      alt={product.title}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="w-40 object-cover cursor-pointer" // Removed hover:scale + transition-transform (conflict fix)
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col items-start gap-2 w-full">
                    <h3 className="font-semibold break-words">{product.title}</h3>
                    <p className="font-medium">${product.price}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex justify-center items-center gap-2 bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300 mt-2"
                    >
                      <IoCart className="scale-125" /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {dynamicPage > 1 && (
              <div className="mt-8">
                <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
              </div>
            )}
          </div>
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
  );
}

export default Products;
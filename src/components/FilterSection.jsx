import { useContext, useMemo, useState, useEffect, useRef } from "react";
import { DataContext } from "../context/DataContext";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";

function FilterSection({ onFilterChange }) {
  const { data } = useContext(DataContext);
  const { theme } = useTheme();

  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const containerRef = useRef(null);
  const elementRefs = useRef([]);
  const hasAnimated = useRef(false);

  // Unique categories & brands
  const uniqueCategories = useMemo(
    () => [...new Set(data.map(p => p.category).filter(Boolean))],
    [data]
  );
  const uniqueBrands = useMemo(
    () => [...new Set(data.map(p => p.brand).filter(Boolean))],
    [data]
  );

  // Min & max price
  useEffect(() => {
    if (data.length > 0) {
      const prices = data
        .map((p) => parseFloat(p.price))
        .filter((price) => !isNaN(price) && price <= 500);
      const min = prices.length ? Math.floor(Math.min(...prices)) : 0;
      const max = prices.length ? Math.ceil(Math.max(...prices)) : 500;
      setPriceRange([min, max]);
      setSelectedPrice(max);
    }
  }, [data]);

  // Category toggle
  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Reset All filters (except search)
  const handleResetAll = () => {
    setSelectedCategories([]);
    setSelectedBrand("");
    setSelectedPrice(priceRange[1]);
  };

  // Send filter changes to parent
  useEffect(() => {
    if (typeof onFilterChange === "function") {
      onFilterChange({
        searchText,
        selectedCategories,
        selectedBrand,
        priceRange,
        selectedPrice,
      });
    }
  }, [searchText, selectedCategories, selectedBrand, selectedPrice, priceRange, onFilterChange]);

  // GSAP animation (one-time)
  useEffect(() => {
    if (hasAnimated.current) return;
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
    if (elementRefs.current.length) {
      gsap.fromTo(
        elementRefs.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, delay: 0.3, ease: "power2.out" }
      );
    }
    hasAnimated.current = true;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`rounded-md mt-10 p-4 h-max w-64 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Search */}
      <input
        ref={(el) => (elementRefs.current[0] = el)}
        type="text"
        placeholder="Search..."
        className={`p-2 border-2 rounded-md w-full transition-colors duration-500 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-400 text-gray-900"
        }`}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Reset All Button */}
      <button
        ref={(el) => (elementRefs.current[1] = el)}
        onClick={handleResetAll}
        className={`mt-4 w-full px-3 py-2 rounded-md font-semibold shadow-md transition-all duration-300 text-sm text-center
          ${
            theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-900"
          }`}
      >
        Reset All Filters
      </button>

      {/* Category */}
      <h1 ref={(el) => (elementRefs.current[2] = el)} className="mt-5 font-semibold">
        Category
      </h1>
      <div className="flex flex-col gap-2 mt-3">
        {uniqueCategories.map((cat, i) => (
          <label
            ref={(el) => (elementRefs.current[i + 3] = el)}
            key={cat}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              className={theme === "dark" ? "accent-yellow-400" : "accent-red-600"}
            />
            <p className="capitalize">{cat}</p>
          </label>
        ))}
      </div>

      {/* Brand */}
      {uniqueBrands.length > 0 && (
        <>
          <h1 ref={(el) => (elementRefs.current[uniqueCategories.length + 3] = el)} className="mt-5 font-semibold">
            Brand
          </h1>
          <select
            ref={(el) => (elementRefs.current[uniqueCategories.length + 4] = el)}
            className={`p-2 border-2 rounded-md w-full transition-colors duration-500 ${
              theme === "dark" ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-400 text-gray-900"
            }`}
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {uniqueBrands.map((brand, idx) => (
              <option key={idx} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Price */}
      {priceRange[0] !== priceRange[1] && (
        <>
          <div ref={(el) => (elementRefs.current[uniqueCategories.length + 5] = el)}
               className="flex justify-between items-center mt-5 font-semibold">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            ref={(el) => (elementRefs.current[uniqueCategories.length + 6] = el)}
            type="range"
            min={priceRange[0]}
            max={priceRange[1]}
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(Number(e.target.value))}
            className={`w-full mt-2 ${theme === "dark" ? "accent-yellow-400" : "accent-red-600"}`}
          />
          <p ref={(el) => (elementRefs.current[uniqueCategories.length + 7] = el)} className="text-sm mt-1">
            Up to ${selectedPrice}
          </p>
        </>
      )}
    </div>
  );
}

export default FilterSection;

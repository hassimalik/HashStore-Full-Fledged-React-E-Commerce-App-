import { useContext, useEffect, useRef, useMemo } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";

function Category() {
  const { data } = useContext(DataContext);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const categoryRef = useRef([]);

  // ✅ Memoized categories (re-render pe dobara calculate nahi hongi)
  const categoryOnlyData = useMemo(() => {
    if (!data?.length) return [];
    return [...new Set(data.map((item) => item.category))];
  }, [data]);

  // ✅ Animation sirf first time run hogi
  useEffect(() => {
    if (!categoryOnlyData.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        categoryRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "power2.out",
          duration: 0.5,
        }
      );
    });

    return () => ctx.revert(); // cleanup
  }, []); // ❗ dependency empty rakhi — repeat nahi hogi

  return (
    <div
      className={`transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-r from-[rgb(22,11,116)] via-[#2267b6] to-[#076161]"
          : "bg-gradient-to-r from-[#93a09f] via-[#e59980] to-[#c54e5c]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-center sm:justify-around gap-3 sm:gap-5 py-3 px-2">
        {categoryOnlyData.map((cat, i) => (
          <button
            ref={(el) => (categoryRef.current[i] = el)}
            key={cat}
            onClick={() =>
              navigate(`/category/${encodeURIComponent(cat)}`)
            }
            className={`uppercase px-4 sm:px-5  sm:py-3 rounded-md font-semibold shadow-md transition-all duration-300 text-sm sm:text-base
              ${
                theme === "dark"
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-[#d3df6a6e] text-[#0a2636] hover:bg-orange-100"
              }
              hover:scale-105 active:scale-95
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Category;

import React from "react";
import { useTheme } from "../context/ThemeContext";

function Pagination({ page, pageHandler, dynamicPage }) {
  const { theme } = useTheme();

  const getPages = (current, total) => {
    const pages = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) pages.push(1, 2, 3, "...", total);
      else if (current >= total - 2) pages.push(1, "...", total - 2, total - 1, total);
      else pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
    return pages;
  };

  const pages = getPages(page, dynamicPage);
  const baseBtnClasses = `px-3 py-1 rounded-md text-sm sm:text-base transition-all duration-300`;

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-8 overflow-x-auto">
      <button
        disabled={page === 1}
        onClick={() => pageHandler(page - 1)}
        className={`${baseBtnClasses} ${page === 1 ? (theme === "dark" ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-gray-300 text-gray-500 cursor-not-allowed") : "bg-red-500 text-white hover:bg-red-600 hover:scale-105"}`}
      >
        Prev
      </button>

      {pages.map((p, idx) => (
        <button
          key={idx}
          disabled={p === "..."}
          onClick={() => typeof p === "number" && pageHandler(p)}
          className={`${baseBtnClasses} ${
            p === page
              ? "bg-blue-500 text-white scale-105"
              : p === "..."
              ? "bg-transparent text-gray-500 cursor-default"
              : theme === "dark"
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700 hover:scale-105"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300 hover:scale-105"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page === dynamicPage}
        onClick={() => pageHandler(page + 1)}
        className={`${baseBtnClasses} ${page === dynamicPage ? (theme === "dark" ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-gray-300 text-gray-500 cursor-not-allowed") : "bg-red-500 text-white hover:bg-red-600 hover:scale-105"}`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

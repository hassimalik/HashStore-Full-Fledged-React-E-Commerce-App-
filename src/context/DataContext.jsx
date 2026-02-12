import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products?limit=0");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      setData(json.products || []); // products array کو سیٹ کرو

      console.log(`Fetched ${json.products.length} products successfully`);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]); // error پر empty array
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on mount (component mount ہوتے ہی products لوڈ)
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,          // all products array
        loading,       // loading state
        fetchAllProducts, // function (اب Provider میں شامل ہے — error ختم!)
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
import React from "react";
import { useCart } from "../context/CartContext";
import { IoTrash, IoAdd, IoRemove } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "../context/ThemeContext";

function Cart() {
  const { cartItem, removeFromCart, clearCart, increaseQty, decreaseQty } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const totalPrice = cartItem.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: theme === "dark" ? "dark" : "colored",
    style: {
      fontWeight: '500',
      borderRadius: '10px',
      padding: '8px 16px',
      fontSize: '14px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }
  };

  const handleIncrease = (id) => {
    increaseQty(id);
    const product = cartItem.find(item => item.id === id);
    toast.info(`${product?.title || 'Product'} quantity increased!`, toastOptions);
  };

  const handleDecrease = (id) => {
    const product = cartItem.find(item => item.id === id);
    if(product.quantity > 1){
      decreaseQty(id);
      toast.info(`${product.title} quantity decreased!`, toastOptions);
    } else {
      removeFromCart(id);
      toast.error(`${product.title} removed from cart!`, toastOptions);
    }
  };

  const handleRemove = (id) => {
    const product = cartItem.find(item => item.id === id);
    removeFromCart(id);
    toast.error(`${product.title} removed from cart!`, toastOptions);
  };

  const handleClearCart = () => {
    clearCart();
    toast.warn("Cart cleared!", toastOptions);
  };

  if (cartItem.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center h-[60vh] transition-colors duration-300 ${
        theme === "light" ? "bg-gray-50 text-gray-800" : "bg-gray-900 text-gray-300"
      }`}>
        <h2 className="text-2xl font-semibold mb-3">Your Cart is Empty 😢</h2>
        <p>Add some products to see them here!</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Continue Shopping
        </button>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto p-6 transition-colors duration-300 ${
      theme === "light" ? "bg-gray-50 text-gray-800" : "bg-gray-900 text-gray-200"
    }`}>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {cartItem.map(item => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ${
              theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <img src={item.thumbnail || item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex flex-col">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-500">${item.price}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className={`p-1 rounded transition-colors ${
                      theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <IoRemove />
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className={`p-1 rounded transition-colors ${
                      theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <IoAdd />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <IoTrash size={24} />
              </button>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`flex justify-between items-center mt-6 p-4 rounded-xl ${
        theme === "light" ? "bg-gray-100 text-gray-800" : "bg-gray-800 text-gray-200"
      }`}>
        <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
        <div className="flex gap-4">
          <button
            onClick={handleClearCart}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear Cart
          </button>
          <button
            onClick={() => { toast.success("Order Confirmed! ✅", toastOptions); }}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Confirm Order
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Cart;

import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from '../context/ThemeContext';

function SingleProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); 
    const { cartItem, addToCart, increaseQty } = useCart();
    const { theme } = useContext(ThemeContext); // ✅ Theme context

    const cartProduct = cartItem.find(item => item.id === Number(id));

    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`https://dummyjson.com/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, [id]);

    const displayedPrice = product ? product.price * quantity : 0;

    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        if (!product) return;

        if (cartProduct) {
            for (let i = 0; i < quantity; i++) increaseQty(product.id);
            toast.info(`${product.title} quantity updated!`, {
                position: "top-center",
                autoClose: 1200,
                hideProgressBar: true,
                className: theme === "dark" 
                    ? "bg-blue-600 text-white rounded-lg shadow-lg p-3" 
                    : "bg-blue-500 text-white rounded-lg shadow-lg p-3",
            });
        } else {
            addToCart({ ...product, quantity });
            toast.success(`${product.title} added to cart 🛒`, {
                position: "top-center",
                autoClose: 1200,
                hideProgressBar: true,
                className: theme === "dark" 
                    ? "bg-green-600 text-white rounded-lg shadow-lg p-3" 
                    : "bg-green-500 text-white rounded-lg shadow-lg p-3",
            });
        }
    };

    if (loading) {
        return (
            <div className={`flex justify-center items-center h-screen text-xl ${
                theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}>
                Loading Product...
            </div>
        );
    }

    if (!product) {
        return (
            <div className={`flex justify-center items-center h-screen text-xl text-red-500 ${
                theme === "dark" ? "bg-gray-900" : "bg-gray-100"
            }`}>
                Product not found!
            </div>
        );
    }

    return (
        <div className={`max-w-screen mx-auto px-4 py-10 grid grid-cols-2 gap-10 transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}>
            {/* Product Image */}
            <div className={`overflow-hidden rounded-lg shadow-lg w-full max-w-md mx-auto ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}>
                <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-[400px] object-cover transform transition-transform duration-500 hover:scale-110"
                />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>
                    {product.description}
                </p>

                {/* Category */}
                <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mb-2`}>
                    <strong>Category:</strong> {product.category || "N/A"}
                </p>

                {/* Quantity + Price Section */}
                <div className="flex items-center gap-4 mt-2">
                    <button
                        onClick={handleDecrease}
                        className={`p-2 rounded transition-colors ${
                            theme === "dark" 
                                ? "bg-gray-700 hover:bg-gray-600" 
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        <IoRemove size={20} />
                    </button>

                    <span className="px-3 text-lg font-semibold">{quantity}</span>

                    <button
                        onClick={handleIncrease}
                        className={`p-2 rounded transition-colors ${
                            theme === "dark" 
                                ? "bg-gray-700 hover:bg-gray-600" 
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        <IoAdd size={20} />
                    </button>

                    <span className="ml-4 text-2xl font-bold text-red-500">
                        ${displayedPrice.toFixed(2)}
                    </span>
                </div>

                {/* Add to Cart Button */}
                <div className="relative">
                    <button
                        onClick={handleAddToCart}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition mt-4 w-full"
                    >
                        {cartProduct ? "Update Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;

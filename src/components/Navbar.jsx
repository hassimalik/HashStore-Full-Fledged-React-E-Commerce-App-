import React, { useRef, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaBars, FaCaretDown } from "react-icons/fa";
import { IoCartOutline, IoMoon, IoSunny } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";

function Navbar({ location, getLocation, openDropDown, setOpenDropDown }) {
  const { cartItem } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);

  const totalProducts = cartItem.length;

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (openDropDown && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [openDropDown]);

  return (
    <div
      ref={containerRef}
      className={`p-3 px-4 shadow-lg transition-all duration-300 ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"}`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center font-sans relative">
        {/* Logo & Location */}
        <div className="flex gap-4 items-center">
          <Link to="/home">
            <h1 className="font-bold fnt text-2xl sm:text-3xl tracking-tight">
              <span className="text-teal-500 font-serif">Hash</span>Store
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <ul className="flex gap-7 items-center text-base font-medium">
            {["home", "products", "about", "contact"].map((item) => (
              <NavLink
                key={item}
                to={`/${item}`}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-red-500 pb-1 text-red-500 transition" : "hover:text-red-500 transition"
                }
              >
                <li className="capitalize">{item}</li>
              </NavLink>
            ))}
          </ul>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <IoCartOutline className="w-7 h-7 text-red-500 hover:scale-110 transition" />
            {totalProducts > 0 && (
              <span className="bg-red-600 absolute px-2 rounded-full -right-3 -top-3 text-white text-xs">{totalProducts}</span>
            )}
          </Link>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className={`p-2 rounded-full transition ${theme === "light" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-gray-700 text-yellow-400 hover:bg-gray-600"}`}>
            {theme === "light" ? <IoMoon /> : <IoSunny />}
          </button>

          {/* Auth */}
          <div>
            <SignedOut>
              <SignInButton>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
          <div className={`hidden md:flex gap-1 items-center text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"} relative`}>
            <MapPin className="text-red-500" />
            <span className="font-medium text-[10px]">
              {location ? (
                <div className="space-x-2">
                  <p>{location.city}</p>
                  <p>{location.country}</p>
                </div>
              ) : (
                "Enter Address"
              )}
            </span>
            <FaCaretDown onClick={() => setOpenDropDown(!openDropDown)} className="cursor-pointer hover:text-red-500 transition" />
            {openDropDown && (
              <div
                ref={dropdownRef}
                className={`absolute top-full left-0 w-[160px] shadow-2xl z-50 ${theme === "light" ? "bg-white" : "bg-gray-800"} border border-gray-200 p-3 text-sm rounded-lg mt-2`}
              >
                <h1 className="mb-4 font-semibold flex justify-between">
                  Change Location
                  <span onClick={() => setOpenDropDown(false)} className="cursor-pointer"><CgClose /></span>
                </h1>
                <button
                  onClick={getLocation}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs hover:scale-105 transition w-full"
                >
                  Detect my Location
                </button>
              </div>
            )}
          </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative">
            <IoCartOutline className="w-6 h-6 text-red-500" />
            {totalProducts > 0 && (
              <span className="bg-red-600 absolute px-1.5 rounded-full -right-2 -top-2 text-white text-xs">{totalProducts}</span>
            )}
          </Link>
          <button onClick={toggleTheme} className={`p-2 rounded-full transition ${theme === "light" ? "bg-gray-200 text-gray-800" : "bg-gray-700 text-yellow-400"}`}>
            {theme === "light" ? <IoMoon /> : <IoSunny />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <FaBars className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className={`md:hidden mt-3 flex flex-col gap-4 p-4 rounded-lg ${theme === "light" ? "bg-gray-100" : "bg-gray-800"}`}>
          {["home", "products", "about", "contact"].map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-red-500 font-semibold" : "hover:text-red-500 transition")}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          ))}
          <SignedOut>
            <SignInButton>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      )}
    </div>
  );
}

export default Navbar;

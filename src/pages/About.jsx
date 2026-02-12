import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-20 transition-colors duration-300 ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div
        className={`max-w-5xl mx-auto rounded-2xl shadow-lg p-8 space-y-8 transition-colors duration-300 ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        {/* Heading */}
        <h1
          className={`text-4xl font-bold text-center ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          About <span className="text-red-500">HashStore</span>
        </h1>

        {/* Paragraph */}
        <p
          className={`text-lg leading-relaxed ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Welcome to{" "}
          <span
            className={`font-semibold ${
              theme === "light" ? "text-red-600" : "text-red-400"
            }`}
          >
            HashStore
          </span>
          , your one-stop destination for the latest and greatest in electronics.
          We believe technology should be simple, accessible, and stylish — just like you.
        </p>

        {/* Mission Section */}
        <div className="space-y-6">
          <h2
            className={`text-2xl font-semibold ${
              theme === "light" ? "text-red-600" : "text-red-400"
            }`}
          >
            Our Mission
          </h2>
          <p
            className={`text-base ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            At HashStore, our mission is to make innovative technology accessible
            to everyone. Whether you're a gadget enthusiast or a casual user,
            we've got you covered with the best products at unbeatable prices.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <Link to={"/products"}>
            <button
              className={`px-6 py-2 rounded-xl font-medium transition duration-300 ${
                theme === "light"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

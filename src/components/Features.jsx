import React, { useRef, useEffect } from "react";
import { Truck, Lock, RotateCcw, Clock } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";

const features = [
    { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
    { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
    { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
    { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

const Features = () => {
    const { theme } = useTheme();
    const featureRefs = useRef([]);

    useEffect(() => {
        if (featureRefs.current.length) {
            gsap.fromTo(
                featureRefs.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                }
            );
        }
    }, []);

    return (
        <div
            className={`transition-colors duration-500 py-8 px-4 sm:px-6 lg:px-8 ${
                theme === "dark"
                    ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
                    : "bg-gray-100"
            }`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
                    {features.map((feature, index) => (
                        <div
                            ref={(el) => (featureRefs.current[index] = el)}
                            key={index}
                            className="flex items-center justify-center text-center sm:text-left"
                        >
                            <feature.icon
                                className={`flex-shrink-0 h-10 w-10 ${
                                    theme === "dark"
                                        ? "text-yellow-400"
                                        : "text-gray-600"
                                }`}
                                aria-hidden="true"
                            />
                            <div className="ml-4">
                                <p
                                    className={`text-base font-medium ${
                                        theme === "dark"
                                            ? "text-white"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {feature.text}
                                </p>
                                <p
                                    className={`mt-1 text-sm ${
                                        theme === "dark"
                                            ? "text-gray-300"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {feature.subtext}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;

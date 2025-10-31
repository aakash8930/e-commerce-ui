// components/SimpleSlider.tsx

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 1. Add your slide images here
const slides = [
    { src: "/featured.png", alt: "Featured Product 1" },
    { src: "/NewArrival.png", alt: "NewArrival" }, // Example: Add another image
    { src: "/Sale.png", alt: "Sale" }, // Example: Add a third image
];

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // --- Autoplay Functionality ---
    useEffect(() => {
        // Set a timer to advance the slide
        const timer = setTimeout(() => {
            handleNext();
        }, 4000); // Changes slide every 4 seconds

        // Clear the timer if the component unmounts or the index changes
        return () => clearTimeout(timer);
    }, [currentIndex]); // Re-run this effect whenever currentIndex changes

    const handlePrev = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        // Container with the same classes as your original <div>
        <div className="relative aspect-[3/1] md-12 overflow-hidden">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover" // Ensures the image fills the container
                    />
                </div>
            ))}

            {/* --- Navigation Arrows --- */}
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50 transition-colors"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50 transition-colors"
            >
                <ChevronRight size={24} />
            </button>

            {/* --- Pagination Dots --- */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default ImageSlider;
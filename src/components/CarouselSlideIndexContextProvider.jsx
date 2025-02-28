"use client";

import { createContext, useContext, useState } from "react";

const CarouselSlideIndexContext = createContext(null);

export const CarouselSlideIndexContextProvider = ({ children }) => {
    const [carouselSlideIndex, setCarouselSlideIndex] = useState(0);

    return (
        <CarouselSlideIndexContext.Provider value={{ carouselSlideIndex, setCarouselSlideIndex }}>
            {children}
        </CarouselSlideIndexContext.Provider>
    );
};

export const useCarouselSlideIndexContext = () => {
    return useContext(CarouselSlideIndexContext);
};

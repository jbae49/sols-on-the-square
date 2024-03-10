// ScrollButton.js
import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp, FaShoppingCart } from 'react-icons/fa';
import { IoMenu } from "react-icons/io5";

import { Button } from './Styles';
import './ScrollButton.css';

const ScrollButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            <div className="scroll-button scroll-to-top" onClick={scrollToTop}>
                <IoMenu size={40} />
            </div>
            <div className="scroll-button scroll-to-bottom" onClick={scrollToBottom}>
                <FaShoppingCart size={40} />
            </div>
        </div>
    );
};

export default ScrollButton;
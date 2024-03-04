// ScrollButton.js
import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa';
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
                <FaArrowCircleUp size={30} />
            </div>
            <div className="scroll-button scroll-to-bottom" onClick={scrollToBottom}>
                <FaArrowCircleDown size={30} />
            </div>
        </div>
    );
};

export default ScrollButton;
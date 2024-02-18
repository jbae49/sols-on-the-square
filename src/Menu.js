import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './Menu.css';
import { useCart } from './contexts/CartContext';


function Menu() {
    const { t, i18n } = useTranslation();
    const { dispatch } = useCart();
    const sections = ['appetizer', 'soup', 'rice', 'drink', 'vegetarian'];

    const [notification, setNotification] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({}); // New state to handle selected options

    const addToCart = (item, key, option = null) => {
        let itemToAdd = { ...item }; // Use `let` if you plan to reassign

        if (option) {
            // It's safe to modify properties of `itemToAdd` here because we're not reassigning it
            const optionPrice = parseFloat(item.price[option].replace(/^\$/, ''));
            itemToAdd.description = `${item.description} - ${option}`; // This is fine
            itemToAdd.price = optionPrice; // This is also fine
        } else {
            // Also ensure the default item price is a number if not already
            itemToAdd.price = parseFloat(item.price.replace(/^\$/, ''));
        }

        dispatch({ type: 'ADD_ITEM', payload: itemToAdd });
        setNotification(prev => ({ ...prev, [key]: `${itemToAdd.description} added to cart!` }));
        setTimeout(() => setNotification(prev => ({ ...prev, [key]: undefined })), 3000);
    };

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);

    };

    const handleOptionChange = (key, value) => {
        setSelectedOptions(prev => ({ ...prev, [key]: value }));
    };

    const handleImageError = (e) => {
        e.target.style.display = 'none';
    };

    const renderOptionsDropdown = (itemKey) => {
        const optionsKey = `${itemKey}_options`;
        const priceKey = `${itemKey}_price`;
        const options = t(optionsKey, { returnObjects: true }) || [];
        const prices = t(priceKey, { returnObjects: true });

        if (!Array.isArray(options) || options.length === 0) {
            return null; // No options available or translation not returning an array
        }

        return (
            <select className="custom-select" value={selectedOptions[itemKey] || ''} onChange={(e) => handleOptionChange(itemKey, e.target.value)}>
                <option value="">{t('select_option')}</option>
                {options.map(option => (
                    <option key={option} value={option}>{`${option} - ${prices[option]}`}</option>
                ))}
            </select>
        );
    };


    //   const dishes = [
    //     { key: 'dish_1', image: '/bibimbap.jpg', description: 'dish_1_description' },
    //     { key: 'dish_2', image: '/galbitang.jpg', description: 'dish_2_description' }
    //   ];


    return (
        <div>
            <img src="/sols-logo.png" className='logo-image' alt="Sols Logo"></img>
            <div className='language-buttons'>
                <button className='language-button' onClick={() => handleLanguageChange('en')}>English</button>
                <button className='language-button' onClick={() => handleLanguageChange('ko')}>한국어</button>
                <button className='language-button' onClick={() => handleLanguageChange('ch')}>中文</button>
            </div>
            {/* Promotion Message */}
            <div className='review-promotion'>
                <p>{t('google_review_promotion')} <a href="https://www.google.com/maps/place/Sol's+on+the+Square/@43.0766456,-89.3834015,17z/data=!4m8!3m7!1s0x88065340a318543f:0xf9729a16caad16cb!8m2!3d43.0766456!4d-89.3834015!9m1!1b1!16s%2Fg%2F1yg6ngmwn?entry=ttu" target="_blank" rel="noopener noreferrer">Click here</a></p>
            </div>
            <div className='guide-to-cart'>
                <p>{t('guide-to-cart')}</p>
            </div>
            <h1>{t('menu_title')}</h1>

            <div className='section-links'>
                {sections.map(section => (
                    <button className="section-button"
                        key={section}
                        onClick={() => document.getElementById(section).scrollIntoView({ behavior: 'smooth' })}>
                        {t(`${section}_title`)}
                    </button>
                ))}
            </div>

            <div className='menu-container'>
                {sections.map((section, sectionIndex) => (
                    <div id={section} key={sectionIndex} className='menu-section'>
                        <h2>{t(`${section}_title`)}</h2>

                        {/* Handling the vegetarian section similar to other sections */}
                        {section === 'vegetarian' ? (
                            <>
                                {/* <div className='warning-box'>
                                    <p>{t('vegetarian_note')}</p>
                                </div> */}
                                {Array.from({ length: 4 }, (_, i) => i + 1).map(num => {
                                    const key = `vegetarian_${num}`;
                                    const itemName = t(`${key}`);
                                    const itemDescription = t(`${key}_description`, { defaultValue: '' });
                                    const itemPrice = t(`${key}_price`);
                                    const itemImage = `/${key}.jpg`; // Assuming you have images named after the item keys

                                    const hasOptions = t(`${key}_options`, { returnObjects: true }) !== undefined;
                                    const item = {
                                        key,
                                        description: itemName,
                                        price: itemPrice,
                                        image: itemImage,
                                    };

                                    return (
                                        <div key={key} className='menu-item'>
                                            <img src={item.image} alt={itemName} className='menu-image' onError={handleImageError} />
                                            <div className='menu-text'>
                                                <h3>{itemName}</h3>
                                                <p>{itemDescription}</p>
                                                <p>{itemPrice}</p>
                                            </div>
                                            <button className='add-to-cart-button' onClick={() => addToCart(item, key, selectedOptions[key])}>
                                                Add to Cart
                                            </button>
                                            {notification[key] && <span className='cart-notification'>{notification[key]}</span>}
                                        </div>
                                    );
                                })}
                            </>
                        ) : (Array.from({ length: 10 }, (_, i) => i + 1).map(itemNumber => {
                            const key = `${section}_${itemNumber}`;
                            const itemName = t(key, { defaultValue: '' });
                            if (!itemName) return null; // Skip rendering if item name is not found

                            const itemPrice = t(`${key}_price`, { returnObjects: true });
                            const hasOptions = Array.isArray(t(`${key}_options`, { returnObjects: true }));
                            const item = {
                                key,
                                description: itemName,
                                price: hasOptions ? itemPrice : t(`${key}_price`), // Adjust based on whether the item has options
                            };
                            return (
                                <div key={key} className='menu-item'>
                                    <img src={`/${key}.jpg`} alt={itemName} className='menu-image' onError={handleImageError} />
                                    <div className='menu-text'>
                                        <h3>{itemName}</h3>
                                        <p>{t(`${key}_description`, { defaultValue: '' })}</p>
                                        {!hasOptions && <p className='menu-item-price'>{item.price}</p>}
                                        {hasOptions && renderOptionsDropdown(key)}
                                    </div>
                                    <button className='add-to-cart-button' onClick={() => addToCart(item, key, selectedOptions[key])}>
                                        Add to Cart
                                    </button>
                                    {notification[key] && <span className='cart-notification'>{notification[key]}</span>}
                                </div>
                            );
                        })
                            .filter(Boolean)
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Menu;
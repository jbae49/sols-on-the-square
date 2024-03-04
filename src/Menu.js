import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './Menu.css';
import { useCart } from './contexts/CartContext';
import axios from 'axios';
import Select from 'react-select';

function Menu() {
    const { t, i18n } = useTranslation();
    const { dispatch } = useCart();
    const sections = ['appetizer', 'soup', 'special_big_soup', 'bap', 'meat', 'noodles', 'lunch_special', 'beverage', 'alcohol', 'vegetarian'];

    const [notification, setNotification] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({}); // New state to handle selected options

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const [baseImageUrl, setBaseImageUrl] = useState('');
    useEffect(() => {
        setBaseImageUrl('https://jbae49-mys3.s3.us-east-2.amazonaws.com/public')
    }, []);


    const addToCart = (item, key, option = null) => {
        // Calculate the item price based on whether an option was selected
        let itemPrice = item.price;
        let description = item.description;

        if (option) {
            const optionPrice = parseFloat((item.price[option] + '').replace(/^\$/, ''));
            description += ` - ${option}`; // Append option to description if there is one
            itemPrice = optionPrice;
        } else {
            itemPrice = parseFloat(item.price.replace(/^\$/, ''));
        }

        // Prepare the data to be sent to the backend
        const cartItemData = {
            itemName: description, // Use the item's description as its name
            quantity: 1, // This example hardcodes quantity to 1, adjust as necessary
        };

        // Use axios to send a POST request to your Flask backend
        axios.post('https://api.solsonthesquare.online/api/add-to-cart', cartItemData)
            .then(response => {
                // Update local state to reflect the item addition
                dispatch({ type: 'ADD_ITEM', payload: { ...item, price: itemPrice, description } });
                setNotification(prev => ({ ...prev, [key]: `${description} added to cart!` }));
                // setNotification(prev => ({ ...prev, [key]: `Added to cart!` }));
                // Clear the notification after 3 seconds
                setTimeout(() => setNotification(prev => ({ ...prev, [key]: undefined })), 3000);

                console.log(response.data.message); // Success message from the server
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
                // Handle error (e.g., show an error message)
            });
    };


    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);

    };


    const handleImageError = (e) => {
        e.target.style.display = 'none';
    };

    // Function to handle clicks on the Google review promotion link
    const handlePromotionClick = () => {
        // Example payload; you can include more data as needed
        const payload = {
            event: 'Google Review Promotion Click',
            timestamp: new Date().toISOString(),
            // Add any other relevant data here
        };

        // Send the event data to the Flask backend

        axios.post('https://api.solsonthesquare.online/api/track-promotion-click', payload)
            .then(response => console.log('Promotion click tracked successfully.'))
            .catch(error => console.error('Error tracking promotion click:', error));
    };

    const handleOptionChange = (itemKey, selectedOption) => {
        // Assuming setSelectedOptions updates the state to reflect the selected option
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [itemKey]: selectedOption.value,
        }));
    };

    const renderOptionsDropdown = (itemKey) => {
        const optionsKey = `${itemKey}_options`;
        const priceKey = `${itemKey}_price`;
        const options = t(optionsKey, { returnObjects: true }) || [];
        const prices = t(priceKey, { returnObjects: true });

        if (!Array.isArray(options) || options.length === 0) {
            return null; // No options available
        }

        const transformedOptions = options.map(option => ({
            value: option,
            label: `${option} - ${prices[option]}`,
        }));

        return (
            <div className="select-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
                <Select
                    classNamePrefix="custom-select"
                    value={transformedOptions.find(option => option.value === selectedOptions[itemKey])}
                    onChange={(selectedOption) => handleOptionChange(itemKey, selectedOption)}
                    options={transformedOptions}
                    isSearchable={false} // Prevents user from typing in the dropdown box
                    styles={{ container: (base) => ({ ...base, width: '250px', maxWidth: '90%' }) }}
                />
            </div>
        );
    };




    //   const dishes = [
    //     { key: 'dish_1', image: '/bibimbap.jpg', description: 'dish_1_description' },
    //     { key: 'dish_2', image: '/galbitang.jpg', description: 'dish_2_description' }
    //   ];

    const scrollToCart = () => {
        document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <img src={`${baseImageUrl}/sols-logo.png`} className='logo-image' alt="Sols Logo"></img>
            <div className='language-buttons'>
                <button className='language-button' onClick={() => handleLanguageChange('en')}>English</button>
                <button className='language-button' onClick={() => handleLanguageChange('ko')}>한국어</button>
                <button className='language-button' onClick={() => handleLanguageChange('ch')}>中文</button>
            </div>
            {/* Promotion Message */}
            <div className='review-promotion'>
                <p>{t('google_review_promotion')} <a href="https://www.google.com/maps/place/Sol's+on+the+Square/@43.0766456,-89.3834015,17z/data=!4m8!3m7!1s0x88065340a318543f:0xf9729a16caad16cb!8m2!3d43.0766456!4d-89.3834015!9m1!1b1!16s%2Fg%2F1yg6ngmwn?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handlePromotionClick}>Click here</a></p>
            </div>
            <div className='guide-to-cart'>
                <p>{t('guide-to-cart')}</p>
            </div>
            <button className="scroll-to-cart-btn" onClick={scrollToCart}>
                Go To Cart 🍱
            </button>
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
            {/* Go to top and Go to Cart buttons */}
            {/* <button className="view-cart-btn" onClick={scrollToCart}>Cart</button> */}

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
                                            <div className="button-notification-container" style={{ textAlign: 'center' }}> {/* Ensure this div wraps both button and notification */}
                                                <button className='add-to-cart-button' onClick={() => addToCart(item, key, selectedOptions[key])}>
                                                    Add to Cart
                                                </button>
                                                {/* Conditionally render notification below the button */}
                                                <div className='cart-notification'>{notification[key] ? notification[key] : ''}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (Array.from({ length: 15 }, (_, i) => i + 1).map(itemNumber => {
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

                                    <img src={`${baseImageUrl}/${key}.jpg`} alt={itemName} className='menu-image' onError={handleImageError} />
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
            {/* <button className="go-to-top-btn" onClick={scrollToTop}>Go To Top</button>
            <button className="view-cart-btn" onClick={scrollToCart}>Go To Cart</button> */}

        </div>
    );
}

export default Menu;
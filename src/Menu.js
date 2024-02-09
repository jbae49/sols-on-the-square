import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './Menu.css';
import {useCart} from './contexts/CartContext';


function Menu() {
  const { t, i18n } = useTranslation();
  const {dispatch} = useCart();
  const sections = ['appetizer', 'soup', 'rice', 'drink', 'vegetarian'];

  const [notification, setNotification] = useState({});
  const addToCart = (item, key) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    dispatch({type: 'ADD_ITEM', payload:{...item, price}});
    // setNotification({visible: true, message: `${item.description} added to cart!`});
    setNotification(prev => ({...prev, [key]: `${item.description} added to cart!`}));
    console.log(`Notification set for ${key}: ${item.description} added to cart!`)
    setTimeout(() => setNotification(prev => ({...prev, [key]: undefined})), 3000);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

//   const dishes = [
//     { key: 'dish_1', image: '/bibimbap.jpg', description: 'dish_1_description' },
//     { key: 'dish_2', image: '/galbitang.jpg', description: 'dish_2_description' }
//   ];
  

  return (
    <div>
        <div className='language-buttons'>
            <button className='language-button' onClick={() => i18n.changeLanguage('en')}>English</button>
            <button className='language-button' onClick={() => i18n.changeLanguage('ko')}>한국어</button>
            <button className='language-button' onClick={() => i18n.changeLanguage('ch')}>中文</button>
        </div>
        {/* Promotion Message */}
        <div className='review-promotion'>
            <p>{t('google_review_promotion')} <a href="https://www.google.com/maps/place/Sol's+on+the+Square/@43.0766456,-89.3834015,17z/data=!4m8!3m7!1s0x88065340a318543f:0xf9729a16caad16cb!8m2!3d43.0766456!4d-89.3834015!9m1!1b1!16s%2Fg%2F1yg6ngmwn?entry=ttu" target="_blank" rel="noopener noreferrer">Click here</a></p>
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
                    {/* Set the to maximum number of elements from each section */}
                    {section === 'vegetarian' ? (
                      <div>
                        <div className='warning-box'>
                            <p>{t('vegetarian_note')}</p></div>
                            <ul>
                            {[1, 2, 3, 4, 5].map(num => (
                                <li key={num}>{t(`vegetarian_${num}`)}</li>
                            ))}
                            </ul>
                        
                      </div> 
                    ) : (Array.from({ length: 10 }, (_, i) => i+1)
                    .map(itemNumber => {
                        const key = `${section}_${itemNumber}`;
                        const itemName = t(key, { defaultValue: '' });
                        if (!itemName) return null; 
                        const itemPrice = t(`${key}_price`);
                        const item = {
                            key,
                            description: itemName,
                            price: itemPrice
                        };
                        return (
                            <div key={key} className='menu-item'>
                                <img src={`/${key}.jpg`} alt={itemName} className='menu-image' onError={handleImageError}/>
                                <div className='menu-text'>
                                    <h3>{itemName}</h3>
                                    <p>{t(`${key}_description`, {defaultValue: ''})}</p>
                                    <p className='menu-item-price'>{t(`${key}_price`)}</p>
                                </div>
                                <button onClick={() => addToCart(item, key)}>
                                    Add to Cart
                                </button>
                                {notification[key] && <span className='cart-notification'>{notification[key]}</span>}
                            </div>
                        )
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
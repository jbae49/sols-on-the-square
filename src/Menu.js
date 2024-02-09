import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './Menu.css';


function Menu() {
  const { t, i18n } = useTranslation();
  const sections = ['appetizer', 'soup', 'rice', 'drink', 'vegetarian'];

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  }

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
                        return (
                            <div key={key} className='menu-item'>
                                <img src={`/${key}.jpg`} alt={itemName} className='menu-image' onError={handleImageError}/>
                                <div className='menu-text'>
                                    <h3>{itemName}</h3>
                                    <p>{t(`${key}_description`, {defaultValue: ''})}</p>
                                    <p className='menu-item-price'>{t(`${key}_price`)}</p>
                                </div>
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
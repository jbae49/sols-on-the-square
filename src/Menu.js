import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './Menu.css';

function Menu() {
  const { t, i18n } = useTranslation();

  const dishes = [
    { key: 'dish_1', image: '/bibimbap.jpg', description: 'dish_1_description' },
    { key: 'dish_2', image: '/galbitang.jpg', description: 'dish_2_description' }
  ];

  return (
    <div>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('ko')}>한국어</button>
      <h1>{t('menu_title')}</h1>
      <div className='menu-container'>
        {dishes.map((dish) => (
            <div key={dish.key} className='menu-item'>
                <img src={dish.image} alt={t(dish.key)} className='menu-image' />
                <div className='menu-text'>
                    <h3>{t(dish.key)}</h3>
                    <p>{t(dish.description)}</p>
                </div>
            </div>
  ))}
  </div>
</div>
  );
        }

export default Menu;
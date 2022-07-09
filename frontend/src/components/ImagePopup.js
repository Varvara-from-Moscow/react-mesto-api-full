import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <aside className={`popup ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__picture-container">
        <button className="popup__close-button" type="button" onClick={onClose}>
        </button>
        <div>
          <img src={card.link}
            alt={card.name} 
            className='popup__picture'
          />
          <p className="popup__picture-name">{card.name}</p>
        </div>
      </div>
    </aside>
  );
}
  
export default ImagePopup;

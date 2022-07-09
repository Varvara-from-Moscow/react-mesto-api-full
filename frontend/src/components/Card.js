import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card({card, onCardClick, onCardLike, onTrashButton}) {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleTrash() {
    onTrashButton(card);
  }

    return ( 
      
      <div className="card">
      <div className="card__img-container">
        <img className="card__image" 
               alt = {card.name} 
               src = {card.link}
               onClick={handleClick}
        />
        <button className={`card__delete-button ${isOwn ? 'card__delete-button' : 'card__trush-button_hidden'}`}
          type="button"
          onClick={handleTrash}
          >  
        </button>
      </div>
      <div className="card__container">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__likes-container">
          <button className={`card__like-button ${isLiked ? 'card__like-button_active' : ""}`} 
                  type="button" 
                  onClick={handleLike}
                  >
          </button>
          <p className="card__counter">{card.likes.length}</p>
        </div>
      </div>
      </div>
      
    ) 
   }

   export default Card;

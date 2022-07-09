import React from 'react';

function InfoTooltip({ isOpen, onClose, noMistake }) {

 
  return (
    
    <aside className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <div className="popup__form">
          <svg className={`infoTooltip__pic ${noMistake? "infoTooltip__pic_success" : "infoTooltip__pic_fail"}`}></svg>
          <h2 className="infoTooltip__title">{noMistake? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        </div>
      </div>
    </aside>

  );
}
  
export default InfoTooltip;



/*
useEffect(() => {
        if (loggedIn) {
            Запрос на получение карточек
            Запрос на получение данных о пользователе
        }
    }, [loggedIn]);


        <PopupWithForm 
      name="infoTooltip"
      title= {isOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
      isOpen={isOpen}
      onClose={onClose}
     
      />
     */
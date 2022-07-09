import React from 'react';
import Form from './Form';

function PopupWithForm({name, isOpen, onClose, title, children, submitName, onSubmit}) {
    return (
      <aside className={`popup ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button className="popup__close-button" type="button" onClick={onClose}></button>

        <Form
        name={name}
        title={title}
        children={children}
        submitName={submitName}
        onSubmit={onSubmit}
        />
        
        </div>
      </aside>
  );
}
  
export default PopupWithForm;

/*
          <form className="popup__form" 
                name={name} 
                onSubmit={onSubmit}>
            <h3 className="popup__title">{title}</h3>
            {children}
            <button type="submit" 
                    className="popup__button">{submitName}</button>
          </form>

*/
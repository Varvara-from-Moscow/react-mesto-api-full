import React from 'react';

function Form({ name, title, children, submitName, onSubmit }) {
    return (

      <form className="popup__form" 
            name={name} 
            onSubmit={onSubmit}>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button type="submit" 
                className="popup__button">{submitName}</button>
      </form>
        
  );
}
  
export default Form;

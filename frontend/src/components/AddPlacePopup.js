import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace, showLoading}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
    name,
    link
    });
  }

  return (
    <PopupWithForm 
      name="popup-AddPicture" 
      title="Новое место"
      submitName={showLoading ? 'Сохранение...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input
          id="nameOfPicture"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          className="popup__input"
          required 
          value={name || ""}
          onChange={handleNameChange}/>
        <span className="popup__error popup__error_visible nameOfPicture-error" />
        <input
          id="linkOfPicture"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input"
          required 
          value={link || ""}
          onChange={handleLinkChange}/>
        <span id="spanOfPicture" className="popup__error popup__error_visible linkOfPicture-error" />
    </PopupWithForm>
  );
}
  
export default AddPlacePopup;

import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup({isOpen, onClose, showLoading, card, onCardDelete}) {

  function handleDeleteClick(e) {
    e.preventDefault();
    onCardDelete(card);
  }
 

  return (
    <PopupWithForm 
      name="areYouSureToDelete"
      title="Вы уверены?"
      submitName={showLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteClick} />
  );
}
  
export default DeletePopup;


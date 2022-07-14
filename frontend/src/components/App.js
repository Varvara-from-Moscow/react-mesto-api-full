import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import * as auth from '../utils/Auth';
import {api} from '../utils/Api';
import Header from './Header';
import MyProfile from './MyProfile';
import Footer from './Footer';
import DeletePopup from './DeletePopup';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';


function App() {
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [showLoading, setShowLoading] = React.useState(false);
  const [selectedCardToDelete, setSelectedCardToDelete] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [noMistake, setNoMistake] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  
  const history = useHistory();

  function signOut(){
    localStorage.removeItem('token');//// как его удалить?
    setLoggedIn(false)
    setUserEmail("")
    history.push('/login');
  }

  function handleRegSubmit(login){
    auth.register({
      password:login.password,
      email:login.email,
  })
    .then(() => {
      setNoMistake(true)
      setIsInfoTooltip(true)
    }) 
    .then((res) => {
      history.push('/login');
    })
    .catch((err) => {
      setIsInfoTooltip(true)
      setNoMistake(false)
      console.log(err)
    })
  }

  function handleLogin(password, email){
    auth.authorize(password, email)
      .then ((token) => {
        auth.getContent(token)
          //.then(()=>{console.log(token)})
          .then(() => {
            setUserEmail(email)
            setLoggedIn(true)
            history.push('/my-profile')
          })
      .catch((err) => {
        setIsInfoTooltip(true)
        setNoMistake(false)
        console.log(err)
      })
      })
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const token = localStorage.getItem('token');
   
    if (token){
      // проверим токен
      auth.getContent(token).then((res) => {
        if (res){
          setUserEmail(res.data.email)
          setLoggedIn(true)
          history.push('/my-profile')
        }
      }) 
      .catch((err) => {
        console.log(err)
      })
    }
  } 

  React.useEffect(() => {
    api.getInitialCards()
    .then((cards) => {
      setCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);

  React.useEffect(() => {
    api.getUserInfo()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
  } 


  function handleCardDelete(card) {
    setShowLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item !== card))
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowLoading(false);
    })
  }

  function handleUpdateUser(userData) {
    setShowLoading(true);
    api.setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setShowLoading(false);
    })
  }

  function handleUpdateAvatar(data) {
    setShowLoading(true);
    api.updateUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setShowLoading(false);
    })
  }

  function handleAddPlaceSubmit(data) {
    setShowLoading(true);
    api.addUserCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setShowLoading(false);
    })
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setSelectedCardToDelete(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsDeletePopupOpen(false)
    setIsInfoTooltip(false)
    setSelectedCard({})
    setSelectedCardToDelete({})
  }

  return (
    <Switch>
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
    <div className="page">
      
      <Header 
          loggedIn={loggedIn}
          userEmail={userEmail}
          onSignOut={signOut}
      />

      <Route path="/sign-up">
      </Route>

      <Route path="/sign-in">
      </Route>

      <Route>
          {loggedIn ? (
            <Redirect to="/my-profile" />
          ) : (
            <Redirect to="/login" />
          )}
      </Route>

      <Route exact path="/login">
            <Login  
            onLogin={handleLogin}/>
      </Route>

      <Route path="/register">
            <Register 
            onRegister={handleRegSubmit}
            />
      </Route>

      <ProtectedRoute
          path="/my-profile"
          loggedIn={loggedIn}
          component={MyProfile}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onTrashButton={handleDeleteCardClick}
          cards={cards}
      />

      <Footer />

      <AddPlacePopup 
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlaceSubmit}
      showLoading={showLoading}/>

      <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser}
      showLoading={showLoading}/>

      <EditAvatarPopup 
      isOpen={isEditAvatarPopupOpen} 
      onClose={closeAllPopups} 
      onUpdateAvatar={handleUpdateAvatar}
      showLoading={showLoading}/> 

      <DeletePopup 
      isOpen={isDeletePopupOpen}
      onClose={closeAllPopups}
      onCardDelete={handleCardDelete}
      showLoading={showLoading}
      card={selectedCardToDelete}/>

      <ImagePopup 
      card={selectedCard}
      onClose={closeAllPopups}
      />

      <InfoTooltip 
      onClose={closeAllPopups}
      isOpen={isInfoTooltip}
      noMistake={noMistake}
      />

    </div>
    </div>
    </CurrentUserContext.Provider>
    </Switch>
  );
}

export default App;

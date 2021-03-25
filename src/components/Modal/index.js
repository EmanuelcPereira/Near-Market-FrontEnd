import React, { useState } from 'react'

import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';

export default function Modal({ closeModal }) {
  const [isLogin, setIsLogin] = useState(true);

  function setLoginForm() {
    setIsLogin(true);
  }

  function setRegisterLogin() {
    setIsLogin(false);
  }

  return (
    <div className="backdrop">
      <button className="close-button" onClick={closeModal}>Fechar</button>
      {isLogin ? <LoginModal setRegisterLogin={setRegisterLogin} /> : <RegisterModal setLoginForm={setLoginForm} />}
    </div>
  )
}

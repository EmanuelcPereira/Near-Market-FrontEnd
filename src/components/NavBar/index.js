import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/userContext';
import logo from '../../assets/logo.png'


export default function Navbar({ openModal }) {
  const [userData, setUserData] = useContext(UserContext);

  async function handleLogOut(e) {
    e.preventDefault();

    setUserData(prevState => ({
      ...prevState,
      isLogged: false,
      email: '',
      name: '',
      _id: ''
    }))
  }

  return (
    <nav>
      <div className="nav-container">
        <img src={logo} alt="comercio Local" />
        {userData.isLogged ?
          <>
            <p>Olá, {userData.name}</p>
            <button onClick={handleLogOut}>SAIR</button>
          </> :
          <button onClick={openModal} >Entrar</button>}
      </div>
    </nav>
  )
}

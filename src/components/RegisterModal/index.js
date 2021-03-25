import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../Context/userContext'
import { api } from '../../Services/Api';

export default function RegisterModal({ setLoginForm }) {
  const [nome, setNome] = useState('')
  const [celular, setCelular] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const history = useHistory();

  useEffect(() => {
    getUserLocation()
  }, [])

  async function handleRegister(e){
    e.preventDefault();

    try {
      await api.post('user', {
        nome,
        email,
        celular,
        password,
        latitude,
        longitude
      })
      setNome('')
      setCelular('')
      setEmail('')
      setPassword('')

    } catch(err){
      alert('Falha no cadastro, tente novamente')
    }

  }

  async function getUserLocation() {
    navigator.geolocation.getUserPosition((position) => {
      const { latitude, longitude } = position.coords
      setLatitude(latitude)
      setLongitude(longitude)
    }, (err) => {
      console.log(err)
    }, { timeout: 1000 })
  }

  return (
    <div className="modal">
      <h1>Cadastrar</h1>
      <form action="">
        <input 
          type="text" 
          placeholder="nome" 
          value={nome} 
          onChange={e => setNome(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="celular" 
          value={celular} 
          onChange={e => setCelular(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="senha" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Cadastrar</button>
        <Link onClick={setLoginForm}>Já tenho uma conta</Link>
      </form>
    </div>
  )
}

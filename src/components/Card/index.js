import React from 'react';

export default function Card({ name, price, username, contact }) {

  return (
    <div className="card">  
      <h2>{name}</h2>
      <h1>R$ {price}</h1>
      <div className="card-info">
        <div className="card-info-detail">
          <p>{username}</p>
        </div>
        <div className="card-info-detail">
          <p>{contact}</p>
        </div>
      </div>
    </div>
  )
}

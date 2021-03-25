import React from 'react';

export default function DeletableCard({ name, price, username, contact, handleDeleteProduct }) {

  return (
    <div className="card">
      <button onClick={handleDeleteProduct}>Excluir</button>    
      <h2>{name}</h2>
      <h1>{price}</h1>
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

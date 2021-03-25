import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/NavBar';
import DeletableCard from '../../components/DeletableCard';
import { api } from '../../Services/Api'
import { UserContext } from '../../Context/userContext'


export default function Dashboard() {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [userData] = useContext(UserContext)
  const [productsData, setProductsData] = useState([])


  useEffect(() => {
    async function getUsersProducts() {
      try {
        const userProductsData = await api.get(`/product/${userData._id}`, {
          headers: {
            auth: userData._id
          }
        })
        const { data } = userProductsData
        setProductsData(data)
      } catch (err) {
        alert('Erro ao carregar produtos')
      }
    }
    getUsersProducts()
  }, [productsData, userData._id])

  async function handleAddProduct(e) {
    e.preventDefault()
    try {
      await api.post(`${userData._id}/product`, {
        name: productName,
        price: productPrice,
      }, {
        headers: {
          auth: userData._id
        }
      })
      alert('Produto cadastrado com sucesso')
      setProductName('')
      setProductPrice('')

    } catch (err) {
      alert('Falha ao adicionar produto, tente novamente')
    }
  }

  async function handleDeleteProduct(product_id) {
    try {
      await api.delete(`${userData._id}/product/${product_id}`, {
          headers: {
            auth: userData._id
          }
      })
      alert('Produto removido com sucesso')
    } catch(err) {
      alert('Erro ao excluir produto')
    }
  }

  return (
    <>
      <Navbar />
      <section className="input-section">
        <form>
          <h1>Cadastrar produtos</h1>
          <div className="product-inputs">
            <input
              type="text"
              placeholder="nome do produto"
              value={productName}
              onChange={e => setProductName(e.target.value)}
            />
            <input
              type="number"
              min="0"
              placeholder="preço do produto"
              max="1000"
              value={productPrice}
              onChange={e => setProductPrice(e.target.value)}
            />
            <button onClick={handleAddProduct}>Adicionar produto</button>
          </div>
        </form>
      </section>
      <section className="products-section">
        <div className="products-container">
          {productsData.map((product) => (
            <DeletableCard
              key={product._id}
              name={product.name}
              price={product.price}
              username={product.user.name}
              contact={product.user.celular}
              handleDeleteProduct={() => handleDeleteProduct(product._id)}
            />
          ))}

        </div>
      </section>
    </>
  )
};

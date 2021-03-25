import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Card from '../../components/Card';
import CardMarker from '../../components/CardMarker';
import Modal from '../../components/Modal';
import Navbar from '../../components/NavBar';
import { api } from '../../Services/Api';

function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [productsData, setProductsData] = useState([])
  const [searchByName, setSearchByName] = useState('')
  const [searchByMaxPrice, setSearchByMaxPrice] = useState(100)
  const [filteredProductsData, setFilteredProductsData] = useState([])
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    width: "100vw",
    height: "45vh",
    zoom: 15
  })
  const [selectedProducts, setSelectedProducts] = useState(null)
  const [isList, setIsList] = useState(true)

  const mapBoxAPI = "pk.eyJ1IjoiZW1hbnVlbGNkcHIiLCJhIjoiY2ttbnMyYWtkMHVsbTJwbjN6bTQ0MG10ZCJ9.diaXRUwmeCH0AqDUBqmy_A"

  useEffect(() => {
    async function getUserLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)
        setViewport({ ...viewport, latitude, longitude })
      }, (err) => {
        console.log(err)
      }, { timeout: 10000 })
    }
    getUserLocation()
  }, [viewport])

  useEffect(() => {
    async function getNearByProducts() {
      try {
        const nearByProducts = await api.get(`/product?latitude=${latitude}&longitude=${longitude}`)
        setProductsData(nearByProducts.data)
      } catch (err) {
        alert('Erro ao carregar produtos')
      }
    }
    getNearByProducts()
  }, [latitude, longitude])

  useEffect(() => {
    function getFilteredProducts() {
      const filteredProducts = productsData.filter(product =>
        (!searchByName || product.name.toLowerCase().includes(searchByName.toLowerCase())) &&
        (!searchByMaxPrice || product.price <= searchByMaxPrice)
      )
      setFilteredProductsData(filteredProducts)
    }
    getFilteredProducts()
  }, [productsData, searchByName, searchByMaxPrice])

  function openModal() {
    setIsOpenModal(true);
  }

  function closeModal() {
    setIsOpenModal(false);
  }

  function handleShowMap(e) {
    e.preventDefault()
    setIsList(false)
  }

  function handleShowList(e) {
    e.preventDefault()
    setIsList(true)
  }

  return (
    <>
      <Navbar openModal={openModal} />
      <section className="input-section">
        <form>
          <h1>Pesquisar produtos</h1>
          <div className="form-inputs">
            <input
              type="text"
              placeholder="pesquisar por nome"
              value={searchByName}
              onChange={e => setSearchByName(e.target.value)}
            />
            <input
              type="number"
              min="0"
              placeholder="preço máximo"
              value={searchByMaxPrice}
              onChange={e => setSearchByMaxPrice(e.target.value)}
            />
          </div>
          {isList ? <button onClick={handleShowMap}>Ver mapa</button> : <button onClick={handleShowList}>Ver lista</button>}

        </form>
      </section>

      {isList ? (
        <section className="products-section">
          <div className="products-container">
            {productsData.length > 0 ? (
              filteredProductsData.map((product) => (
                <Card
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  username={product.user.name}
                  contact={product.user.celular}
                />
              ))) : <h1>Carregando...</h1>
            }
          </div>
        </section>
      ) : (<section className="products-map-section">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={mapBoxAPI}
          mapStyle="mapbox://styles/emanuelcdpr/ckmnt04cw2hdk17nte5b8tb5p"
          onViewportChange={viewport => setViewport(viewport)}
        >
          {filteredProductsData.map(product => (
            <Marker
              key={product._id}
              latitude={product.location.coordinates[1]}
              longitude={product.location.coordinates[0]}
            >
              <div className="marker">
                <button
                  className="marker-btn"
                  onClick={e => {
                    e.preventDefault()
                    setSelectedProducts(product)
                  }}
                >
                <h1>{product.name}</h1>
                </button>
              </div>
            </Marker>
          ))}
          {selectedProducts ? (
            <Popup
              latitude={selectedProducts.location.coordinates[1]}
              longitude={selectedProducts.location.coordinates[0]}
              onClose={() => setSelectedProducts(null)}
            >
              <CardMarker
                name={selectedProducts.name}
                price={selectedProducts.price}
                username={selectedProducts.user.name}
                contact={selectedProducts.user.celular}
              />
            </Popup>
          ) : null}
        </ReactMapGL>
      </section>)}
      {isOpenModal ? <Modal closeModal={closeModal} /> : null}
    </>
  )
}

export default Home
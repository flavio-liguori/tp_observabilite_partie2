import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const fetchProducts = () => {
    fetch('http://localhost:8081/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !price) return

    const product = { name, price: parseFloat(price) }

    fetch('http://localhost:8081/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(() => {
        setName('')
        setPrice('')
        fetchProducts()
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <h1>Product Dashboard</h1>
      <div className="container">
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mechanical Keyboard"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>

        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-name">{product.name}</div>
              <div className="product-price">${product.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App

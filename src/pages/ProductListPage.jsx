  import React, { useEffect, useState } from 'react';
  import axios from '../api/axios';
  import Layout from '../components/Layout';
  import Button from 'react-bootstrap/Button';
  import Card from 'react-bootstrap/Card';
  import Form from 'react-bootstrap/Form';

  function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [editProductId, setEditProductId] = useState(null);
    const [editedName, setEditedName] = useState('');

    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!name.trim()) {
        setError('Product name is required.');
        return;
      }

      const payload = {
        name
      };

    try {
        await  axios.post('/api/products', payload);

        setName('');
        setError('');
        fetchProducts();
      } catch (err) {
        console.error('Error saving product:', err.response?.data || err.message);
        setError('Something went wrong.');
      }
    };

    const handleEdit = (product) => {
      setEditProductId(product.id);
      setEditedName(product.name);
    };

    const handleSave = (id) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, name: editedName } : p))
      );
      setEditProductId(null);
      setEditedName('');
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    return (
      <Layout>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Product Name</label>
            <input
              type="text"
              id="productName"
              className="form-control"
              value={name ?? ''}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>

          {error && <div className="text-danger mb-2">{error}</div>}
          <button type="submit" className="btn btn-primary">Create Product</button>
        </form>

        <h2 className="mb-3">Product List</h2>
        {products.length === 0 ? (
          <p>No products yet.</p>
        ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
    
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        products.map((product) => (
          <Card key={product.id}>
            <Card.Body>
              {editProductId === product.id ? (
                <>
                  <Form.Control
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <Button
                    onClick={() => handleSave(product.id)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Card.Title>{product.name}</Card.Title>
                  <Button onClick={() => handleEdit(product)}>
                    Edit
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        ))
      )}
      </Layout>
    );
  }

  export default ProductListPage;

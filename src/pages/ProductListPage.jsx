  import React, { useEffect, useState } from 'react';
  import axios from '../api/axios';
  import Layout from '../components/Layout';

  function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState('');

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
      </Layout>
    );
  }

  export default ProductListPage;

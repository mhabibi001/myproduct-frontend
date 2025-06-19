import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Layout.css';

function Layout({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.body.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="d-flex">
      <aside className="sidebar">
        <div className="sidebar-header p-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0">My Product</h4>
          <button className="btn btn-sm btn-outline-secondary" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <ul className="nav flex-column p-3">
          <li className="nav-item">
            <Link className="nav-link" to="/">Product List</Link>
          </li>
        </ul>
      </aside>

      <main className="main-content flex-grow-1 p-4">
        <header className="mb-4 border-bottom pb-2">
          <h2><center>My Products Dashboard</center></h2>
        </header>
        {children}
      </main>
    </div>
  );
}

export default Layout;

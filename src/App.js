import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'; 
import BrowsingHub from './BrowsingHub';

function App() {
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleToggle = () => setIsDarkMode(prevMode => !prevMode);

  const items = [
    { id: 1, title: "Item 1", image: "https://placeholder.com/", hasPriceDrop: true },
    { id: 2, title: "Item 2", image: "https://placeholder.com/", hasPriceDrop: false },
    { id: 3, title: "Item 3", image: "https://placeholder.com/", hasPriceDrop: true },
    // Add more items here
  ];

  return (
    
    <div className="container">
     <BrowsingHub/> 
      <div className="row">
        {items.map(item => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card item-card">
              <div className="position-relative">
                <img src={item.image} className="card-img-top" alt={item.title} />
                {item.hasPriceDrop && (
                  <span className="badge-container position-absolute top-0 end-0 translate-middle">
                    <span className="badge rounded-pill bg-danger">Price Drop</span>
                  </span>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
              </div>
            </div>
          </div>
        ))}
        
      </div>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
          <span className="slider"></span>
        </label>
      </div>
      <button type="button" class="btn btn-success">Success</button>
      <button type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="content?">Click to toggle popover</button>
    
    </div>
    
  );
}

export default App;

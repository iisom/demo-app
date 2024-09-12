import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BrowsingHub.css'; // Import custom CSS if needed

const BrowsingHub = () => {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');

    // Fetch categories and items from the backend
    useEffect(() => {
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data));

        fetch('/api/items')
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);

    // Handle category click
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        // Optionally, fetch or filter items based on the selected category
    };

    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="row bg-light py-3">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <img src="user-avatar.png" alt="User Avatar" className="rounded-circle" width="40" />
                        <span className="ms-2">ALFI</span>
                    </div>
                    <h2 className="mb-0">Hub X</h2>
                    <div>
                        <button className="btn btn-outline-secondary">Menu</button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 col-lg-2 bg-light border-end py-4">
                    <h6>Categories</h6>
                    <ul className="list-unstyled">
                        {categories.map((category, index) => (
                            <li key={index} className="mb-2">
                                <a
                                  href="#"
                                  className={`text-decoration-none ${category === selectedCategory ? 'fw-bold' : ''}`}
                                  onClick={() => handleCategoryClick(category)}>
                                  {category}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Content Area */}
                <div className="col-md-9 col-lg-10 py-4">
                    <div className="d-flex align-items-center mb-3">
                        {/* Larger Search Bar */}
                        <div className="w-50 me-3">
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                placeholder="Search" 
                                aria-label="Search" 
                            />
                        </div>
                        <div className="d-flex flex-wrap">
                            {/* Sorting Dropdown */}
                            <select 
                                className="form-select me-2 w-auto" 
                                aria-label="Sort by" 
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="">Sort by</option>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="price">Price</option>
                            </select>

                            {/* Filtering Dropdown */}
                            <select 
                                className="form-select me-2 w-auto" 
                                aria-label="Filter" 
                                value={filterOption}
                                onChange={(e) => setFilterOption(e.target.value)}
                            >
                                <option value="">Filter</option>
                                <option value="available">Available</option>
                                <option value="sold">Sold</option>
                            </select>

                            {/* Condition Dropdown */}
                            <select 
                                className="form-select me-2 w-auto" 
                                aria-label="Condition" 
                                value={selectedCondition}
                                onChange={(e) => setSelectedCondition(e.target.value)}
                            >
                                <option value="">Condition</option>
                                <option value="new">New</option>
                                <option value="used">Used</option>
                                </select>

                            {/* Category Dropdown */}
                            <select 
                                className="form-select w-auto" 
                                aria-label="Category" 
                                value={selectedCategory}
                                onChange={(e) => handleCategoryClick(e.target.value)}
                            >
                                <option value="">Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Grid Layout */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                        {items
                            .filter(item => item.category === selectedCategory || selectedCategory === '')
                            .filter(item => item.condition === selectedCondition || selectedCondition === '')
                            .map((item, index) => (
                                <div className="col" key={index}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <p className="card-text">{item.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowsingHub;

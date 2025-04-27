import React, { useState, useEffect } from 'react';
import './styles.css';

const App = () => {
  // State variables
  const [activeTab, setActiveTab] = useState('home');
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    policy: '',
    company: ''
  });
  const [newReview, setNewReview] = useState({
    user: '',
    comment: '',
    rating: 5
  });
  useEffect(() => {
    fetch('http://localhost:3000/insuranceCompanies')
      .then(response => response.json())
      .then(data => {
        setCompanies(data);
        setFilteredCompanies(data);
      });
  }, []);
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredCompanies(companies);
    } else {
      setFilteredCompanies(
        companies.filter(company => company.category === selectedCategory)
      );
    }
  }, [selectedCategory, companies]);
  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setSelectedCompany(null);
  };
  const handleCompanySelect = company => {
    setSelectedCompany(company);
  };
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleReviewChange = e => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleRegister = e => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    setUser({
      name: formData.name,
      email: formData.email
    });
    setActiveTab('home');
    alert('Registration successful!');
  };
  const handleLogin = e => {
    e.preventDefault();
    // In a real app, you would verify credentials
    setUser({
      name: 'LoggedInUser',
      email: formData.email
    });
    setActiveTab('home');
    alert('Login successful!');
  };
  const handleApplicationSubmit = e => {
    e.preventDefault();
    if (!user) {
      alert('Please login or register first');
      return;
    }
    const application = {
        user: user.name,
        company: formData.company,
        policy: formData.policy,
        date: new Date().toISOString()
      };
      alert(`Application submitted for ${formData.policy} with ${formData.company}`);
      setFormData(prev => ({ ...prev, policy: '', company: '' }));
    };
    const handleReviewSubmit = e => {
        e.preventDefault();
        if (!user) {
          alert('Please login or register first');
          return;
        }
        
        const review = {
          user: user.name,
          comment: newReview.comment,
          rating: parseInt(newReview.rating)
        };
        alert('Thank you for your review!');
        setNewReview({ user: '', comment: '', rating: 5 });
      };
      const renderTabContent = () => {
        switch (activeTab) {
          case 'register':
            return (
              <div className="form-container">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                    <button type="submit">Register</button>
            </form>
            <p>
              Already have an account?{' '}
              <button onClick={() => setActiveTab('login')}>Login</button>
            </p>
          </div>
        );
      case 'login':
        return (
          <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
               <button type="submit">Login</button>
            </form>
            <p>
              Don't have an account?{' '}
              <button onClick={() => setActiveTab('register')}>Register</button>
            </p>
          </div>
        );
      case 'apply':
        return (
          <div className="form-container">
            <h2>Apply for Insurance</h2>
            <form onSubmit={handleApplicationSubmit}>
              <select
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Company</option>
                {companies.map(company => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
                 </select>
              <select
                name="policy"
                value={formData.policy}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Policy</option>
                {selectedCompany
                  ? selectedCompany.policies.map((policy, index) => (
                      <option key={index} value={policy.name}>
                        {policy.name} - ${policy.premium}/month
                      </option>
                    ))
                  : companies
                      .flatMap(company => company.policies)
                      .map((policy, index) => (
                        <option key={index} value={policy.name}>
                          {policy.name} - ${policy.premium}/month
                        </option>
                      ))}
              </select>
              <button type="submit">Submit Application</button>
            </form>
          </div>
        );
        case 'home':
            default:
              return (
                <div className="home-content">
                  {!selectedCompany ? (
                    <>
                      <div className="category-buttons">
                        <button onClick={() => handleCategorySelect('all')}>All</button>
                        <button onClick={() => handleCategorySelect('Health Insurance')}>
                          Health Insurance
                        </button>
                        <button onClick={() => handleCategorySelect('Vehicle Insurance')}>
                          Vehicle Insurance
                        </button>
                        <button onClick={() => handleCategorySelect('Home insurance')}>
                          Home Insurance
                        </button>
                        <button onClick={() => handleCategorySelect('Intellectual property Insurance')}>
                          IP Insurance
                        </button>
                      </div>
                      <div className="company-list">
                        {filteredCompanies.map(company => (
                          <div
                            key={company.id}
                            className="company-card"
                            onClick={() => handleCompanySelect(company)}
                          >
                              <h3>{company.name}</h3>
                      <p>{company.category}</p>
                      <p>Rating: {company.rating} ★</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="company-details">
                <button onClick={() => setSelectedCompany(null)}>Back to List</button>
                <h2>{selectedCompany.name}</h2>
                <p>{selectedCompany.category}</p>
                <p>Rating: {selectedCompany.rating} ★</p>
                
                <h3>Policies</h3>
                <div className="policies-list">
                  {selectedCompany.policies.map((policy, index) => (
                    <div key={index} className="policy-card">
                      <h4>{policy.name}</h4>
                      <p>Premium: ${policy.premium}/month</p>
                      <p>Coverage: {policy.coverage}</p>
                      <p>Benefits: {policy.benefits}</p>
                    </div>
                  ))}
                </div>
                <h3>Reviews</h3>
                <div className="reviews-list">
                  {selectedCompany.reviews.length > 0 ? (
                    selectedCompany.reviews.map((review, index) => (
                      <div key={index} className="review-card">
                        <p>
                          <strong>{review.user}</strong> - {review.rating} ★
                        </p>
                        <p>{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>
                
                {user && (
                  <div className="add-review">
                    <h3>Add Your Review</h3>
                    <form onSubmit={handleReviewSubmit}>
                      <div>
                        <label>Rating:</label>
                        <select
                          name="rating"
                          value={newReview.rating}
                          onChange={handleReviewChange}
                        >
                               {[5, 4, 3, 2, 1].map(num => (
                            <option key={num} value={num}>
                              {num} ★
                            </option>
                          ))}
                        </select>
                      </div>
                      <textarea
                        name="comment"
                        placeholder="Your review..."
                        value={newReview.comment}
                        onChange={handleReviewChange}
                        required
                      />
                      <button type="submit">Submit Review</button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        );
    }
  };
  return (
    <div className="app">
      <header className="app-header">
        <h1>Batini Insurance Company</h1>
        <nav className="nav-tabs">
          <button
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          {!user ? (
            <>
              <button
                className={activeTab === 'register' ? 'active' : ''}
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
              <button
                className={activeTab === 'login' ? 'active' : ''}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                className={activeTab === 'apply' ? 'active' : ''}
                onClick={() => setActiveTab('apply')}
              >
                Apply
              </button>
              <button onClick={() => setUser(null)}>Logout</button>
              <span className="user-greeting">Hello, {user.name}</span>
            </>
          )}
              </nav>
      </header>
      <main className="app-main">{renderTabContent()}</main>
      <footer className="app-footer">
        <p>© 2023 Batini Insurance Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App
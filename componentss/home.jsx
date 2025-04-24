import { Link } from 'react-router-dom';
import '../styles/pages.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Compare and Choose the Best Insurance</h1>
        <p>Find the perfect insurance policy tailored to your needs</p>
        <div className="cta-buttons">
          <Link to="/health" className="cta-button">Health Insurance</Link>
          <Link to="/vehicle" className="cta-button">Vehicle Insurance</Link>
          <Link to="/home" className="cta-button">Home Insurance</Link>
          <Link to="/ip" className="cta-button">IP Insurance</Link>
        </div>
      </section>
      
      <section className="features">
        <h2>Why Choose Batini?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Easy Comparison</h3>
            <p>Compare multiple policies side by side</p>
          </div>
          <div className="feature-card">
          <h3>Transparent Pricing</h3>
            <p>No hidden fees or charges</p>
          </div>
          <div className="feature-card">
            <h3>Trusted Providers</h3>
            <p>We partner with reputable insurance companies</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

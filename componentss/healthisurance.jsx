import { useState, useEffect } from 'react';
import InsuranceCard from '../components/InsuranceCard';
import axios from 'axios';
import '../styles/pages.css';

const HealthInsurance = () => {
  const [insurances, setInsurances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const response = await axios.get('http://localhost:3001/insurances?category=health');
        setInsurances(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching insurances:', error);
        setLoading(false);
      }
    };

    fetchInsurances();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="category-page">
      <h1>Health Insurance Options</h1>
      <div className="insurance-grid">
        {insurances.map(insurance => (
          <InsuranceCard key={insurance.id} insurance={insurance} />
        ))}
      </div>
    </div>
  );
};

export default HealthInsurance;
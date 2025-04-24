import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/components.css';

const ComparisonTool = () => {
  const [selectedInsurances, setSelectedInsurances] = useState([]);
  const [allInsurances, setAllInsurances] = useState([]);
  
  useEffect(() => {
    const fetchInsurances = async () => {
      const response = await axios.get('http://localhost:3001/insurances');
      setAllInsurances(response.data);
    };
    fetchInsurances();
  }, []);

  const toggleSelection = (insurance) => {
    if (selectedInsurances.some(item => item.id === insurance.id)) {
      setSelectedInsurances(selectedInsurances.filter(item => item.id !== insurance.id));
    } else if (selectedInsurances.length < 3) {
      setSelectedInsurances([...selectedInsurances, insurance]);
    }
  };
  return (
    <div className="comparison-tool">
      <h2>Compare Insurance Policies</h2>
      <div className="selection-area">
        {allInsurances.map(insurance => (
          <div 
            key={insurance.id} 
            className={`insurance-option ${selectedInsurances.some(item => item.id === insurance.id) ? 'selected' : ''}`}
            onClick={() => toggleSelection(insurance)}
          >
            {insurance.company} - {insurance.plan}
          </div>
        ))}
      </div>
        
      {selectedInsurances.length > 0 && (
        <div className="comparison-results">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                {selectedInsurances.map(insurance => (
                  <th key={insurance.id}>{insurance.company}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Premium</td>
                {selectedInsurances.map(insurance => (
                  <td key={insurance.id}>${insurance.premium}/month</td>
                ))}
              </tr>
              <tr>
              <td>Coverage</td>
                {selectedInsurances.map(insurance => (
                  <td key={insurance.id}>{insurance.coverage}</td>
                ))}
              </tr>
              <tr>
                <td>Benefits</td>
                {selectedInsurances.map(insurance => (
                  <td key={insurance.id}>
                    <ul>
                      {insurance.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td>Rating</td>
                {selectedInsurances.map(insurance => (
                  <td key={insurance.id}>{insurance.rating} ★</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ComparisonTool

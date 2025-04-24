const InsuranceCard = ({ insurance }) => {
    return (
      <div className="insurance-card">
        <div className="card-header">
          <h3>{insurance.company}</h3>
          <div className="rating">{insurance.rating} ★</div>
        </div>
        <div className="card-body">
          <p><strong>Coverage:</strong> {insurance.coverage}</p>
          <p><strong>Premium:</strong> ${insurance.premium}/month</p>
          <p><strong>Benefits:</strong> {insurance.benefits.join(', ')}</p>
        </div>
        <div className="card-footer">
          <button className="compare-btn">Compare</button>
          <button className="apply-btn">Apply Now</button>
        </div>
      </div>
    );
  };
  
  export default InsuranceCard;
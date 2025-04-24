
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Batini Insurance</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/health">Health</Link></li>
          <li><Link to="/vehicle">Vehicle</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/ip">Intellectual Property</Link></li>
          <li><Link to="/compare">Compare</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
import { Link } from "react-router-dom";
import logo from "../images/logo.png"; 
import bgImage from "../images/background.png"; 

const Dashboard = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >
     
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 30px",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
          
        </div>

        <div>
          <Link to="/dashboard" style={navLinkStyle}>Home</Link>
          <Link to="/errand" style={navLinkStyle}>Post Errand</Link>
          <Link to="/ViewErrands" style={navLinkStyle}>View Errands</Link>
          <Link to="/signup" style={navLinkStyle}>SignUp</Link>
          <Link to="/login" style={navLinkStyle}>Login</Link>
        </div>
      </nav>

      
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Welcome to Saada</h1>
        <p>Manage your errands and view tasks here.</p>

        
        <div style={{ marginTop: "20px" }}>
          <Link to="/ViewErrands">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
              View Errands
            </button>
          </Link>

          <Link to="/errand">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Post an Errand
            </button>
          </Link>
        </div>

        <div style={{ marginTop: "40px" }}>
          <h2>Your Stats</h2>
          <ul>
            <li>Total errands posted: 5</li>
            <li>Total errands completed: 2</li>
            <li>Rating: 4.5 ⭐</li>
          </ul>
        </div>
      </div>
    </div> 
  );
};


const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  marginLeft: "20px",
  fontWeight: "bold",
};

export default Dashboard;

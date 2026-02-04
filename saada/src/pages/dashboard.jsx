import { Link } from "react-router-dom";
import logo from "../images/logo.png";


import feature1 from "../images/feature1.png";
import feature2 from "../images/feature2.png";
import feature3 from "../images/feature3.png";


import step1 from "../images/step1.png";
import step2 from "../images/step2.png";
import step3 from "../images/step3.png";

const Dashboard = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #064e3b)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 32px",
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ height: "42px", marginRight: "12px" }} />
         
        </div>

        <div>
          <Link to="/dashboard" style={navLinkStyle}>Home</Link>
          <Link to="/errand" style={navLinkStyle}>Post Errand</Link>
          <Link to="/ViewErrands" style={navLinkStyle}>View Errands</Link>
          <Link to="/signup" style={navLinkStyle}>Sign Up</Link>
          <Link to="/login" style={navLinkStyle}>Login</Link>
        </div>
      </nav>

      
      <section style={darkSection}>
        <div style={featureGrid}>
          {[feature1, feature2, feature3].map((img, index) => (
            <div key={index} style={darkCard}>
              <img src={img} alt={`Feature ${index + 1}`} style={cardImage} />
            </div>
          ))}
        </div>
      </section>

      
      <section style={whiteSection}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={title}>Welcome to Saada</h1>
          <p style={subtitle}>
            Manage your errands and view tasks here.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/ViewErrands">
              <button style={greenButton}>View Errands</button>
            </Link>
            <Link to="/errand">
              <button style={blueButton}>Post an Errand</button>
            </Link>
          </div>
        </div>
      </section>

      
      <section style={yellowSection}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={howTitle}>How It Works</h2>

          <div style={howGrid}>
            <HowCard image={step1} title="Post an Errand" />
            <HowCard image={step2} title="Helper Claims an Errand" />
            <HowCard image={step3} title="Task Gets Done" />
          </div>
        </div>
      </section>
    </div>
  );
};


const HowCard = ({ image, title }) => (
  <div style={howCard}>
    <img src={image} alt={title} style={howImage} />
    <p style={howText}>{title}</p>
  </div>
);



const navLinkStyle = {
  color: "#e5e7eb",
  textDecoration: "none",
  marginLeft: "22px",
  fontWeight: "600",
};

const darkSection = {
  padding: "60px 30px",
  maxWidth: "1100px",
  margin: "0 auto",
};

const featureGrid = {
  display: "flex",
  gap: "24px",
  flexWrap: "wrap",
};

const darkCard = {
  flex: "1",
  minWidth: "260px",
  backgroundColor: "rgba(15, 23, 42, 0.85)",
  borderRadius: "16px",
  padding: "18px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
};

const cardImage = {
  width: "100%",
  height: "190px",
  objectFit: "cover",
  borderRadius: "12px",
};

const whiteSection = {
  backgroundColor: "#ffffff",
  padding: "70px 30px",
  color: "#111827",
};

const yellowSection = {
  backgroundColor: "#facc15",
  padding: "80px 30px",
};

const title = {
  fontSize: "2.6rem",
  fontWeight: "bold",
  marginBottom: "12px",
};

const subtitle = {
  fontSize: "1.1rem",
  color: "#374151",
  marginBottom: "36px",
};

const howTitle = {
  fontSize: "2.2rem",
  fontWeight: "bold",
  marginBottom: "40px",
  textAlign: "center",
  color: "#111827",
};

const howGrid = {
  display: "flex",
  gap: "32px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const howCard = {
  backgroundColor: "#ffffff",
  borderRadius: "18px",
  padding: "24px",
  width: "280px",
  textAlign: "center",
  boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
};

const howImage = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "16px",
};

const howText = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#111827",
};

const greenButton = {
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "#fff",
  padding: "14px 28px",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
};

const blueButton = {
  background: "linear-gradient(135deg, #2563eb, #1e40af)",
  color: "#fff",
  padding: "14px 28px",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
};

export default Dashboard;

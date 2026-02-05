import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

import feature1 from "./images/feature1.png";
import feature2 from "./images/feature2.png";
import feature3 from "./images/feature3.png";

import step1 from "./images/step1.png";
import step2 from "./images/step2.png";
import step3 from "./images/step3.png";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #064e3b)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav style={navbar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={logoStyle} />
        </div>

        {/* Hamburger for mobile */}
        <div style={hamburgerContainer} onClick={() => setMenuOpen(!menuOpen)}>
          <div style={hamburgerLine}></div>
          <div style={hamburgerLine}></div>
          <div style={hamburgerLine}></div>
        </div>

        {/* Links */}
        <div
          style={{
            ...navLinksContainer,
            display: menuOpen ? "flex" : "none",
          }}
        >
          <Link to="/dashboard" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/errand" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Post Errand</Link>
          <Link to="/ViewErrands" style={navLinkStyle} onClick={() => setMenuOpen(false)}>View Errands</Link>
          <Link to="/signup" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Sign Up</Link>
          <Link to="/login" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      </nav>

      {/* Features Section */}
      <section style={darkSection}>
        <div style={featureGrid}>
          {[feature1, feature2, feature3].map((img, index) => (
            <div key={index} style={darkCard}>
              <img src={img} alt={`Feature ${index + 1}`} style={cardImage} />
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-action Section */}
      <section style={whiteSection}>
        <div style={whiteContainer}>
          <h1 style={title}>Welcome to Saada</h1>
          <p style={subtitle}>Manage your errands and view tasks here.</p>

          <div style={ctaButtons}>
            <Link to="/ViewErrands">
              <button style={greenButton}>View Errands</button>
            </Link>
            <Link to="/errand">
              <button style={blueButton}>Post an Errand</button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section style={yellowSection}>
        <div style={yellowContainer}>
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

// Navbar styles
const navbar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 20px",
  backgroundColor: "rgba(15, 23, 42, 0.95)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  flexWrap: "wrap",
  position: "relative",
};

const logoStyle = {
  height: "40px",
  marginRight: "12px",
};

const navLinksContainer = {
  display: "flex",
  flexDirection: "column", // vertical on mobile
  position: "absolute",
  top: "60px",
  right: "20px",
  backgroundColor: "rgba(15, 23, 42, 0.95)",
  borderRadius: "8px",
  padding: "10px",
  gap: "10px",
  width: "180px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
  zIndex: 100,
};

const navLinkStyle = {
  color: "#e5e7eb",
  textDecoration: "none",
  fontWeight: "600",
};

// Hamburger styles
const hamburgerContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "25px",
  height: "18px",
  cursor: "pointer",
};

const hamburgerLine = {
  height: "3px",
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: "2px",
};

// Features section
const darkSection = {
  padding: "40px 20px",
  maxWidth: "1100px",
  margin: "0 auto",
};

const featureGrid = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const darkCard = {
  flex: "1 1 260px",
  minWidth: "260px",
  maxWidth: "320px",
  backgroundColor: "rgba(15, 23, 42, 0.85)",
  borderRadius: "16px",
  padding: "18px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
};

const cardImage = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "12px",
};

// White Section (CTA)
const whiteSection = {
  backgroundColor: "#ffffff",
  padding: "50px 20px",
  color: "#111827",
};

const whiteContainer = {
  maxWidth: "900px",
  margin: "0 auto",
  textAlign: "center",
};

const title = {
  fontSize: "2.2rem",
  fontWeight: "bold",
  marginBottom: "12px",
};

const subtitle = {
  fontSize: "1rem",
  color: "#374151",
  marginBottom: "30px",
};

const ctaButtons = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  justifyContent: "center",
};

// Yellow Section (How it works)
const yellowSection = {
  backgroundColor: "#facc15",
  padding: "60px 20px",
};

const yellowContainer = {
  maxWidth: "1000px",
  margin: "0 auto",
};

const howTitle = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "30px",
  textAlign: "center",
  color: "#111827",
};

const howGrid = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const howCard = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "20px",
  width: "260px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
};

const howImage = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "12px",
};

const howText = {
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#111827",
};

const greenButton = {
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "#fff",
  padding: "12px 24px",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
};

const blueButton = {
  background: "linear-gradient(135deg, #2563eb, #1e40af)",
  color: "#fff",
  padding: "12px 24px",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
};

export default Dashboard;

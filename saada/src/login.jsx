import { useState } from "react";
import { login } from "./Services/authservice";
import { useNavigate, Link } from "react-router-dom";
import logo from "./images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/index"); // redirect to dashboard after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "#020617",
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
          <Link to="/index" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/errand" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Post Errand</Link>
          <Link to="/ViewErrands" style={navLinkStyle} onClick={() => setMenuOpen(false)}>View Errands</Link>
          <Link to="/signup" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Sign Up</Link>
          <Link to="/login" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      </nav>

      {/* Centered Login Form */}
      <div style={formWrapper}>
        <div style={formContainer}>
          <h2 style={formTitle}>Login</h2>

          {error && <p style={formError}>{error}</p>}

          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                ...submitButton,
                boxShadow: hovered
                  ? "0 10px 22px rgba(0,0,0,0.35)"
                  : "0 6px 14px rgba(0,0,0,0.25)",
                transform: hovered ? "translateY(-2px)" : "none",
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Login
            </button>
          </form>

          <p style={signupText}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#2563eb", fontWeight: "600" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */
const navbar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 20px",
  backgroundColor: "#0f172a",
  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  flexWrap: "wrap",
  position: "relative",
};

const logoStyle = {
  height: "40px",
  marginRight: "12px",
};

const navLinksContainer = {
  flexDirection: "column",
  position: "absolute",
  top: "60px",
  right: "20px",
  backgroundColor: "#0f172a",
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

const formWrapper = {
  minHeight: "calc(100vh - 70px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const formContainer = {
  width: "100%",
  maxWidth: "420px",
  padding: "34px",
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
};

const formTitle = {
  textAlign: "center",
  marginBottom: "22px",
  fontWeight: "700",
  color: "#111827",
};

const formError = {
  color: "#dc2626",
  textAlign: "center",
  marginBottom: "12px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5f5",
  fontSize: "14px",
};

const submitButton = {
  marginTop: "12px",
  padding: "14px",
  fontSize: "15px",
  fontWeight: "600",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
  transition: "all 0.25s ease",
};

const signupText = {
  marginTop: "18px",
  textAlign: "center",
  fontSize: "14px",
  color: "#4b5563",
};

export default Login;

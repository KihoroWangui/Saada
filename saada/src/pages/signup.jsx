import { useState } from "react";
import { signup } from "../Services/authservice";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png"; 

const navLinkStyle = {
  margin: "0 10px",
  textDecoration: "none",
  color: "white",
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Navbar */}
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
          <button id="loginBtn" class="btn btn-primary">
    <i class="bi bi-person-circle"></i>
</button>
        </div>
      </nav>

      {/* Signup Form */}
      <div style={{ padding: "20px" }}>
        <h2>Create Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default Signup;

import { useState } from "react";
import { login } from "../Services/authservice";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png"; 

const navLinkStyle = {
  margin: "0 10px",
  textDecoration: "none",
  color: "white",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/"); 
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
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

      <div style={{ padding: "20px" }}>
        <h2>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
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

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;

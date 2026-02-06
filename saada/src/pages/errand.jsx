import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { postErrand } from "../Services/errandservice";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png";

const PostErrand = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in to post an errand.");
      return;
    }

    try {
      await postErrand({
        title,
        description,
        location,
        rating: rating ? parseFloat(rating) : 0,
        postedBy: user.uid,
      });
      alert("Errand posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "#f1f5f9",
      }}
    >
      {/* Navbar */}
      <nav style={navbar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={logoStyle} />
        </div>

        {/* Hamburger */}
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

      {/* Centered Form */}
      <div style={formWrapper}>
        <div style={formContainer}>
          <h2 style={formTitle}>Post a New Errand</h2>

          {error && <p style={formError}>{error}</p>}

          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="text"
              placeholder="Errand title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={inputStyle}
            />

            <textarea
              placeholder="Describe the errand..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Location (optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Rating (optional)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
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
              Post Errand
            </button>
          </form>
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
  maxWidth: "440px",
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
  resize: "none",
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

export default PostErrand;

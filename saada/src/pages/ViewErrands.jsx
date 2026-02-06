import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllErrands } from "../Services/errandservice";
import TaskCard from "../components/taskcard";
import logo from "../images/logo.png";

const ViewErrands = () => {
  const [errands, setErrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchErrands = async () => {
      try {
        const data = await getAllErrands();
        setErrands(data);
      } catch (err) {
        console.error("Error fetching errands:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchErrands();
  }, []);

  const handleTaskUpdate = (taskId, updatedFields) => {
    setErrands((prevErrands) =>
      prevErrands.map((errand) =>
        errand.id === taskId ? { ...errand, ...updatedFields } : errand
      )
    );
  };

  return (
    <>
      {/* Updated Navbar */}
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

        {/* Nav Links */}
        <div style={{ ...navLinksContainer, display: menuOpen ? "flex" : "none" }}>
          <Link to="/index" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/errand" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Post Errand</Link>
          <Link to="/ViewErrands" style={navLinkStyle} onClick={() => setMenuOpen(false)}>View Errands</Link>
          <Link to="/signup" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Sign Up</Link>
          <Link to="/login" style={navLinkStyle} onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      </nav>

      {/* --- Rest of your ViewErrands page remains unchanged --- */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "30px 20px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Available Errands
        </h2>

        {loading && (
          <p style={{ textAlign: "center", fontSize: "18px" }}>Loading errands...</p>
        )}

        {!loading && errands.length === 0 && (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            No errands available right now 🚫
          </p>
        )}

        {!loading && errands.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {errands.map((errand) => (
              <TaskCard key={errand.id} task={errand} onUpdate={handleTaskUpdate} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

/* -------- Navbar Styles -------- */
const navbar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 20px",
  backgroundColor: "#0f172a",
  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  flexWrap: "wrap",
  position: "sticky",
  top: 0,
  zIndex: 100,
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

export default ViewErrands;

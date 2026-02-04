import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllErrands } from "../Services/errandservice";
import TaskCard from "../components/taskcard";
import logo from "../images/logo.png"; 

const navLinkStyle = {
  margin: "0 10px",
  textDecoration: "none",
  color: "white",
};

const ViewErrands = () => {
  const [errands, setErrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchErrands = async () => {
      try {
        const data = await getAllErrands();
        console.log("Fetched errands:", data);
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

  if (loading) return <p>Loading errands...</p>;
  if (!errands.length) return <p>No errands found</p>;

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

      <div className="grid gap-4" style={{ padding: "20px" }}>
        <h2 className="text-xl font-bold">Available Errands</h2>

        {errands.map((errand) => (
          <TaskCard
            key={errand.id}
            task={errand}
            onUpdate={handleTaskUpdate}
          />
        ))}
      </div>
    </>
  );
};

export default ViewErrands;

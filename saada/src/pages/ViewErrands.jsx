
import { useState, useEffect } from "react";
import { getAllErrands } from "../Services/errandservice";

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

  if (loading) return <p>Loading errands...</p>;
  if (!errands.length) return <p>No errands found</p>;

  return (
    <div>
      <h2>Available Errands</h2>
      {errands.map((errand) => (
        <div
          key={errand.id}
          style={{
            border: "1px solid gray",
            borderRadius: "5px",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{errand.title}</h3>
          <p>{errand.description}</p>
          <p>Rating: {errand.rating ?? 0}</p>
          <p>
            Created At:{" "}
            {errand.createdAt?.toDate
              ? errand.createdAt.toDate().toLocaleString()
              : "Unknown"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ViewErrands;

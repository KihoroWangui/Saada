import { useState, useEffect } from "react";
import { getAllErrands } from "../Services/errandservice";
import TaskCard from "../components/taskcard";

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

  // Update a task in local state after it is claimed
  const handleTaskClaimed = (taskId, userId) => {
    setErrands((prevErrands) =>
      prevErrands.map((errand) =>
        errand.id === taskId
          ? { ...errand, status: "claimed", claimedBy: userId }
          : errand
      )
    );
  };

  if (loading) return <p>Loading errands...</p>;
  if (!errands.length) return <p>No errands found</p>;

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-bold">Available Errands</h2>

      {errands.map((errand) => (
        <TaskCard
          key={errand.id}
          task={errand}
          onClaimed={handleTaskClaimed}
        />
      ))}
    </div>
  );
};

export default ViewErrands;

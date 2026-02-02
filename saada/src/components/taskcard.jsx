import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";

function TaskCard({ task, onClaimed }) {
  const { currentUser } = useAuth();

  // DEBUGGING
  console.log("Rendering TaskCard for task:", task);
  console.log("Current user:", currentUser);

  // TEMP: Force button to show to debug
  const canClaim = true;

  const handleClaim = async () => {
    if (!currentUser) return;

    try {
      const taskRef = doc(db, "errands", task.id);

      await updateDoc(taskRef, {
        status: "claimed",
        claimedBy: currentUser.uid,
      });

      onClaimed(task.id, currentUser.uid);
    } catch (error) {
      console.error("Error claiming task:", error);
    }
  };

  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      {canClaim && (
        <button
          onClick={handleClaim}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Claim Errand
        </button>
      )}

      {task.status === "claimed" && (
        <p className="mt-2 text-yellow-600">
          {task.claimedBy === currentUser?.uid
            ? "Claimed by you"
            : "Claimed"}
        </p>
      )}
    </div>
  );
}

export default TaskCard;

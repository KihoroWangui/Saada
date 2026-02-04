import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";

function TaskCard({ task, onUpdate }) {
  const { user: currentUser } = useAuth();

  console.log("Rendering TaskCard:", task);
  console.log("Current user:", currentUser);

  // Determine permissions
  const canClaim = currentUser && task.status === "open";
  const canComplete = currentUser && task.status === "claimed" && task.claimedBy === currentUser.uid;

  // Claim errand
  const handleClaim = async () => {
    if (!currentUser || !task.id) return;

    try {
      const taskRef = doc(db, "errands", task.id);

      await updateDoc(taskRef, {
        status: "claimed",
        claimedBy: currentUser.uid,
      });

      console.log("Task claimed successfully");
      onUpdate(task.id, { status: "claimed", claimedBy: currentUser.uid });
    } catch (error) {
      console.error("Error claiming task:", error);
    }
  };

  // Complete errand
  const handleComplete = async () => {
    if (!currentUser || !task.id) return;

    try {
      const taskRef = doc(db, "errands", task.id);

      await updateDoc(taskRef, {
        status: "completed",
      });

      console.log("Task completed successfully");
      onUpdate(task.id, { status: "completed" });
      alert("Errand completed!");
    } catch (error) {
      console.error("Error completing task:", error);
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

      {canComplete && (
        <button
          onClick={handleComplete}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          Complete Errand
        </button>
      )}

      {task.status === "claimed" && !canComplete && (
        <p className="mt-2 text-yellow-600">
          {task.claimedBy === currentUser?.uid
            ? "Claimed by you"
            : "Claimed by another user"}
        </p>
      )}

      {task.status === "completed" && (
        <p className="mt-2 text-gray-600 font-semibold">✅ Completed</p>
      )}
    </div>
  );
}

export default TaskCard;

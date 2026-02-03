import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";

function TaskCard({ task, onClaimed }) {
  const { currentUser } = useAuth();

  console.log("Task:", task);
  console.log("Current user:", currentUser);

  // BUTTON LOGIC: show if task is open, ignoring case/space, and not already claimed
  const canClaim =
    currentUser &&
    task.status &&
    task.status.toLowerCase().trim() === "open" &&
    !task.claimedBy;

  const handleClaim = async () => {
    if (!currentUser) {
      alert("You must be logged in to claim an errand");
      return;
    }

    try {
      console.log("Claiming task:", task.id);

      const taskRef = doc(db, "errands", task.id);

      await updateDoc(taskRef, {
        status: "claimed",
        claimedBy: currentUser.uid,
      });

      console.log("Task claimed successfully");

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

      {/* DEBUG INFO */}
      <p className="text-xs text-red-600">
        DEBUG → status: [{String(task.status)}] | claimedBy: [{task.claimedBy || "NONE"}] | user: [{currentUser ? "YES" : "NO"}]
      </p>

      {canClaim && (
        <button
          onClick={handleClaim}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Claim Errand
        </button>
      )}

      {task.status?.toLowerCase().trim() === "claimed" && (
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

import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import { useState } from "react";

function TaskCard({ task, onUpdate }) {
  const { user: currentUser } = useAuth();
  const [hovered, setHovered] = useState(null);

  // Permissions
  const canClaim = currentUser && task.status === "open";
  const canComplete =
    currentUser &&
    task.status === "claimed" &&
    task.claimedBy === currentUser.uid;

  // Shared base button style
  const baseButtonStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.25s ease",
    marginTop: "10px",
  };

  // Claim errand
  const handleClaim = async () => {
    if (!currentUser || !task.id) return;

    try {
      const taskRef = doc(db, "errands", task.id);

      await updateDoc(taskRef, {
        status: "claimed",
        claimedBy: currentUser.uid,
      });

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

      onUpdate(task.id, { status: "completed" });
      alert("Errand completed!");
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <h3 style={{ fontWeight: "600", marginBottom: "6px" }}>
        {task.title}
      </h3>

      <p style={{ marginBottom: "10px", color: "#374151" }}>
        {task.description}
      </p>

      <p style={{ fontSize: "14px", marginBottom: "6px" }}>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color:
              task.status === "open"
                ? "#2563eb"
                : task.status === "claimed"
                ? "#ca8a04"
                : "#16a34a",
            fontWeight: "600",
          }}
        >
          {task.status}
        </span>
      </p>

      {/* Claim Button */}
      {canClaim && (
        <button
          onClick={handleClaim}
          style={{
            ...baseButtonStyle,
            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: "white",
            boxShadow:
              hovered === "claim"
                ? "0 6px 14px rgba(0,0,0,0.25)"
                : "0 4px 8px rgba(0,0,0,0.15)",
            transform:
              hovered === "claim" ? "translateY(-2px)" : "none",
          }}
          onMouseEnter={() => setHovered("claim")}
          onMouseLeave={() => setHovered(null)}
        >
          Claim Errand
        </button>
      )}

      {/* Complete Button */}
      {canComplete && (
        <button
          onClick={handleComplete}
          style={{
            ...baseButtonStyle,
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            color: "white",
            boxShadow:
              hovered === "complete"
                ? "0 6px 14px rgba(0,0,0,0.25)"
                : "0 4px 8px rgba(0,0,0,0.15)",
            transform:
              hovered === "complete" ? "translateY(-2px)" : "none",
          }}
          onMouseEnter={() => setHovered("complete")}
          onMouseLeave={() => setHovered(null)}
        >
          Complete Errand
        </button>
      )}

      {/* Claimed Info */}
      {task.status === "claimed" && !canComplete && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: "#ca8a04",
            fontWeight: "600",
          }}
        >
          {task.claimedBy === currentUser?.uid
            ? "Claimed by you"
            : "Claimed by another user"}
        </p>
      )}

      {/* Completed */}
      {task.status === "completed" && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: "#16a34a",
            fontWeight: "600",
          }}
        >
          ✅ Completed
        </p>
      )}
    </div>
  );
}

export default TaskCard;

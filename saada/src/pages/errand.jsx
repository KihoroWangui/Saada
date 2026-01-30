
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { postErrand } from "../Services/errandservice";
import { useNavigate } from "react-router-dom";

const PostErrand = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");

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
        rating: parseFloat(rating),
        postedBy: user.uid,
      });
      alert("Errand posted successfully!");
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Post a New Errand</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button type="submit">Post Errand</button>
      </form>
    </div>
  );
};

export default PostErrand;

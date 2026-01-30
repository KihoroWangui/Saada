
import { db } from "../firebase/config";
import { collection,addDoc, getDocs,query,orderBy, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
// Function for creating a new errand
export const postErrand = async ({ title, description, location, rating, postedBy }) => {
  const docRef = await addDoc(collection(db, "errands"), {
    title,
    description,
    location: location || "",
    rating: rating || 0,
    postedBy,
    claimedBy: null,
    status: "posted",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};
//Fetch function to enable viewing of all errands
export const getAllErrands = async () => {
  const q = query(collection(db, "errands"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  const errands = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return errands;
};
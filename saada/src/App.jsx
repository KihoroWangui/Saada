
import { auth, db } from "./firebase/config";

function App() {
  console.log("Firebase auth:", auth); 
  return <h1>Saada App</h1>; 
}

export default App; 

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";
import PostErrand from "./pages/errand";
import ViewErrands from "./pages/ViewErrands";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/errand"
            element={
              <PrivateRoute>
                <PostErrand />
              </PrivateRoute>
            }
          />
          <Route path="/ViewErrands" element={<ViewErrands />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

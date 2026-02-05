import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import Index from "./index"; 
import Login from "./login";
import Signup from "./signup";
import PostErrand from "./errand";
import ViewErrands from "./ViewErrands";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Redirect root to /index */}
          <Route path="/" element={<Navigate to="/index" replace />} />

         
          <Route
            path="/index"
            element={
              <PrivateRoute>
                <Index /> 
              </PrivateRoute>
            }
          />

          {/* Protected Post Errand */}
          <Route
            path="/errand"
            element={
              <PrivateRoute>
                <PostErrand />
              </PrivateRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ViewErrands" element={<ViewErrands />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/index" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

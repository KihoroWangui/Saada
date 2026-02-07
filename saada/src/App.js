import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import Index from "./pages/index"; 
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

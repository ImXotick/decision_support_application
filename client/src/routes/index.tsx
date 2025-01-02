import { Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Login,
  SignUp,
  Profile,
  Models,
  NotFound,
} from "../pages";
import { ProtectedRoute } from "../components";

function SignUpAndLogout() {
  localStorage.clear();
  return <SignUp />;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/models"
        element={
          <ProtectedRoute>
            <Models />
          </ProtectedRoute>
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpAndLogout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

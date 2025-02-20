import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import AddCourse from "../pages/AddCourse";
import InstructorDashboard from "../pages/InstructorDashboard";
import AssignmentPage from "../pages/AssignmentPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-course" element={<AddCourse />} />
      <Route path="/instructor-dashboard" element={<InstructorDashboard />} />

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin-dashboard/assign/:id"
          element={<AssignmentPage />}
        />
        <Route
          path="//admin-dashboard/instructor-register"
          element={<Register />}
        />
      </Route>
    </Routes>
  );
};

export default Routers;

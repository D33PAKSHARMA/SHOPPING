import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Forgot from "./pages/Auth/Forgot";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;

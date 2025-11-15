import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import AllUsers from "./pages/AllUsers";
import CreatePost from "./pages/CreatePost";
import AllPost from "./pages/AllPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        {localStorage.getItem("userId") && <Navbar />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <AllUsers />
              </PrivateRoute>
            }
          />

          <Route
            path="/post"
            element={
              <PrivateRoute>
                <AllPost />
              </PrivateRoute>
            }
          />

          <Route
            path="/createpost"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />

        </Routes>
      </div>
    </div>
  );
}

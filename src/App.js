import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import WithoutNav from "./components/WithoutNav/WithoutNav";
import WithNav from "./components/WithNav/WithNav";
import SignUp from "./components/SignUp/SignUp";
import Users from "./components/Users/Users";
import UserDetail from "./components/UserDetail/UserDetail";
import NotFound from "./components/NotFound/NotFound";
import UserEdit from "./components/UserEdit/UserEdit";
import UserDashboard from "./components/Dashboard/UserDashboard/UserDashboard";
import VideoDashboard from "./components/Dashboard/VideoDashboard/VideoDashboard";
import Dashboard from "./components/Dashboard/Dashboard";
import VideoDetail from "./components/VideoDetail/VideoDetail";
import VideoEdit from "./components/VideoEdit/VideoEdit";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<WithNav />}>
            <Route index path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* users */}
            <Route path="/dashboard/manage/user" element={<UserDashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="/user/edit/:id" element={<UserEdit />} />
            {/* users */}
            {/* videos */}
            <Route
              path="/dashboard/manage/videos"
              element={<VideoDashboard />}
            />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/video/edit/:id" element={<VideoEdit />} />
            {/* videos */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/page-not-found-404" element={<NotFound />} />
            <Route index path="/" element={<Home />} />
            <Route
              path="*"
              element={<Navigate to="/page-not-found-404" replace />}
            />
          </Route>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

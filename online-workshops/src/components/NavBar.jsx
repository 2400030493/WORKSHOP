import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/auth";

export default function NavBar() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Workshops Platform</Link></li>
      </ul>
      <ul>
        <li><NavLink to="/workshops">Workshops</NavLink></li>
        {user?.role === "admin" && <li><NavLink to="/admin">Admin</NavLink></li>}
        {user && <li><NavLink to="/my">My Sessions</NavLink></li>}
        {!user && <li><NavLink to="/login">Login</NavLink></li>}
        {!user && <li><NavLink to="/register">Register</NavLink></li>}
        {user && <li><button onClick={handleLogout} className="secondary">Logout ({user.name})</button></li>}
      </ul>
    </nav>
  );
}

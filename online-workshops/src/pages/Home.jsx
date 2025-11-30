import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Online Workshops</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/workshops">
          <button className="button">Browse Workshops</button>
        </Link>
        <Link to="/register" style={{ marginLeft: "10px" }}>
          <button className="button">Create Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

function Login() {
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login Page</h2>
      <form>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Email:
          <input type="email" placeholder="Enter email" style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc" }} />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Password:
          <input type="password" placeholder="Enter password" style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc" }} />
        </label>
        <button type="submit" className="button" style={{ width: "100%", marginTop: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
}


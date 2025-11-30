import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const user = await login(form);
      setMessage({ type: "success", text: `Welcome, ${user.name}!` });
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Login failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Login</h2>
      {message && <div role="alert" className={message.type}>{message.text}</div>}
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={onChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={onChange} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
      </form>
      <small>No account? <Link to="/register">Register</Link></small>
      <details>
        <summary>Admin account (for demo)</summary>
        <small>Email: admin@workshops.com | Password: Admin@123</small>
      </details>
    </section>
  );
}

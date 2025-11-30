import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrors({});
    try {
      const user = await register(form);
      setMessage({ type: "success", text: `Account created. Welcome, ${user.name}!` });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      if (err.type === "validation") setErrors(err.errors);
      else setMessage({ type: "error", text: err.message || "Registration failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Create account</h2>
      {message && <div role="alert" className={message.type}>{message.text}</div>}
      <form onSubmit={onSubmit} noValidate>
        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} />
          {errors.name && <small className="error">{errors.name}</small>}
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={onChange} />
          {errors.email && <small className="error">{errors.email}</small>}
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={onChange} />
          {errors.password && <small className="error">{errors.password}</small>}
        </label>
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
      </form>
    </section>
  );
}

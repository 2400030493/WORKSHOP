import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listWorkshops, createWorkshop, updateWorkshop } from "../services/api";

export default function WorkshopForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    capacity: 10,
    materialsUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const ws = await listWorkshops();
      const w = ws.find(x => x.id === id);
      if (w) setForm(w);
    })();
  }, [id]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrors({});
    try {
      if (id) {
        await updateWorkshop(id, form);
        setMessage({ type: "success", text: "Workshop updated." });
      } else {
        await createWorkshop(form);
        setMessage({ type: "success", text: "Workshop created." });
      }
      setTimeout(() => navigate("/workshops"), 800);
    } catch (err) {
      if (err.type === "validation") setErrors(err.errors);
      else setMessage({ type: "error", text: err.message || "Save failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>{id ? "Edit Workshop" : "New Workshop"}</h2>
      {message && <div role="alert" className={message.type}>{message.text}</div>}
      <form onSubmit={onSubmit} noValidate>
        <label>
          Title
          <input name="title" value={form.title} onChange={onChange} />
          {errors.title && <small className="error">{errors.title}</small>}
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={onChange} rows={4} />
          {errors.description && <small className="error">{errors.description}</small>}
        </label>
        <div className="grid">
          <label>
            Date (YYYY-MM-DD)
            <input name="date" type="date" value={form.date} onChange={onChange} />
            {errors.date && <small className="error">{errors.date}</small>}
          </label>
          <label>
            Time (HH:MM)
            <input name="time" type="time" value={form.time} onChange={onChange} />
            {errors.time && <small className="error">{errors.time}</small>}
          </label>
          <label>
            Capacity
            <input name="capacity" type="number" min="1" value={form.capacity} onChange={onChange} />
            {errors.capacity && <small className="error">{errors.capacity}</small>}
          </label>
        </div>
        <label>
          Materials URL
          <input name="materialsUrl" value={form.materialsUrl} onChange={onChange} placeholder="https://..." />
          {errors.materialsUrl && <small className="error">{errors.materialsUrl}</small>}
        </label>
        <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
      </form>
    </section>
  );
}

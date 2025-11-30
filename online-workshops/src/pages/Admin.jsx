import { useEffect, useState } from "react";
import { listWorkshops, deleteWorkshop } from "../services/api";
import { Link } from "react-router-dom";

export default function Admin() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const refresh = async () => {
    setLoading(true);
    const data = await listWorkshops();
    setWorkshops(data);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const onDelete = async (id) => {
    try {
      await deleteWorkshop(id);
      setMessage({ type: "success", text: "Deleted." });
      refresh();
    } catch {
      setMessage({ type: "error", text: "Delete failed." });
    }
  };

  return (
    <section>
      <header className="grid">
        <h2>Admin • Manage Workshops</h2>
        <Link to="/workshops/new" className="contrast">+ New Workshop</Link>
      </header>
      {message && <div role="alert" className={message.type}>{message.text}</div>}
      {loading ? <progress /> : (
        <table>
          <thead>
            <tr>
              <th>Title</th><th>Date</th><th>Time</th><th>Capacity</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map(w => (
              <tr key={w.id}>
                <td>{w.title}</td>
                <td>{w.date}</td>
                <td>{w.time}</td>
                <td>{w.capacity}</td>
                <td>
                  <Link to={`/workshops/${w.id}/edit`} className="secondary">Edit</Link>
                  <button onClick={() => onDelete(w.id)} className="contrast">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

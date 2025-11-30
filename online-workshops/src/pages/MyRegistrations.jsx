import { useEffect, useState } from "react";
import { myRegistrations } from "../services/api";
import { getCurrentUser } from "../services/auth";

export default function MyRegistrations() {
  const user = getCurrentUser();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await myRegistrations(user.id);
        setItems(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [user.id]);

  return (
    <section>
      <h2>My Sessions</h2>
      {loading ? <progress /> : (
        items.length === 0 ? <p>No registrations yet.</p> : (
          <div className="grid">
            {items.map(r => (
              <article key={r.id}>
                <h3>{r.workshop?.title}</h3>
                <p>{r.workshop?.description}</p>
                <small>{r.workshop?.date} @ {r.workshop?.time}</small>
                {r.workshop?.materialsUrl && (
                  <footer>
                    <a href={r.workshop.materialsUrl} target="_blank" rel="noreferrer">Access Materials</a>
                  </footer>
                )}
              </article>
            ))}
          </div>
        )
      )}
    </section>
  );
}

<article className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition">
  <h3 className="text-2xl font-bold text-purple-600 mb-2">{w.title}</h3>
  <p className="text-gray-700 mb-2">{w.description}</p>
  <small className="text-sm text-gray-500">{w.date} @ {w.time} • Capacity: {w.capacity}</small>
  <div className="mt-4">
    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Register</button>
  </div>
</article>

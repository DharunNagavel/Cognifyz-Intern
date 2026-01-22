import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u._id} className="p-4 bg-white shadow rounded">
            <h3 className="font-bold">{u.name}</h3>
            <p className="text-sm text-gray-600">{u.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

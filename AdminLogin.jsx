import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * credentials:
 * username: admin@vibevastra.com
 * password: 123456
 *
 * on successful login we store a simple session object in localStorage:
 * key: 'adminSession' => { user: 'admin@vibevastra.com', token: 'simple-token', expires: <timestamp> }
 *
 * admin can navigate to /admin/dashboard directly if session exists
 */

const ADMIN_USER = "admin@vibevastra.com";
const ADMIN_PASS = "123456";
const SESSION_KEY = "adminSession";

function isSessionValid() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const s = JSON.parse(raw);
    return s && s.user === ADMIN_USER && s.token;
  } catch {
    return false;
  }
}

export default function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSessionValid()) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      // create session in localStorage
      const session = { user: ADMIN_USER, token: "vibevastra-admin-token", createdAt: Date.now() };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      // navigate
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input value={user} onChange={e => setUser(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" placeholder="admin@vibevastra.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" placeholder="123456" />
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Login</button>
            <a href="/" className="text-sm text-indigo-600">Back to store</a>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          Use username <b>admin@vibevastra.com</b> and password <b>123456</b>.
        </div>
      </div>
    </div>
  );
}

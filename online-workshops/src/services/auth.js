import { ls, ss } from "./storage";

const USERS_KEY = "users";
const SESSION_KEY = "session";

// Seed an admin
function ensureAdmin() {
  const users = ls.get(USERS_KEY, []);
  if (!users.find(u => u.email === "admin@workshops.com")) {
    users.push({
      id: crypto.randomUUID(),
      name: "Admin",
      email: "admin@workshops.com",
      password: "Admin@123",
      role: "admin",
    });
    ls.set(USERS_KEY, users);
  }
}
ensureAdmin();

export async function register({ name, email, password }) {
  await delay(500);
  const errors = {};
  if (!name || name.trim().length < 3) errors.name = "Name must be at least 3 characters.";
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email.";
  if (!password || password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password))
    errors.password = "Password must be 8+ chars with at least one uppercase and one number.";
  if (Object.keys(errors).length) throw { type: "validation", errors };

  const users = ls.get(USERS_KEY, []);
  if (users.find(u => u.email === email)) throw { type: "message", message: "Email already registered." };

  const newUser = { id: crypto.randomUUID(), name, email, password, role: "user" };
  users.push(newUser);
  ls.set(USERS_KEY, users);
  ss.set(SESSION_KEY, { userId: newUser.id });
  return sanitizeUser(newUser);
}

export async function login({ email, password }) {
  await delay(500);
  const users = ls.get(USERS_KEY, []);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw { type: "message", message: "Invalid credentials." };
  ss.set(SESSION_KEY, { userId: user.id });
  return sanitizeUser(user);
}

export function logout() {
  ss.remove(SESSION_KEY);
}

export function getCurrentUser() {
  const session = ss.get(SESSION_KEY);
  if (!session) return null;
  const users = ls.get(USERS_KEY, []);
  const user = users.find(u => u.id === session.userId);
  return user ? sanitizeUser(user) : null;
}

function sanitizeUser(u) {
  const { password, ...safe } = u;
  return safe;
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

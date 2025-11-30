import { ls } from "./storage";
const WORKSHOPS_KEY = "workshops";
const REG_KEY = "registrations";

function initSeed() {
  const existing = ls.get(WORKSHOPS_KEY);
  if (!existing || existing.length === 0) {
    const seed = [
      {
        id: crypto.randomUUID(),
        title: "React Basics",
        description: "Intro to components, props, state",
        date: "2025-12-01",
        time: "10:00",
        capacity: 50,
        materialsUrl: "https://example.com/react-basics.pdf",
      },
      {
        id: crypto.randomUUID(),
        title: "Advanced CSS",
        description: "Flexbox, Grid, Responsive Design",
        date: "2025-12-02",
        time: "14:00",
        capacity: 40,
        materialsUrl: "https://example.com/advanced-css.pdf",
      },
    ];
    ls.set(WORKSHOPS_KEY, seed);
  }
  if (!ls.get(REG_KEY)) ls.set(REG_KEY, []);
}
initSeed();

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export async function listWorkshops() {
  await delay(300);
  return ls.get(WORKSHOPS_KEY, []);
}

export async function createWorkshop(data) {
  await delay(500);
  const errors = validateWorkshop(data);
  if (Object.keys(errors).length) throw { type: "validation", errors };
  const ws = ls.get(WORKSHOPS_KEY, []);
  const newW = { ...data, id: crypto.randomUUID() };
  ws.push(newW);
  ls.set(WORKSHOPS_KEY, ws);
  return newW;
}

export async function updateWorkshop(id, data) {
  await delay(500);
  const errors = validateWorkshop(data);
  if (Object.keys(errors).length) throw { type: "validation", errors };
  const ws = ls.get(WORKSHOPS_KEY, []);
  const idx = ws.findIndex(w => w.id === id);
  if (idx === -1) throw { type: "message", message: "Workshop not found." };
  ws[idx] = { ...ws[idx], ...data };
  ls.set(WORKSHOPS_KEY, ws);
  return ws[idx];
}

export async function deleteWorkshop(id) {
  await delay(300);
  const ws = ls.get(WORKSHOPS_KEY, []);
  ls.set(WORKSHOPS_KEY, ws.filter(w => w.id !== id));
  return true;
}

export async function registerForWorkshop(workshopId, userId) {
  await delay(300);
  const regs = ls.get(REG_KEY, []);
  if (regs.find(r => r.workshopId === workshopId && r.userId === userId)) {
    throw { type: "message", message: "Already registered." };
  }
  const ws = ls.get(WORKSHOPS_KEY, []);
  const w = ws.find(x => x.id === workshopId);
  if (!w) throw { type: "message", message: "Workshop not found." };

  const count = regs.filter(r => r.workshopId === workshopId).length;
  if (count >= Number(w.capacity)) throw { type: "message", message: "Capacity full." };

  const reg = { id: crypto.randomUUID(), workshopId, userId, createdAt: new Date().toISOString() };
  regs.push(reg);
  ls.set(REG_KEY, regs);
  return reg;
}

export async function myRegistrations(userId) {
  await delay(300);
  const regs = ls.get(REG_KEY, []);
  const ws = ls.get(WORKSHOPS_KEY, []);
  return regs
    .filter(r => r.userId === userId)
    .map(r => ({ ...r, workshop: ws.find(w => w.id === r.workshopId) }));
}

function validateWorkshop(d) {
  const errors = {};
  if (!d.title || d.title.trim().length < 3) errors.title = "Title must be at least 3 characters.";
  if (!d.description || d.description.trim().length < 10) errors.description = "Description must be 10+ characters.";
  if (!d.date || !/^\d{4}-\d{2}-\d{2}$/.test(d.date)) errors.date = "Date must be in YYYY-MM-DD format.";
  if (!d.time || !/^\d{2}:\d{2}$/.test(d.time)) errors.time = "Time must be in HH:MM format.";
  if (d.capacity == null || isNaN(Number(d.capacity)) || Number(d.capacity) < 1) errors.capacity = "Capacity must be a positive number.";
  if (d.materialsUrl && !/^https?:\/\/\S+$/.test(d.materialsUrl)) errors.materialsUrl = "Materials URL must be a valid link.";
  return errors;
}

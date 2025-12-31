import { Router } from "express";
import fs from "fs";
import { v4 as uuid } from "uuid";

const router = Router();
const USERS_FILE = "./data/users.json";

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const users = readUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = { id: uuid(), name, email, password };
  users.push(user);
  saveUsers(users);

  res.json({ id: user.id, name, email });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ id: user.id, name: user.name, email: user.email });
});

export default router;

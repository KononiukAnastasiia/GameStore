import fs from "fs/promises";
import path from "path";

const dataDir = path.resolve(process.cwd(), "data");

export async function readJson(fileName, fallback) {
  try {
    const full = path.join(dataDir, fileName);
    const raw = await fs.readFile(full, "utf-8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export async function writeJson(fileName, data) {
  await fs.mkdir(dataDir, { recursive: true });
  const full = path.join(dataDir, fileName);
  await fs.writeFile(full, JSON.stringify(data, null, 2), "utf-8");
}

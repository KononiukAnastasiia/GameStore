import { Router } from "express";
import fs from "fs";
import { v4 as uuid } from "uuid";

const router = Router();
const GAMES_FILE = "./data/games.json";

function readGames() {
  return JSON.parse(fs.readFileSync(GAMES_FILE, "utf-8"));
}

function saveGames(games) {
  fs.writeFileSync(GAMES_FILE, JSON.stringify(games, null, 2));
}

router.get("/", (req, res) => {
  const games = readGames();
  res.json(games);
});

router.post("/", (req, res) => {
  const { title, genre, price, img, link } = req.body;

  if (!title || !genre || !price) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const games = readGames();

  const game = {
    id: uuid(),
    title,
    genre,
    price,
    img,
    link
  };

  games.unshift(game);
  saveGames(games);

  res.json(game);
});

export default router;

import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Database
const db = new Database("bookings.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pickup TEXT,
    destination TEXT,
    date TEXT,
    time TEXT,
    carType TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "ABU Travels API is running with Real Database" });
  });

  // REAL DATABASE SAVE
  app.post("/api/bookings", (req, res) => {
    const { pickup, destination, date, time, carType } = req.body;
    
    try {
      const stmt = db.prepare('INSERT INTO bookings (pickup, destination, date, time, carType) VALUES (?, ?, ?, ?, ?)');
      const info = stmt.run(pickup, destination, date, time, carType);
      
      res.status(201).json({ 
        success: true, 
        message: "Booking saved to database!",
        bookingId: `ABU-${info.lastInsertRowid}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Database error" });
    }
  });

  // REAL DATABASE FETCH (Proof of Backend)
  app.get("/api/bookings/all", (req, res) => {
    const rows = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
    res.json(rows);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    
    // Serve index.html for all other routes (SPA support)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

const Database = require("better-sqlite3");
const path = require("path");
const bcrypt = require("bcryptjs");

const dbPath = path.join(__dirname, "../resqai.db");
let db = null;

function getDB() {
  if (!db) {
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
  }
  return db;
}

const connectDB = async () => {
  try {
    const database = getDB();

    // Initialize Tables
    database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        _id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'Citizen',
        team TEXT DEFAULT '',
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS sos (
        _id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        emergency TEXT NOT NULL,
        description TEXT DEFAULT '',
        image TEXT DEFAULT '',
        aiAnalysis TEXT DEFAULT '',
        location TEXT DEFAULT NULL,
        status TEXT DEFAULT 'Pending',
        assignedTo TEXT DEFAULT '',
        createdAt TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_sos_assignedTo ON sos(assignedTo);
      CREATE INDEX IF NOT EXISTS idx_sos_createdAt ON sos(createdAt);
    `);

    // Seed default accounts if empty
    const userCount = database.prepare("SELECT COUNT(*) as count FROM users").get().count;
    if (userCount === 0) {
      console.log("🌱 Seeding default ResQAI accounts into SQLite...");
      const salt = bcrypt.genSaltSync(10);

      const insertUser = database.prepare(`
        INSERT INTO users (_id, name, email, password, role, team, createdAt)
        VALUES (@_id, @name, @email, @password, @role, @team, @createdAt)
      `);

      insertUser.run({
        _id: "usr_admin_01",
        name: "Commander Admin",
        email: "admin@resqai.com",
        password: bcrypt.hashSync("admin123", salt),
        role: "Admin",
        team: "",
        createdAt: new Date().toISOString(),
      });

      insertUser.run({
        _id: "usr_rescue_01",
        name: "Officer John (Alpha)",
        email: "alpha@resqai.com",
        password: bcrypt.hashSync("alpha123", salt),
        role: "Rescue",
        team: "Team Alpha",
        createdAt: new Date().toISOString(),
      });

      insertUser.run({
        _id: "usr_citizen_01",
        name: "Priya Sharma",
        email: "citizen@resqai.com",
        password: bcrypt.hashSync("citizen123", salt),
        role: "Citizen",
        team: "",
        createdAt: new Date().toISOString(),
      });

      console.log("✅ Seeded default accounts: admin@resqai.com (admin123), alpha@resqai.com (alpha123), citizen@resqai.com (citizen123)");
    }

    // Seed sample SOS if empty
    const sosCount = database.prepare("SELECT COUNT(*) as count FROM sos").get().count;
    if (sosCount === 0) {
      const insertSOS = database.prepare(`
        INSERT INTO sos (_id, name, phone, emergency, description, image, aiAnalysis, location, status, assignedTo, createdAt)
        VALUES (@_id, @name, @phone, @emergency, @description, @image, @aiAnalysis, @location, @status, @assignedTo, @createdAt)
      `);

      insertSOS.run({
        _id: "sos_demo_01",
        name: "Ramesh Kumar",
        phone: "+91 9876543210",
        emergency: "Flood",
        description: "Water levels rising near riverbank. Two elderly persons need immediate evacuation assistance.",
        image: "1785171454699.jpg",
        aiAnalysis: "Disaster Type: Flood / Flash Flood\nSeverity: High\nConfidence: 95%\nDetected Objects: Submerged vehicle, floodwaters, riverbank\nRecommended Action: Deploy swift water rescue team immediately.",
        location: JSON.stringify({ latitude: 17.385, longitude: 78.4867 }),
        status: "Pending",
        assignedTo: "Team Alpha",
        createdAt: new Date().toISOString(),
      });
    }

    console.log("✅ SQLite Database Connected Successfully: resqai.db");
  } catch (error) {
    console.error("❌ SQLite Initialization Failed:", error.message);
  }
};

module.exports = connectDB;
module.exports.getDB = getDB;
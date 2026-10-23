const { getDB } = require("../config/database");

function parseLocation(loc) {
  if (!loc) return null;
  if (typeof loc === "object") return loc;
  try {
    return JSON.parse(loc);
  } catch {
    return null;
  }
}

class SOS {
  constructor(data = {}) {
    this._id =
      data._id ||
      data.id ||
      `sos_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.name = data.name || "";
    this.phone = data.phone || "";
    this.emergency = data.emergency || "";
    this.description = data.description || "";
    this.image = data.image || "";
    this.aiAnalysis = data.aiAnalysis || "";
    this.location = parseLocation(data.location);
    this.status = data.status || "Pending";
    this.assignedTo = data.assignedTo || "";
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  async save() {
    const db = getDB();
    const locStr = this.location ? JSON.stringify(this.location) : null;

    const existing = db
      .prepare("SELECT _id FROM sos WHERE _id = ?")
      .get(this._id);

    if (existing) {
      db.prepare(`
        UPDATE sos
        SET name = ?, phone = ?, emergency = ?, description = ?, image = ?,
            aiAnalysis = ?, location = ?, status = ?, assignedTo = ?
        WHERE _id = ?
      `).run(
        this.name,
        this.phone,
        this.emergency,
        this.description,
        this.image,
        this.aiAnalysis,
        locStr,
        this.status,
        this.assignedTo,
        this._id
      );
    } else {
      db.prepare(`
        INSERT INTO sos (
          _id, name, phone, emergency, description, image,
          aiAnalysis, location, status, assignedTo, createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        this._id,
        this.name,
        this.phone,
        this.emergency,
        this.description,
        this.image,
        this.aiAnalysis,
        locStr,
        this.status,
        this.assignedTo,
        this.createdAt
      );
    }

    return this;
  }

  toObject() {
    return {
      _id: this._id,
      id: this._id,
      name: this.name,
      phone: this.phone,
      emergency: this.emergency,
      description: this.description,
      image: this.image,
      aiAnalysis: this.aiAnalysis,
      location: this.location,
      status: this.status,
      assignedTo: this.assignedTo,
      createdAt: this.createdAt,
    };
  }

  static find(query = {}) {
    const db = getDB();
    let sql = "SELECT * FROM sos";
    const params = [];

    if (query.assignedTo) {
      sql += " WHERE assignedTo = ?";
      params.push(query.assignedTo);
    } else if (query.status) {
      sql += " WHERE status = ?";
      params.push(query.status);
    }

    const execute = (order = "DESC") => {
      const finalSql = `${sql} ORDER BY createdAt ${order}`;
      const rows = db.prepare(finalSql).all(...params);
      return rows.map((r) => new SOS(r));
    };

    const result = execute("DESC");

    // Support Mongoose-style .sort({ createdAt: -1 })
    result.sort = function (sortObj = {}) {
      if (sortObj.createdAt === 1 || sortObj.createdAt === "asc") {
        return execute("ASC");
      }
      return execute("DESC");
    };

    return result;
  }

  static async findById(id) {
    const db = getDB();
    const row = db.prepare("SELECT * FROM sos WHERE _id = ?").get(id);
    return row ? new SOS(row) : null;
  }

  static async findByIdAndUpdate(id, updates = {}, options = {}) {
    const db = getDB();
    const current = db.prepare("SELECT * FROM sos WHERE _id = ?").get(id);
    if (!current) return null;

    const merged = { ...current, ...updates };
    let locStr = current.location;
    if (updates.location !== undefined) {
      locStr = updates.location ? JSON.stringify(updates.location) : null;
    }

    db.prepare(`
      UPDATE sos
      SET name = ?, phone = ?, emergency = ?, description = ?, image = ?,
          aiAnalysis = ?, location = ?, status = ?, assignedTo = ?
      WHERE _id = ?
    `).run(
      merged.name,
      merged.phone,
      merged.emergency,
      merged.description,
      merged.image,
      merged.aiAnalysis,
      locStr,
      merged.status,
      merged.assignedTo,
      id
    );

    const updatedRow = db.prepare("SELECT * FROM sos WHERE _id = ?").get(id);
    return new SOS(updatedRow);
  }
}

module.exports = SOS;
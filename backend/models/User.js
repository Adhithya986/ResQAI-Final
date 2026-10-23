const { getDB } = require("../config/database");

class User {
  constructor(data = {}) {
    this._id =
      data._id ||
      data.id ||
      `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.name = data.name || "";
    this.email = data.email || "";
    this.password = data.password || "";
    this.role = data.role || "Citizen";
    this.team = data.team || "";
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  async save() {
    const db = getDB();
    const existing = db
      .prepare("SELECT _id FROM users WHERE _id = ?")
      .get(this._id);

    if (existing) {
      db.prepare(`
        UPDATE users
        SET name = ?, email = ?, password = ?, role = ?, team = ?
        WHERE _id = ?
      `).run(
        this.name,
        this.email,
        this.password,
        this.role,
        this.team,
        this._id
      );
    } else {
      db.prepare(`
        INSERT INTO users (_id, name, email, password, role, team, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        this._id,
        this.name,
        this.email,
        this.password,
        this.role,
        this.team,
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
      email: this.email,
      password: this.password,
      role: this.role,
      team: this.team,
      createdAt: this.createdAt,
    };
  }

  static async findOne(query = {}) {
    const db = getDB();
    let row = null;

    if (query.email) {
      row = db.prepare("SELECT * FROM users WHERE email = ?").get(query.email);
    } else if (query._id || query.id) {
      row = db
        .prepare("SELECT * FROM users WHERE _id = ?")
        .get(query._id || query.id);
    } else {
      const keys = Object.keys(query);
      if (keys.length > 0) {
        const key = keys[0];
        row = db
          .prepare(`SELECT * FROM users WHERE ${key} = ?`)
          .get(query[key]);
      }
    }

    return row ? new User(row) : null;
  }

  static find(query = {}) {
    const db = getDB();
    let sql = "SELECT * FROM users";
    const params = [];

    if (query.role) {
      sql += " WHERE role = ?";
      params.push(query.role);
    }

    const rows = db.prepare(sql).all(...params);
    const users = rows.map((r) => new User(r));

    // Support Mongoose-style .select("name email team")
    users.select = function (fieldsStr) {
      const fields = fieldsStr.split(" ");
      return users.map((u) => {
        const item = { _id: u._id, id: u._id };
        fields.forEach((f) => {
          if (f && u[f] !== undefined) item[f] = u[f];
        });
        return item;
      });
    };

    return users;
  }
}

module.exports = User;
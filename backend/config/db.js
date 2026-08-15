const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'database', 'database.sqlite');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new DatabaseSync(dbPath);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

// Helper methods for easy querying
const dbHelper = {
    raw: db,

    exec(sql) {
        return db.exec(sql);
    },

    queryAll(sql, params = []) {
        const stmt = db.prepare(sql);
        return stmt.all(...params);
    },

    queryOne(sql, params = []) {
        const stmt = db.prepare(sql);
        return stmt.get(...params);
    },

    run(sql, params = []) {
        const stmt = db.prepare(sql);
        return stmt.run(...params);
    },

    init() {
        console.log('📦 Initializing SQLite Database at:', dbPath);
        
        // Execute schema
        const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
        if (fs.existsSync(schemaPath)) {
            const schemaSql = fs.readFileSync(schemaPath, 'utf8');
            db.exec(schemaSql);
            console.log('✅ Schema tables verified/created successfully.');
        }

        // Check if database needs seeding
        const userCheck = dbHelper.queryOne('SELECT COUNT(*) as count FROM users');
        if (!userCheck || userCheck.count === 0) {
            console.log('🌱 Empty database detected. Seeding initial records...');
            const seedDatabase = require('../database/seed');
            seedDatabase(dbHelper);
            console.log('✅ Database seeded with BCA 5th Semester records.');
        } else {
            console.log(`✅ Database ready (${userCheck.count} active users).`);
        }
    }
};

module.exports = dbHelper;

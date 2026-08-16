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

        // Run migrations for any new student profile columns
        this.runMigrations();

        // Check if database needs seeding
        const userCheck = dbHelper.queryOne('SELECT COUNT(*) as count FROM users');
        if (!userCheck || userCheck.count === 0) {
            console.log('🌱 Empty database detected. Seeding initial records...');
            const seedDatabase = require('../database/seed');
            seedDatabase(dbHelper);
            console.log('✅ Database seeded with BCA 5th Semester records.');
        } else {
            console.log(`✅ Database ready (${userCheck.count} active users).`);
            // Ensure documents are seeded if missing
            this.seedDocumentsIfMissing();
        }
    },

    runMigrations() {
        const columnsToAdd = [
            { col: 'enrollment_no', type: 'TEXT DEFAULT "IU-2024-BCA-0089"' },
            { col: 'section', type: 'TEXT DEFAULT "Section A"' },
            { col: 'faculty', type: 'TEXT DEFAULT "Faculty of Computer Applications"' },
            { col: 'academic_session', type: 'TEXT DEFAULT "2024–2027 (Current: 2026–27)"' },
            { col: 'academic_status', type: 'TEXT DEFAULT "Active Student • Regular"' },
            { col: 'permanent_address', type: 'TEXT DEFAULT "Village/Town, Dist. Basti, Uttar Pradesh, India 272002"' },
            { col: 'city', type: 'TEXT DEFAULT "Lucknow"' },
            { col: 'state', type: 'TEXT DEFAULT "Uttar Pradesh"' },
            { col: 'pincode', type: 'TEXT DEFAULT "226026"' },
            { col: 'emergency_name', type: 'TEXT DEFAULT "Mr. Ahsanullah Ansari"' },
            { col: 'emergency_relation', type: 'TEXT DEFAULT "Father / Guardian"' },
            { col: 'emergency_phone', type: 'TEXT DEFAULT "+91 9450000000"' },
            { col: 'blood_group', type: 'TEXT DEFAULT "O+"' },
            { col: 'father_name', type: 'TEXT DEFAULT "Mr. Ahsanullah Ansari"' },
            { col: 'mother_name', type: 'TEXT DEFAULT "Mrs. Jamila Khatoon"' }
        ];

        try {
            const tableInfo = dbHelper.queryAll('PRAGMA table_info(students)');
            const existingCols = new Set(tableInfo.map(c => c.name));

            for (const { col, type } of columnsToAdd) {
                if (!existingCols.has(col)) {
                    db.exec(`ALTER TABLE students ADD COLUMN ${col} ${type};`);
                }
            }
        } catch (e) {
            console.warn('Migration warning:', e.message);
        }

        // Ensure student_documents table exists
        try {
            db.exec(`
                CREATE TABLE IF NOT EXISTS student_documents (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id INTEGER NOT NULL,
                    doc_name TEXT NOT NULL,
                    doc_type TEXT NOT NULL,
                    file_format TEXT NOT NULL DEFAULT 'PDF',
                    issue_date TEXT NOT NULL,
                    status TEXT NOT NULL DEFAULT 'Verified',
                    file_size TEXT NOT NULL DEFAULT '1.2 MB',
                    download_url TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
                );
            `);
        } catch (e) {
            console.warn('Document table creation warning:', e.message);
        }
    },

    seedDocumentsIfMissing() {
        try {
            const docCount = dbHelper.queryOne('SELECT COUNT(*) as count FROM student_documents');
            if (!docCount || docCount.count === 0) {
                const student = dbHelper.queryOne('SELECT id FROM students LIMIT 1');
                if (student) {
                    const sampleDocs = [
                        { name: 'Student Identity Card (BCA Final Year)', type: 'ID Card', format: 'PDF', date: '2024-08-16', status: 'Active & Verified', size: '1.4 MB' },
                        { name: 'Official Admission & Enrollment Dossier', type: 'Enrollment Slip', format: 'PDF', date: '2024-08-10', status: 'Verified', size: '2.1 MB' },
                        { name: 'Semester 4 Official Grade Sheet & Marksheet', type: 'Marksheet', format: 'PDF', date: '2026-06-28', status: 'Official Record', size: '850 KB' },
                        { name: 'Semester 3 Official Grade Sheet & Marksheet', type: 'Marksheet', format: 'PDF', date: '2025-12-20', status: 'Official Record', size: '820 KB' },
                        { name: '5th Semester Tuition & Hostel Fee Receipt', type: 'Fee Receipt', format: 'PDF', date: '2026-08-01', status: 'Paid & Verified', size: '420 KB' },
                        { name: 'Bonafide Student Certificate (Integral University)', type: 'Certificate', format: 'PDF', date: '2026-07-15', status: 'Active Document', size: '650 KB' }
                    ];

                    for (const doc of sampleDocs) {
                        dbHelper.run(
                            `INSERT INTO student_documents (student_id, doc_name, doc_type, file_format, issue_date, status, file_size)
                             VALUES (?, ?, ?, ?, ?, ?, ?)`,
                            [student.id, doc.name, doc.type, doc.format, doc.date, doc.status, doc.size]
                        );
                    }
                }
            }
        } catch (e) {
            console.warn('Doc seeding warning:', e.message);
        }
    }
};

module.exports = dbHelper;

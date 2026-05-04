require('dotenv').config();
const { Pool } = require('pg');

let pool;

if (process.env.DATABASE_URL) {
    // สำหรับใช้บน Cloud (Render / Supabase)
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
} else {
    // สำหรับใช้ในเครื่องตัวเอง (ดึงค่าจากไฟล์ .env ที่คุณส่งรูปมา)
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });
}

module.exports = pool;
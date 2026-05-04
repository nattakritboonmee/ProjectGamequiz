const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); // 1. เพิ่มตัวนี้
const path = require('path');               // 2. เพิ่มตัวนี้ (เพื่อใช้ path.join)
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
require('dotenv').config();

const app = express();

// ตั้งค่า View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware
app.use(express.static(path.join(__dirname, "public"))); // รวมบรรทัด static ไว้ที่เดียว
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// ตั้งค่า Session
app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
     // เพิ่มเพื่อให้ทำงานบน http ปกติได้ลื่นไหล
}));

// ใช้งาน Routes
app.use('/', authRoutes);
app.use('/', gameRoutes);
app.use('/', leaderboardRoutes);

// หมายเหตุ: บรรทัด app.get("/") ที่ส่งไฟล์ index.html ให้ลบออก 
// เพราะเราจะให้ gameController.getHome เป็นคนสั่ง res.render('index') แทน

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
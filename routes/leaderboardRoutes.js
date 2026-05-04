const express = require('express');
const router = express.Router();
// 1. ตรวจสอบว่านำเข้า leaderboardController ถูกต้อง
const leaderboardController = require('../controllers/leaderboardController');
const { isAuth, isAdmin } = require('../middleware/authMiddleware');

// 2. ตรวจสอบว่าเรียกผ่าน leaderboardController (ไม่ใช่ gameController)
router.get('/leaderboard', isAuth, leaderboardController.getLeaderboard);
router.post('/search-rank', isAuth, leaderboardController.postSearchRank);

// ระบบแก้ไขชื่อเล่น
router.get('/edit', isAuth, leaderboardController.getEditPage);
router.post('/edit-nickname', isAuth, leaderboardController.postEditNickname);

// ระบบลบคะแนน (สำหรับ Admin)
router.post('/delete-score/:id', isAuth, isAdmin, leaderboardController.postDeleteScore);

module.exports = router;
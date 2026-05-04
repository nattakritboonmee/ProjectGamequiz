const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { isAuth } = require('../middleware/authMiddleware');

// หน้าแรกเลือกหมวดหมู่
router.get('/', isAuth, gameController.getHome);

// เริ่มเกม (รับชื่อเล่น/หมวดหมู่)
router.post('/start-game', isAuth, gameController.postStartGame);

// ระบบ Quiz (หน้าคำถามและการตรวจคำตอบ)
router.get('/quiz', isAuth, gameController.getQuiz);
router.post('/answer', isAuth, gameController.postAnswer);

// หน้าจบเกม (สรุปผล)
router.get('/finish', isAuth, gameController.getFinish);

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

// --- หน้า Login & Register ---
router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', authController.postLogin);
router.get('/register', (req, res) => res.render('auth/register'));

// --- ระบบ Register พร้อม Validation ---
router.post('/register', [
    body('username').isLength({ min: 3 }).withMessage('ชื่อต้องยาวกว่านี้เบบี๋'),
    body('password').notEmpty().withMessage('รหัสห้ามว่างครับเบบี๋')
        .bail()
        .isLength({ min: 8, max: 20 }).withMessage('รหัสมึงต้องยาว 8 ขึ้นไปครับอีสัส')
], authController.postRegister);

router.get('/logout', authController.Logout);

module.exports = router;
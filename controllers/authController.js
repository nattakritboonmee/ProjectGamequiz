const User = require('../models/userModel');
const { validationResult } = require('express-validator');

// เพิ่มฟังก์ชันนี้เข้าไป
exports.postRegister = async (req, res) => {
    const { username, password } = req.body;
    const errors =validationResult(req);
    
    if(!errors.isEmpty()){
        return res.render('auth/register',{errors:errors.array()});   
    }
    try {
        await User.create(username, password); // เรียกใช้ Model เพื่อบันทึกข้อมูล
        res.redirect('/login'); // สมัครเสร็จแล้วส่งไปหน้า Login
    } catch (err) {
        console.error(err);
        res.send("เกิดข้อผิดพลาด: ชื่อผู้ใช้นี้อาจถูกใช้ไปแล้ว");
    }
};
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByUsernameAndPassword(username, password); //
        if (user) {
            req.session.userId = user.id; // เก็บ ID สำคัญมาก
            req.session.username = user.username;
            req.session.role = user.role; //
            res.redirect('/');
        } else {
            res.render('auth/login',{
                error:'ชื่อหรือรหัสผ่านผิด'
            });
        }
    } catch (err) { res.status(500).send("Error"); }
};

exports.Logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
};
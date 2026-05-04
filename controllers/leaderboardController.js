const Quiz = require('../models/quizModel');
const Leaderboard = require('../models/leaderboardModel');

// 6. แสดง Leaderboard (ใช้ req.query.category)
exports.getLeaderboard = async (req, res) => {
    try {
        const categories = await Quiz.getCategories();
        const categoryId = req.query.category || categories[0].id;
        const players = await Leaderboard.getLeaderboardByCategory(categoryId);

        res.render('leaderboard', {
            players,
            categories,
            selectedCategory: categoryId,
            sessionUserId: req.session.userId,
            role: req.session.role ? req.session.role.trim() : 'user'
        });
    } catch (err) {
        console.error("Leaderboard Error:", err);
        res.status(500).send("Error fetching leaderboard");
    }
};

// 7. หน้าแก้ไขชื่อ (รับ categoryId จาก URL)
// แก้ไขจุดนี้ใน controllers/leaderboardController.js
exports.getEditPage = async (req, res) => {
    // ต้องดึง categoryId ออกมาจาก req.query ด้วย
    const { id, nickname, score, categoryId } = req.query; 
    
    res.render('edit', {
        scoreId: id,
        oldNickname: nickname,
        score: score,
        categoryId: categoryId // ส่งตัวแปรนี้ไปให้ edit.ejs
    });
};

// 8. บันทึกชื่อเล่นใหม่
exports.postEditNickname = async (req, res) => {
    const { scoreId, newNickname, categoryId } = req.body; 
    const userId = req.session.userId;

    try {
        await Leaderboard.updateNickname(scoreId, userId, newNickname);
        // ดีดกลับไปโดยใช้ชื่อ query ว่า 'category' ให้ตรงกับ getLeaderboard
        res.redirect('/leaderboard');
    } catch (err) {
        console.error(err);
        res.status(500).send("ไม่สามารถแก้ไขชื่อได้");
    }
};

// 9. ลบคะแนน (สำหรับ Admin)
// ใน controllers/leaderboardController.js
exports.postDeleteScore = async (req, res) => {
    const scoreId = req.params.id;
    // รับค่าจาก query string (?category=...)
    const category = req.query.category; 

    try {
        await Leaderboard.deleteScoreById(scoreId);
        
        if (category) {
            // ส่งกลับไปยังหมวดเดิม
            res.redirect(`/leaderboard?category=${category}`);
        } else {
            res.redirect('/leaderboard');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
};

// 10. ค้นหาอันดับจาก nickname
exports.postSearchRank = async (req, res) => {
    try {
        const { nickname } = req.body;
        const player = await Leaderboard.getPlayerRank(nickname);
        const players = await Leaderboard.getLeaderboard();

        res.render('leaderboard', {
            players: players,
            categories: await Quiz.getCategories(), // เพิ่ม categories เพื่อไม่ให้หน้าพัง
            selectedCategory: null,
            sessionUserId: req.session.userId,
            role: req.session.role ? req.session.role.trim() : 'user',
            searchResult: player || null
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error searching player");
    }
};
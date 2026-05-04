// เปลี่ยนการ import model ใหม่
const Quiz = require('../models/quizModel');
const Leaderboard = require('../models/leaderboardModel');

// 6. แสดง Leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        // ดึงหมวดหมู่จาก Quiz Model
        const categories = await Quiz.getCategories();
        const categoryId = req.query.category || categories[0].id;

        // ดึงอันดับจาก Leaderboard Model
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

// 7. หน้าแก้ไขชื่อ
exports.getEditPage = async (req, res) => {
    const { id, nickname, score } = req.query;
    res.render('edit', {
        scoreId: id,
        oldNickname: nickname,
        score: score
    });
};

// 8. บันทึกชื่อเล่นใหม่
exports.postEditNickname = async (req, res) => {
    const { scoreId, newNickname } = req.body;
    const userId = req.session.userId;

    try {
        // เปลี่ยนเป็น Leaderboard Model
        await Leaderboard.updateNickname(scoreId, userId, newNickname);
        res.redirect('/leaderboard');
    } catch (err) {
        console.error(err);
        res.status(500).send("ไม่สามารถแก้ไขชื่อได้");
    }
};

// 9. ลบคะแนน (สำหรับ Admin)
exports.postDeleteScore = async (req, res) => {
    const scoreId = req.params.id;
    try {
        // เปลี่ยนเป็น Leaderboard Model
        await Leaderboard.deleteScoreById(scoreId);
        res.redirect('/leaderboard');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting score");
    }
};

// 10. ค้นหาอันดับจาก nickname
exports.postSearchRank = async (req, res) => {
    try {
        const { nickname } = req.body;
        // เปลี่ยนเป็น Leaderboard Model ทั้งหมด
        const player = await Leaderboard.getPlayerRank(nickname);
        const players = await Leaderboard.getLeaderboard();

        res.render('leaderboard', {
            players: players,
            sessionUserId: req.session.userId,
            role: req.session.role ? req.session.role.trim() : 'user',
            searchResult: player || null
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error searching player");
    }
};
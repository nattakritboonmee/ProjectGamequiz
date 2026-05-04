const pool = require('../config/db');

const Leaderboard = {
    // บันทึกคะแนนหลังเล่นจบ
    saveScore: async (userId, nickname, score, categoryId) => {
        const query = 'INSERT INTO leaderboard (user_id, nickname, score, category_id) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [userId, nickname, score, categoryId]);
    },

    // ดึงอันดับ Top 10 ตามหมวดหมู่
    getLeaderboardByCategory: async (categoryId) => {
        const query = `
            SELECT * FROM leaderboard 
            WHERE category_id = $1 
            ORDER BY score DESC 
            LIMIT 10
        `;
        const { rows } = await pool.query(query, [categoryId]);
        return rows;
    },

    // ดึงอันดับ Top 10 ทั้งหมด (แบบไม่แยกหมวดหมู่)
    getLeaderboard: async () => {
        const query = `
            SELECT id, user_id, nickname, score 
            FROM leaderboard 
            ORDER BY score DESC 
            LIMIT 10
        `;
        const res = await pool.query(query);
        return res.rows;
    },

    // ค้นหาอันดับจากชื่อเล่น
    getPlayerRank: async (nickname) => {
        const query = `
            SELECT nickname, score, rank FROM (
                SELECT nickname, score,
                       RANK() OVER (ORDER BY score DESC) AS rank
                FROM leaderboard
            ) ranked
            WHERE LOWER(nickname) = LOWER($1)
            LIMIT 1
        `;
        const res = await pool.query(query, [nickname]);
        return res.rows[0];
    },

    // แก้ไขชื่อเล่น (เช็คสิทธิ์เจ้าของ)
    updateNickname: async (scoreId, userId, newNickname) => {
        const query = `
            UPDATE leaderboard 
            SET nickname = $1 
            WHERE id = $2 AND user_id = $3
            RETURNING *
        `;
        const res = await pool.query(query, [newNickname, scoreId, userId]);
        return res.rows[0];
    },

    // ลบคะแนน (สำหรับ Admin)
    deleteScoreById: async (id) => {
        const query = `
            DELETE FROM leaderboard 
            WHERE id = $1 
            RETURNING *
        `;
        const res = await pool.query(query, [id]);
        return res.rows[0];
    }
};

module.exports = Leaderboard;
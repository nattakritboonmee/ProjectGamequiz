const pool = require('../config/db');

const Quiz = {
    // 1. ดึงหมวดหมู่ทั้งหมด (สำหรับหน้าแรก)
    getCategories: async () => {
        const query = 'SELECT * FROM categories ORDER BY id ASC';
        const res = await pool.query(query);
        return res.rows;
    },

    // 2. ดึงคำถามเฉพาะหมวดหมู่ที่เลือก
    getQuestionsByCategory: async (categoryId) => {
        const query = `
            SELECT * FROM questions 
            WHERE category_id = $1 
            ORDER BY id ASC
        `;
        const res = await pool.query(query, [categoryId]);
        return res.rows;
    }
};

module.exports = Quiz;
const pool = require("../config/db");

const User = {
    // สมัครสมาชิกใหม่
    create: async (username, password) => {
        const query = `INSERT INTO users (username, password) VALUES ($1, crypt($2, gen_salt('bf'))) RETURNING id, username`;
        const res = await pool.query(query, [username, password]);
        return res.rows[0];
    },
    // เช็ค Login
    findByUsernameAndPassword: async (username, password) => {
        const query = `SELECT id, username,role FROM users WHERE username = $1 AND password = crypt($2, password)`;
        const res = await pool.query(query, [username, password]);
        return res.rows[0];
    },
   
};
module.exports = User;
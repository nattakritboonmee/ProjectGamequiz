const Quiz = require('../models/quizModel');
const Leaderboard = require('../models/leaderboardModel');

// 1. หน้าแรก: ดึงหมวดหมู่ทั้งหมดจาก DB มาให้เลือก
exports.getHome = async (req, res) => {
    try {
        // เปลี่ยนเป็น Quiz.getCategories
        const categories = await Quiz.getCategories();
        res.render('index', {
            username: req.session.username,
            categories: categories
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching categories");
    }
};

// 2. รับชื่อเล่นและ "หมวดหมู่" ที่เลือกจากหน้าแรก
exports.postStartGame = (req, res) => {
    req.session.nickname = req.body.nickname;
    req.session.categoryId = req.body.categoryId;
    req.session.answerLog = []; 
    res.redirect('/quiz');
};

// 3. หน้าเล่นเกม
exports.getQuiz = async (req, res) => {
    try {
        const nickname = req.session.nickname;
        const categoryId = req.session.categoryId;
        let { step = 1, currentScore = 0 } = req.query;
        step = parseInt(step);
        currentScore = parseInt(currentScore);

        // เปลี่ยนเป็น Quiz.getQuestionsByCategory
        const questions = await Quiz.getQuestionsByCategory(categoryId);
        const currentQuestion = questions[step - 1];

        // ถ้าจบข้อสุดท้ายแล้ว ให้ไปหน้า Summary
        if (step > questions.length) {
            return res.redirect('/finish?score=' + currentScore);
        }

        res.render('quiz', {
            nickname,
            question: currentQuestion,
            step,
            currentScore,
            showResult: false,
            totalQuestions: questions.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading quiz questions");
    }
};

// 4. ตรวจคำตอบ
exports.postAnswer = async (req, res) => {
    try {
        // selectedAnswer คราวนี้จะเป็นข้อความ เช่น "แมว" แทนที่จะเป็น "A"
        const { step, currentScore, selectedAnswer } = req.body;
        const categoryId = req.session.categoryId;
        const nickname = req.session.nickname;

        const questions = await Quiz.getQuestionsByCategory(categoryId);
        const currentQuestion = questions[step - 1];

        let newScore = parseInt(currentScore);

        // --- จุดที่เปลี่ยน: เทียบข้อความตรงๆ ได้เลย ---
        const correctAnswer = currentQuestion.correct_answer; // ดึงข้อความเฉลยจาก DB
        const isCorrect = selectedAnswer === correctAnswer; 

        if (isCorrect) {
            newScore += 10;
        }

        // บันทึกลง Session (สั้นลงเพราะไม่ต้องหาตัวอักษร A-D)
        if (!req.session.answerLog) req.session.answerLog = [];
        req.session.answerLog.push({
            questionText: currentQuestion.question_text,
            selectedAnswer: selectedAnswer, // บันทึกข้อความที่เลือก
            correctAnswer: correctAnswer,   // บันทึกข้อความที่ถูก
            isCorrect: isCorrect
        });

        res.render('quiz', {
            nickname,
            question: currentQuestion,
            step: parseInt(step), 
            currentScore: newScore,
            showResult: true,
            selectedAnswer,
            correctAnswer,
            isCorrect,
            totalQuestions: questions.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error processing answer");
    }
};
// 5. บันทึกคะแนนและไปหน้า Summary
exports.getFinish = async (req, res) => {
    try {
        const score = req.query.score || 0;
        const userId = req.session.userId;
        const nickname = req.session.nickname;
        const categoryId = req.session.categoryId;

        if (userId && nickname) {
            // เปลี่ยนเป็น Leaderboard.saveScore
            await Leaderboard.saveScore(userId, nickname, score, categoryId);
        }

        const answerLog = req.session.answerLog || [];
        const correctCount = answerLog.filter(a => a.isCorrect).length;
        const wrongCount = answerLog.length - correctCount;

        res.render('summary', {
            nickname,
            totalScore: score,
            correctCount,
            wrongCount,
            answers: answerLog
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving score");
    }
};
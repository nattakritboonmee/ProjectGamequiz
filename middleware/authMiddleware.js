//เช็คว่าเป็นRole อะไร
const isAdmin = (req,res,next) => {
    if(req.session.role && req.session.role ==='Admin'){
        next()
    }else{
        res.status(403).send('Admins only');
    }
}

//เช็คการlogin
const isAuth = (req, res, next) => {
    if (req.session.userId) {//ถ้ามีuserเเล้ว
        return next(); //ไปทำด่านถัดไปได้
    }
    res.redirect('/login'); // ถ้ายังไม่ Login ให้ไปหน้า Login
};

module.exports = {isAdmin,isAuth};
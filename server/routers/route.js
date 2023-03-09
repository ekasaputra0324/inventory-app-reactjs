const  express = require('express');
const router = express.Router();
const {pool} = require('../db');
const bycrpt = require('bcrypt');
require('dotenv').config();

// route login
router.post('/login' , async (req, res ) => {
    
    console.log(req.body.name, req.body.password);
    /* 
    melakukan pengecekan data berdasarkan 
    username yang telah di inputkan oleh users 
    */
    const potentiallogin = await pool.query(
        "SELECT id,name, password FROM users u WHERE u.name=$1",
        [req.body.name]
    ); 
    console.log(potentiallogin.rows[0]);
    /*
    melakukan pengecekan data tersedia 
    atau tidak mengunaka rowCount untuk menghitung row 
    */
    if (potentiallogin.rowCount > 0) {
        // melakukan compare password mengunakan bycrpt
        const isSamePass = await bycrpt.compare(
            req.body.password,
            potentiallogin.rows[0].password
        );
        // pengecekan password 
        if (isSamePass) {
            // jika benar set seesion dengan data nama user dan id user
          const sessionUser =  req.session.user = {
                name: req.body.name,
                id: potentiallogin.rows[0].id  
            }
            res.status(200).json({
                LoggedIn: true,
                token: process.env.COOKIE_SECRET
            });
            console.log(sessionUser);
        } else {
            console.log("login failed");
            res.status(500).json({
                LoggedIn: false,
                message: "Wrong username or password"
            });
        }
    } else {
        console.log("login failed");
        res.status(400).json({
            LoggedIn: false,
            message: "Wrong username or password"
        });
    }
    
}); 



module.exports = router;
const express = require("express");
const router = express.Router();
const { pool } = require("../db");
const bycrpt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer");
const randomstring = require('randomstring');


// route login
router.post("/login", async (req, res) => {
  console.log(req.body.email, req.body.password);
  /* 
    melakukan pengecekan data berdasarkan 
    username yang telah di inputkan oleh users 
    */
  const potentiallogin = await pool.query(
    "SELECT id,name, email, password FROM users u WHERE u.email=$1",
    [req.body.email]
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
      req.session.user = {
        name: req.body.name,
        id: potentiallogin.rows[0].id,
      };
      res.status(200).json({
        LoggedIn: true,
        name: req.body.name,
        token: process.env.COOKIE_SECRET,
      });
    } else {
      console.log("login failed");
      res.status(500).json({
        LoggedIn: false,
        message: "Wrong username or password",
      });
    }
  } else {
    console.log("login failed");
    res.status(400).json({
      LoggedIn: false,
      message: "Wrong username or password",
    });
  }
});

// router forgot password
router.post("/reset_password", async (req, res) => {
  let email = req.body.email;
  // pengecekan data berdasarkan  email
  const userData = await pool.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (userData.rowCount > 0) {
    //create token mengunakan users id
    
    const token = randomstring.generate(); 
    console.log(token);
    // set email pengirim
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: " tlpatiglobalnetwork@gmail.com",
        pass: "usvyzudacloahgvx",
      },
    });
    // set pesan dan akan di kirimkan kepada users
    let detail = {
      from: "tlpatiglobalnetwork@gmail.com",
      to: userData.rows[0].email,
      subject: "forgot password",
      text: "link reset password : http://localhost:5000/change_password/".concat(token),
    };
    
    // mengirimkan email dengan function senMail yang telah di sediakan oleh nodemailer
    mailTransporter.sendMail(detail, async (err) => {
      if (err) {
        res.status(500).json({
          status: false,
          message: err,
        });
      } else {
        const insertResPass = await pool.query(
          `INSERT INTO reset_passwords (token_user, email) 
                                                VALUES ($1, $2)`,
          [token, userData.rows[0].email]
        );
        res.status(200).json({
            status: true,
            message: detail,
          });
      }
    });
  }else{
    res.status(400).json({
        status: false,
        message: 'bad request',
    });
  }
});

router.get('/change_password/:token',  async(req, res) =>{
    const token = req.params.token;
    const searchToken = await pool.query(`SELECT * FROM reset_passwords WHERE token_user = '${token}'`);
    if (searchToken.rowCount > 0) {
        res.render('change-password');
    }else{
        res.render('expried');
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { pool } = require("../db");
const bycrpt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

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
        name: potentiallogin.rows[0].name,
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
  let date = new Date().toUTCString();
  // pengecekan data berdasarkan  email
  const userData = await pool.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (userData.rowCount > 0) {

    //generte token mengunakan users id
    const token = randomstring.generate();
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
      subject: "reset password",
      text: `Hi ${userData.rows[0].name}, There was a request to change your password! 
            If you did not make this request then please ignore this email. Otherwise,
            please click this link to change your password: http://localhost:3000/reset_password/${token}`,
    };

    // mengirimkan email dengan function senMail yang telah di sediakan oleh nodemailer
    mailTransporter.sendMail(detail, async (err) => {
      // eror hendle
      if (err) {
        res.status(500).json({
          status: false,
          message: err,
        });
      } else {
        // insert data di reset password
        await pool.query(
          `INSERT INTO reset_passwords (token_user, email, date) 
           VALUES ('${token}', '${userData.rows[0].email}', '${date}')`
        );
        res.status(200).json({
          status: true,
          message: detail, 
        });
      }
    });
    
  } else {
    res.status(400).json({
      status: false,
      message: "bad request",
    });
  }
});


router.post("/change_password", async (req, res) => {

  // variabel penampung data yang di kirimkan dari client side
  const token = req.body.token;
  const password = req.body.password;
  // hashing password
  const passwordHash = bycrpt.hashSync(password,10)
  
  // pencarian data mengunkan berdasarkan token user
  const searchData = await pool.query(
    `SELECT * FROM reset_passwords WHERE token_user = '${token}'`
    );
 
  //validasi jika data token tidak di temukan 
  if (searchData.rowCount < 1) {
     res.status(500).json({
      status: false,
      message: 'Your token has been used!'
    });

  }else if(searchData.rowCount > 0){
   await pool.query(
        `UPDATE users SET password = '${passwordHash}' WHERE email = '${searchData.rows[0].email}'`
        );
   await pool.query(
            `DELETE FROM reset_passwords WHERE token_user = '${token}'`
      );
      res.status(500).json({
        status: true,
        message: 'Change password successfully'
      });
  }
    

})

module.exports = router;

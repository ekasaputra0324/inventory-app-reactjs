
// Import dependencies
const session = require('express-session');
const {pool} = require('../db');
const bycrpt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

// Definisikan fungsi login async
const login = async (email , password) => {
  console.log(email, password); // Print email dan password di konsol

  // Lakukan query untuk mencari user berdasarkan email yang diberikan
  const potentiallogin = await pool.query(
      "SELECT id,name, email, password FROM users u WHERE u.email=$1",
      [email]
    );
  console.log(potentiallogin.rows[0]); // Print hasil query di konsol

  // Lakukan pengecekan apakah query menghasilkan hasil yang diperlukan atau tidak
  if (potentiallogin.rowCount > 0) {

      // Lakukan compare password dengan menggunakan bcrypt
      const isSamePass = await bycrpt.compare(
        password,
        potentiallogin.rows[0].password
      );

      // Lakukan pengecekan apakah password benar atau salah
      if (isSamePass) {

        // Jika benar, set session dengan data user berupa email dan id user
        session.user = {
          email: email,
          id: potentiallogin.rows[0].id,
          name: potentiallogin.rows[0].name,
        }
        // Buat objek data untuk dikembalikan
        let data = {
          name: potentiallogin.rows[0].name,
          status: true
        }

        return data;

      } else {
        // Jika salah, buat objek data untuk dikembalikan
        let data = {
          status: false
        }
        return data;
      }
  } else {
      // Jika tidak ditemukan user dengan email yang diberikan, buat objek data untuk dikembalikan
      let data = {
        status: false
      }
      return data;
  }
}


// Definisikan fungsi resetPassword async
const resetPassword = async (email) => {

   // Buat variabel untuk menyimpan waktu saat ini
  let date = new Date().toUTCString();

   // Lakukan query untuk mencari user berdasarkan email yang diberikan
  const userData = await pool.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (userData.rowCount > 0) {

      // Generate token acak dengan menggunakan library randomstring
    const token = randomstring.generate();

    // Konfigurasi pengirim email menggunakan nodemailer dan email yang digunakan
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: " tlpatiglobalnetwork@gmail.com",
        pass: "usvyzudacloahgvx",
      },
    });

    // Membuat objek pesan email yang akan dikirimkan
    let detail = {
      from: "tlpatiglobalnetwork@gmail.com",
      to: userData.rows[0].email,
      subject: "reset password",
      text: `Hi ${userData.rows[0].name}, There was a request to change your password! 
            If you did not make this request then please ignore this email. Otherwise,
            please click this link to change your password: http://localhost:3000/reset_password/${token}`,
    };

    // Mengirimkan email dengan menggunakan fungsi sendMail yang disediakan oleh nodemailer
    mailTransporter.sendMail(detail, async (err) => {
      // Menghandle jika terdapat error saat mengirimkan email
      if (err) {
      return false
      } else {
        // Insert token reset password dan email pengguna ke dalam tabel reset_passwords
        await pool.query(
          `INSERT INTO reset_passwords (token_user, email, date) 
          VALUES ('${token}', '${userData.rows[0].email}', '${date}')`
          );
        }
      });
       // Jika pesan berhasil terkirim, buat objek data untuk dikembalikan
      return data = {
        status: true,
        detail: detail
      } 
  }else{
    // Jika pesan gagal terkirim, buat objek data untuk dikembalikan
    return data = {
      status: false,
      detail: 'request failed'
    } 
  }
}

const changePassword = async (token , password) => {
   // hashing password
   const passwordHash = bycrpt.hashSync(password, 10)

   // pencarian data mengunkan berdasarkan token user
   const searchData = await pool.query(
     `SELECT * FROM reset_passwords WHERE token_user = '${token}'`
   );
 
   //validasi jika data token tidak di temukan 
   if (searchData.rowCount < 1) {

    return data = {
      status: false,
      message: 'Your token has been used!'
    }

 
   }else if (searchData.rowCount > 0) {
     await pool.query(
       `UPDATE users SET password = '${passwordHash}' WHERE email = '${searchData.rows[0].email}'`
     );
     await pool.query(
       `DELETE FROM reset_passwords WHERE token_user = '${token}'`
     );
     return data = {
      status: true,
      message: 'Your token has been used!'
    }
   
   }
}

module.exports = {login, resetPassword, changePassword}
const express = require("express");
const router = express.Router();
require("dotenv").config();
const authenticate = require('../controller/authenticate')
const multer = require('multer');
const path = require("path");
const products = require('../controller/products')

router.post("/login", async (req, res) => {

  const auth = await authenticate.login(req.body.email, req.body.password);

  if (auth.status === false) {
    // Jika status autentikasi adalah false maka kirimkan respon 500 dan pesan "LoggedIn" = false
    res.status(500).json({
      LoggedIn: false
    });
  } else if (auth.status === true) {
    // Jika status autentikasi adalah true maka kirimkan respon 200 dan data "LoggedIn" = true, "name" = auth.name, dan "token" = nilai COOKIE_SECRET
    res.status(200).json({
      LoggedIn: true,
      name: auth.name,
      token: process.env.COOKIE_SECRET,
    });
  }
});

router.post("/reset_password", async (req, res) => {

  // memanggil fungsi resetPassword pada objek authenticate
  const sendEmail = await authenticate.resetPassword(req.body.email);

  // jika pengiriman email berhasil
  if (sendEmail.status == true) {
    res.status(200).json({
      status: sendEmail.status,
      message: sendEmail.detail,
    });
    // jika pengiriman email gagal
  } else if (sendEmail.status === false) {
    res.status(500).json({
      status: sendEmail.status,
      message: sendEmail.detail,
    });
  }
});

router.post("/change_password", async (req, res) => {

  // variabel penampung data yang di kirimkan dari client side
  const token = req.body.token;
  const password = req.body.password;
 
  // memanggil fungsi changePassword dari module authenticate
  const changePassword = await authenticate.changePassword(token, password);

  // jika pengiriman email berhasil
  if (changePassword.status == true) {
     res.status(200).json({
       status: true,
       message: 'Change password successfully'
     });
    // jika pengiriman email gagal
  } else if (changePassword.status === false) {
   res.status(500).json({
       status: false,
       message: 'Your token has been used!'
   });
  }
})
// add products
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/products')
    },
    filename: function (req, file, cb) {
      cb(null,
          path.parse(file.originalname).name + 
          "-" +
          Date.now() +
          path.extname(file.originalname)
     )
  }
});

const upload = multer({storage})

router.post('/product/add', upload.single('photo'), async(req , res ) => {
  const {name , price, quantity, description} = req.body
  let linkImage = req.protocol + '://' + req.get('host') + "/products/"+ req.file.filename

  const insertProduct = await products.insertProduct(name, price, quantity,linkImage, description)
  if (insertProduct.status === true) {

    res.status(200).json({
      status: true,
      message: 'Data successfully insert'
    })

  }else{

    res.status(500).json({
      status: false,
      message: 'Data failed insert'
    })

  }
});

router.get('/getDetail/:id', async (req, res) => {
  let id = req.params.id;
  const detail = await products.getDetail(id)
  res.status(200).json({
    status: true,
    data: detail
  })
});


router.get('/product/data',async (req, res) => {
  const data = await products.getProducts();
  res.status(200).json({
    data: data
  })
});

module.exports = router;

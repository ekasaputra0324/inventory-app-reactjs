const express = require("express");
const router = express.Router();
require("dotenv").config();
const authenticate = require('../controller/authenticate')
const multer = require('multer');
const path = require("path");
const products = require('../controller/products');
const transaction = require('../controller/transaction')
const moment = require('moment-timezone')
const reports = require('../controller/reports')

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
  const {name , price, quantity, description, categori} = req.body
  let linkImage = req.protocol + '://' + req.get('host') + "/products/"+ req.file.filename

  const insertProduct = await products.insertProduct(name, price, quantity,linkImage, description, categori)
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


router.delete('/product/delete/:id' , async (req, res) => {
  console.log(req.params.id);
  const deleted = await products.deletdProduct(req.params.id)
  console.log(deleted);
  if (deleted.status === true) {
      res.send({status: true});
  }else{
    res.status(500).json({
      status: false,
      message: 'Product deleted failed'
    });
  }
});
// hide data 
router.get('/products/hide/:id', async (req, res) => {
  const id = req.params.id
  const hideProduct = await products.filterDataByid(id);
  res.send(hideProduct)
});

router.post('/products/update',upload.single('photo'),async (req, res) => {
  const { name , price ,quantity, description, id, categori} = req.body; 
  const Image = '';
  const data = {
    name ,
    price,
    quantity,
    description,
    id,
    Image,
    categori
  }
  console.log(data);
  if (typeof req.file === 'undefined') {
      const detail = await products.getDetail(id);
      data.Image = detail.imge;
    }else{
      data.Image = req.protocol + '://' + req.get('host') + "/products/"+ req.file.filename 
    }  
    const updateAPI = await products.updateProduct(data)
    if (updateAPI.status === true) {
       response = {
        status: true
      }
      res.send(response)
    }else{
      response = {
        status: false,
        message: 'Update Failed'
      }
      res.send(response)
    }
})

router.get('/product/data',upload.single('photo'),async (req, res) => {
  const data = await products.getProducts();
  res.status(200).json({
    data: data
  })
});

router.get('/products/category/:categori', async (req, res) => {
  let categori = req.params.categori
  let data ;
  if (categori === 'all') {
    data = await products.getProducts();
    res.send(data);
  }else{
    data = await products.filterData(categori);
    res.send(data);
  }
  console.log(data);
})



// get transactions
router.get('/transactions' , async(req, res) =>{
  const data = await transaction.getData();
  res.send(data)
});

// add transaction 
router.post('/transaction/add', async(req, res) =>{
    const {selectOption, custumer, quantity} = req.body;
    const data = {
        product_id: selectOption,
        custumer: custumer,
        quantity: quantity
    }
  const insertTransaction = await transaction.insertData(data);
  if (insertTransaction.status === true) {
      res.status(200).json({
        status: insertTransaction.status,
        message: insertTransaction.message
      })
  } else {
    res.status(500).json({
      status: insertTransaction.status,
      message: insertTransaction.message
    })
  }
});

// get detail
router.get('/transactions/:id', async (req, res) => {
  const id = req.params.id;
  const detailData = await transaction.getDetail(id);
  const productDetail = await products.getDetailName(detailData.product) 
  const data = {
    detailTran: detailData,
    detailProduct: productDetail  
  }
  res.send(data);
});

router.post('/transaction/update', async (req, res) => {
  const {product_id, quantity , custumer, transaction_id } = req.body;
  const data = {
    product_id: product_id,
    quantity: quantity,
    custumer: custumer,
    transaction_id: transaction_id 
  }  
 const update = await transaction.update(data);
 res.send(update);
});




// filtering kategori 
router.get('/transaction/:categori' , async (req, res) => {
  const categori  = req.params.categori
  if (categori === 'all') {
      const categoriFilter = await transaction.getData()
      res.send(categoriFilter)  
  }else{
    const categoriFilter = await transaction.filterCategori(categori);
    res.send(categoriFilter)
  }
});

// delete transaction 
router.delete('/delete/transaction/:id', async(req, res) =>{

    const deleted = await transaction.deleted(req.params.id);
    console.log(deleted.status);
    if (deleted.status === true) {
      res.status(200).json({
        status: true,
        message: 'delete successfully'
      })
    }else{
      res.status(500).json({
        status: false,
        message: 'delete failed'
      })
    }
});


// reports 
router.get('/reports', async (req, res) => {
  const data = await reports.all();
  res.send(data);
});

router.delete('/reports/delete/:id', async (req, res) => {
    const result =  await reports.deleted(req.params.id);
    console.log(result);
});

module.exports = router;

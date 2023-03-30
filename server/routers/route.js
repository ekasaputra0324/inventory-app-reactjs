const express = require("express");
const router = express.Router();
const app= express();
require("dotenv").config();
const authenticate = require("../controller/authenticate");
const multer = require("multer");
const path = require("path");
const products = require("../controller/products");
const transaction = require("../controller/transaction");
const reports = require("../controller/reports");
const log = require("../helper/log");
const applog = require("../controller/applog");
const session = require("express-session");

app.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: true
}));

router.post("/login", async (req, res) => {
  const auth = await authenticate.login(req.body.email, req.body.password);

  if (auth.status === false) {
    /*Jika status autentikasi adalah false maka 
    kirimkan respon 500 dan pesan "LoggedIn" = false
    */

    let Datalog = {
      url: req.protocol + "://" + req.get("host") + req.url,
      method: req.method,
      user: "Anonymous",
      status_code: 500,
    };
    await log.saveLog(Datalog);
    res.status(500).json({
      LoggedIn: false,
    });
  } else if (auth.status === true) {
    /*
    Jika status autentikasi adalah true maka kirimkan respon 200 dan data
    "LoggedIn" = true, "name" = auth.name, dan "token" = nilai COOKIE_SECRET
    */
   
   let Datalog = {
     url: req.protocol + "://" + req.get("host") + req.url,
     method: req.method,
     user: auth.name,
     status_code: res.statusCode,
    };
    
    await log.saveLog(Datalog);
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
      message: "Change password successfully",
    });
    // jika pengiriman email gagal
  } else if (changePassword.status === false) {
    res.status(500).json({
      status: false,
      message: "Your token has been used!",
    });
  }
});

/* section product */

// add products
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/products");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post("/product/add", upload.single("photo"), async (req, res) => {
  const {
    name,
    sellingprice,
    quantity,
    description,
    categori,
    cost,
    from,
    done_by,
  } = req.body;
  let linkImage =
    req.protocol + "://" + req.get("host") + "/products/" + req.file.filename;
  const insertProduct = await products.insertProduct(
    name,
    sellingprice,
    cost,
    from,
    quantity,
    linkImage,
    description,
    categori,
    done_by
  );
  if (insertProduct.status === true) {
    let Datalog = {
      url: req.protocol + "://" + req.get("host") + req.url,
      method: req.method,
      user: done_by,
      status_code: res.statusCode,
    };
    await log.saveLog(Datalog);
    res.status(200).json({
      status: true,
      message: "Data successfully insert",
    });
  } else {
    res.status(500).json({
      status: false,
      message: "Data failed insert",
    });
  }
});

// get detail product
router.get("/products/getDetail/:id", async (req, res) => {
  let id = req.params.id;
  const detail = await products.getDetail(id);
  console.log(detail);
  res.status(200).json({
    status: true,
    data: detail,
  });
});

// get multiple detail
router.get("/products/multiple/detail/:id", async (req, res) => {
  const detail = await products.multipleDetail(req.params.id);
  res.send(detail);
});
 
// filteting byName
router.get("/products/filtetingByName/:name", async (req, res) => {
  const detail = await products.filterByName(req.params.name);
  res.send(detail);
});

// product delete
router.delete("/product/delete/:id/:user", async (req, res) => {
  const done_by = req.params.user
  var array = JSON.parse("[" + req.params.id + "]");
  let details = await products.multipleDetail(array);
  details.forEach(async (datas , index) => {
    console.log(datas);
    if (details.length <= 1) {
      let Datalog = {
        url: req.protocol + "://" + req.get("host") + `/product/deleted/P-${datas[index].item_code}`,
        method: req.method, 
        user: done_by,
        status_code: res.statusCode,
      };
      await log.saveLog(Datalog)
      const deleted  = await products.deletdProduct(req.params.id);
      if (deleted.status === true) {
         res.send({status: true})
      }
    }else{
      datas.forEach( async(data2, index2) => {
      let Datalog = {
        url: req.protocol + "://" + req.get("host") + `/product/deleted/P-${data2.item_code}`,
        method: req.method, 
        user: done_by,
        status_code: res.statusCode,
      };
      await log.saveLog(Datalog)
      const deleted  = await products.deletdProduct(req.params.id);
      if (deleted.status === true) {
         res.send({status: true})
      }
    })
    }
  })
});
// hide data
router.get("/products/hide/:id", async (req, res) => {
  const id = req.params.id;
  const hideProduct = await products.filterDataByid(id);
  res.send(hideProduct);
});

router.post("/products/update", upload.single("photo"), async (req, res) => {
  let { name, sellingprice, quantity, description, id, categori, done_by,cost } =
    req.body;
  const Image = "";
  const detail = await products.getDetail(id);
  if (cost == detail.units_cost) {
      cost = detail.units_cost
  }
  const costFinal =  cost * quantity
  console.log(costFinal);
  const code = detail.item_code;
  const lastestQuantity = detail.quantity;
  const data = {
    name,
    sellingprice,
    quantity,
    description,
    id,
    Image,
    categori,
    lastestQuantity,
    done_by,
    code,
    costFinal,
    cost
  };
  if (typeof req.file === "undefined") {
    const detail = await products.getDetail(id);
    data.Image = detail.imge;
  } else {
    data.Image =
      req.protocol + "://" + req.get("host") + "/products/" + req.file.filename;
  }
  const updateAPI = await products.updateProduct(data);
  if (updateAPI.status === true) {
    let Datalog = {
      url: req.protocol + "://" + req.get("host") + `/product/update/P-${detail.item_code}`,
      method: req.method,
      user: done_by,
      status_code: 200,
     };
     
     await log.saveLog(Datalog);
    response = {
      status: true,
    };
    res.send(response);
  } else {
    response = {
      status: false,
      message: "Update Failed",
    };
    res.send(response);
  }
});

router.get("/product", upload.single("photo"), async (req, res) => {  
  const data = await products.getProducts();
  res.status(200).json({
    data: data,
  });
});
// filteringByCategory
router.get("/products/category/:categori", async (req, res) => {
  let categori = req.params.categori;
  let data;
  if (categori === "all") {
    data = await products.getProducts();
    res.send(data);
  } else {
    data = await products.filterData(categori);
    res.send(data);
  }
  console.log(data);
});

// get transactions
router.get("/transactions", async (req, res) => {
  const data = await transaction.getData();
  res.send(data);
});

// add transaction
router.post("/transaction/add", async (req, res) => {
  const { selectOption, custumer, quantity } = req.body;
  const data = {
    product_id: selectOption,
    custumer: custumer,
    quantity: quantity,
  };
  const insertTransaction = await transaction.insertData(data);
  if (insertTransaction.status === true) {
    res.status(200).json({
      status: insertTransaction.status,
      message: insertTransaction.message,
    });
  } else {
    res.status(500).json({
      status: insertTransaction.status,
      message: insertTransaction.message,
    });
  }
});

// get detail
router.get("/transactions/:id", async (req, res) => {
  const id = req.params.id;
  const detailData = await transaction.getDetail(id);
  const productDetail = await products.getDetailName(detailData.product);
  const data = {
    detailTran: detailData,
    detailProduct: productDetail,
  };
  res.send(data);
});

router.post("/transaction/update", async (req, res) => {
  const { product_id, quantity, custumer, transaction_id } = req.body;
  const data = {
    product_id: product_id,
    quantity: quantity,
    custumer: custumer,
    transaction_id: transaction_id,
  };
  const update = await transaction.update(data);
  res.send(update);
});

// filtering kategori
router.get("/transaction/:categori", async (req, res) => {
  const categori = req.params.categori;
  if (categori === "all") {
    const categoriFilter = await transaction.getData();
    res.send(categoriFilter);
  } else {
    const categoriFilter = await transaction.filterCategori(categori);
    res.send(categoriFilter);
  }
});

// delete transaction
router.delete("/delete/transaction/:id", async (req, res) => {
  const deleted = await transaction.deleted(req.params.id);
  console.log(deleted.status);
  if (deleted.status === true) {
    res.status(200).json({
      status: true,
      message: "delete successfully",
    });
  } else {
    res.status(500).json({
      status: false,
      message: "delete failed",
    });
  }
});

// reports
router.get("/reports", async (req, res) => {
  const data = await reports.all();
  res.send(data);
});

router.delete("/reports/delete/:id", async (req, res) => {
  const result = await reports.deleted(req.params.id);
  if (result.status === true) {
    res.send({status: true});
  }else{
    res.send({status: false}); 
  }
});

// applog
router.get("/applog", async (req, res) => {
  const data = await applog.all();
  res.send(data);
});

router.delete("/applog/deleted/:id", async (req, res) => {
  const deleted = await applog.clearLog(req.params.id);
  if (deleted > 0) {
    const response = {
      status: true,
      message: "deleted successfully",
    };
    res.status(200).json(response);
  } else {
    const response = {
      status: false,
      message: "deleted failed",
    };
    res.status(500).json(response);
  }
});

router.get("/applog/filter/:date", async (req, res) => {
  const data = await applog.filteringDate(req.params.date);

  if (data.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(500).json([]);
  }
});

module.exports = router;

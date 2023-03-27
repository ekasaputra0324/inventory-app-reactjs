const { pool } = require("../db");
const product = require("./products");
const Report = require("./reports");
const getData = async () => {
  const GetSQL = await pool.query(
    `SELECT * FROM transactions ORDER BY created_at DESC`
  );
  return GetSQL.rows;
};

const filterdate = async (date) => {
  const FiltetrSQL = await pool.query(
    `SELECT * FROM transactions WHERE created_at = '2023-03-21T17:00:00.000Z'`
  );
  return FiltetrSQL.rows;
};

const filterCategori = async (categori) => {
  const FiltetrSQL = await pool.query(
    `SELECT * FROM transactions WHERE category = '${categori}'`
  );
  return FiltetrSQL.rows;
};

const getDetail = async (id) => {
  const detailSQL = await pool.query(
    `SELECT * FROM transactions WHERE id = ${id}`
  );
  return detailSQL.rows[0];
};

const insertData = async (data) => {
  console.log(data);
  let custumer = data.custumer;
  let product_id = data.product_id;
  let quantity = data.quantity;
  const detail = await product.getDetail(product_id);
  const price = detail.price;
  const categori = detail.category;
  const total = price * quantity;
  const transaction_code = Math.floor(Math.random() * 600000);
  var date = new Date().toUTCString();

  if (quantity > detail.quantity) {
    let response = {
      status: false,
      message:
        "The number of items you enter is more than the number of items you select",
    };
    return response;
  } else {
    const InsertSQL = await pool.query(`INSERT INTO transactions
                                          (custumer, product, quantity,price, total , created_at, category, transaction_code)
                                          VALUES(
                                          '${custumer}', 
                                          '${detail.name_product}', 
                                          ${data.quantity},
                                          ${detail.price},
                                          ${total},                                          
                                          '${date}',
                                          '${categori}',
                                          '${transaction_code}'
                                          )`);
    if (InsertSQL.rowCount > 0) {
      const updateQuantity = await product.updateQuantity(
        detail.quantity - quantity,
        product_id
      );
      let dataReports = {
        product: detail.name_product,
        quantity: data.quantity,
        status: false,
        date: date,
        
    } 
    const reports = await Report.insert(dataReports)
    console.log(reports);
      console.log(updateQuantity);
      let response = {
        status: true,
        message: "transaction success add , please wait for the page to load..",
      };
      return response;
    }
  }
};

const deleted = async (id) => {
  var array = JSON.parse("[" + id + "]");
  array.forEach(async idr => {
    await pool.query(`DELETE FROM transactions WHERE id = ${idr}`)
  });
  return { status: true }
};
 
const update = async (data) => {
  
  let id = data.transaction_id;
  let custumer = data.custumer;
  let product_id = data.product_id;
  let quantity = data.quantity;
  const detail = await product.getDetail(product_id);
  const price = detail.price;
  const categori = detail.category;
  const total = price * quantity;
  console.log(total);
  var date = new Date().toUTCString();
  if (quantity > detail.quantity) {
    let response = {
      status: false,
      message:
        "The number of items you enter is more than the number of items you select",
    };
    return response;
  } else {
    const updateSQL = await pool.query(`UPDATE transactions SET 
                                               product = '${detail.name_product}',
                                               custumer = '${custumer}', 
                                               price = ${price},
                                               category = '${categori}',
                                               total = ${total},
                                               quantity = ${quantity},
                                               update_at = '${date}'
                                               WHERE id = ${id}
                                               `);
     if (updateSQL.rowCount > 0) {
      const updateQuantity = await product.updateQuantity(
        detail.quantity - quantity,
        product_id
      );
      console.log(updateQuantity);
      let response = {
        status: true,
        message: "transaction successfully updated...",
      };
      return response;
    }
  }
};

module.exports = {
  getData,
  deleted,
  insertData,
  filterdate,
  filterCategori,
  getDetail,
  update,
};

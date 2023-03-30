const { pool } = require("../db");
const randomstring = require("randomstring");
const Report = require("./reports");

const getProducts = async () => {
  const data = await pool.query(
    `SELECT * FROM products ORDER BY created_at DESC`
  );
  return data.rows;
};

const getDetail = async (id) => {
  const detail = await pool.query(`SELECT * FROM products WHERE id = ${id}`);
  return detail.rows[0];
};

const multipleDetail = async (id) => {
  const array = JSON.parse("[" + id + "]");
  const dataArray = [];
  await Promise.all(
    array.map(async (idp) => {
      const data = (
        await pool.query(`SELECT * FROM products WHERE id = ${idp}`)
      ).rows;
      dataArray.push(data);
    })
  );
  return dataArray;
};

const filterByName = async (name) => {
  const data = await pool.query(
    `SELECT * FROM products WHERE LOWER(name_product) LIKE LOWER($1)`,
    [`%${name.toLowerCase()}%`]
  );
  return data.rows;
};

const filterData = async (categori) => {
  const selectSQL = await pool.query(
    `SELECT * FROM products WHERE category = '${categori}'`
  );
  return selectSQL.rows;
};

const filterDataByid = async (id) => {
  const selectSQL = await pool.query(
    `SELECT * FROM products WHERE id != ${id}`
  );
  return selectSQL.rows;
};



const deletdProduct = async (id) => {
  var array = JSON.parse("[" + id + "]");
  array.forEach(async (idr) => {
    await pool.query(`DELETE FROM products WHERE id = ${idr}`);
  });
  return { status: true };
};

const getDetailName = async (name) => {
  const getDetail = await pool.query(
    `SELECT * FROM products WHERE name_product = '${name}'`
  );
  return getDetail.rows[0];
};

const updateProduct = async (data) => {
  const update_at = new Date().toISOString();
  const SQLupdate = await pool.query(`UPDATE products SET 
                            name_product = '${data.name}', 
                            imge = '${data.Image}',
                            quantity = ${data.quantity}, 
                            description = '${data.description}',
                            selling_price = ${data.sellingprice},
                            updated_at =  '${update_at}',
                            category = '${data.categori}',
                            units_cost = ${data.cost},
                            cost = ${data.costFinal}
                            WHERE id = ${data.id}`);
  if (SQLupdate.rowCount > 0) {
    const name = data.name;
    const lastestQuantity = data.lastestQuantity
    const quantity = data.quantity
    const done_by = data.done_by
    const item_code = data.code
    if (data.quantity < data.lastestQuantity) {
      let data = {
        product: name,
        quantity: quantity - lastestQuantity,
        status: false,
        from: 'Virtual Locations/Inventory adjustment',
        to: 'WH/stock',
        done_by: done_by,
        reference: 'Product Update Quantity',
        code: item_code,
      };
     const reports = await Report.insert(data);
     console.log(reports);  

    }else if(data.quantity > data.lastestQuantity){
      let data = {
        product: name,
        quantity: quantity - lastestQuantity,
        status: true,
        from: 'Virtual Locations/Inventory adjustment',
        to: 'WH/stock',
        done_by: done_by,
        reference: 'Product Update Quantity',
        code: item_code,
      };
      console.log();
      await Report.insert(data);

    }else if(quantity == lastestQuantity){
    return (response = {
      status: true,
    });
   }
  } else {
    return (response = {
      status: false,
    });
  }
};

const insertProduct = async (
  name,
  sellingprice,
  cost,
  from,
  quantity,
  image,
  description,
  category,
  done_by
) => {
  let costFinal = cost * quantity;
  let response;
  const item_code = Math.floor(Math.random() * 600000);
  const insetSQL =
  await pool.query(`INSERT INTO products (item_code, name_product, quantity, imge, description, category, cost, selling_price, "from",units_cost)
                                     VALUES (
                                      ${item_code},
                                      '${name}',
                                      ${quantity}, 
                                      '${image}',
                                      '${description}',
                                      '${category}',
                                      ${costFinal},
                                      ${sellingprice},
                                      '${from}',
                                      ${cost}
                                      )
                                     `);
  if (insetSQL.rowCount > 0) {
    response = {
      status: true,
      data: "add products successfully",
    };
    let data = {
      product: name,
      quantity: quantity,
      status: true,
      from: from,
      to: 'WH/stock',
      done_by: done_by,
      reference: 'Product Add',
      code: item_code,
    };
    await Report.insert(data);
    return response;
  } else {
    response = {
      status: false,
      data: insetSQL,
    };
    return response;
  }
};

const updateQuantity = async (quantity, product_id) => {
  const update = await pool.query(
    `UPDATE products SET quantity = ${quantity} WHERE id = ${product_id}`
  );
  if (update.rowCount > 0) {
    let response = {
      status: true,
    };
    return response;
  } else {
    let response = {
      status: false,
    };
    return response;
  }
};

module.exports = {
  updateQuantity,
  getProducts,
  insertProduct,
  getDetail,
  deletdProduct,
  updateProduct,
  filterData,
  getDetailName,
  filterDataByid,
  multipleDetail,
  filterByName,
};

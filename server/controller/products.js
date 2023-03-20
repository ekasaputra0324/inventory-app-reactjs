const {pool} = require('../db')
const randomstring = require('randomstring');


const getProducts = async () => {
    const data = await pool.query(`SELECT * FROM products ORDER BY created_at DESC`)
    return data.rows
};

const getDetail = async (id) => {
    const detail = await pool.query(`SELECT * FROM products WHERE id = ${id}`)
    return detail.rows[0]
}


const deletdProduct = async (id) => {
    const QueryDelete = await pool.query(`DELETE FROM products WHERE id = ${id}`)
    if (QueryDelete.rowCount > 0) {
        return response = {
            status: true
        }
    }else{
        return response = {
            status: true
        }
    }
}

const updateProduct = async (data) => {
    const update_at  = new Date().toISOString();
    const SQLupdate = await pool.query(`UPDATE products SET 
                            name_product = '${data.name}', 
                            imge = '${data.Image}',
                            quantity = ${data.quantity}, 
                            description = '${data.description}',
                            update_at = '${update_at}',
                            price = ${data.price}
                            WHERE id = ${data.id}
                            ` 
                            );
     if (SQLupdate.rowCount > 0) {
        return response = {
            status: true
        }
     }else{
        return response = {
            status: false
        }
     }
}

const insertProduct = async (name, price , quantity, image , description) => {

    let response 
    const item_code = Math.floor(Math.random() * 600000);
    const created_at = new Date().toISOString();
    const insetSQL = await pool.query(`INSERT INTO products (item_code, name_product, price, quantity, imge, description, created_at)
                                     VALUES (${item_code}, '${name}',${price},'${quantity}', '${image}', '${description}', '${created_at}')
                                     `)
    if (insetSQL.rowCount > 0) {
        response = {
            status: true,
            data: 'add products sucessfully '
        }
        return response;
    }else{
        response = {
            status: false,
            data: insetSQL
        }
        return response;
    }
}

module.exports = {
                getProducts, 
                insertProduct,
                getDetail, 
                deletdProduct,
                updateProduct
                }
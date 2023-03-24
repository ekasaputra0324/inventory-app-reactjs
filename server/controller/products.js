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

const filterData = async (categori) => {
    const selectSQL = await pool.query(`SELECT * FROM products WHERE category = '${categori}'`);
    return selectSQL.rows
}

const filterDataByid = async (id) => {
    const selectSQL = await pool.query(`SELECT * FROM products WHERE id != ${id}`)
    return selectSQL.rows
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

const getDetailName = async (name) => {
    const getDetail = await pool.query(`SELECT * FROM products WHERE name_product = '${name}'`);
    return getDetail.rows[0]
}

const updateProduct = async (data) => {
    const update_at  = new Date().toISOString();
    const SQLupdate = await pool.query(`UPDATE products SET 
                            name_product = '${data.name}', 
                            imge = '${data.Image}',
                            quantity = ${data.quantity}, 
                            description = '${data.description}',
                            update_at = '${update_at}',
                            price = ${data.price}, 
                            category = '${data.categori}'
                            WHERE id = ${data.id}`);
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

const insertProduct = async (name, price , quantity, image , description, category) => {

    let response 
    const item_code = Math.floor(Math.random() * 600000);
    const created_at = new Date().toISOString();
    const insetSQL = await pool.query(`INSERT INTO products (item_code, name_product, price, quantity, imge, description, created_at, category)
                                     VALUES (${item_code}, '${name}',${price},'${quantity}', '${image}', '${description}', '${created_at}', '${category}')
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



const updateQuantity = async (quantity , product_id) => {
    const update = await pool.query(`UPDATE products SET quantity = ${quantity} WHERE id = ${product_id}`)
    if (update.rowCount > 0) {
        let response = {
            status: true
        }
        return response
    } else {
        let response = {
            status: false
        }
        return response
    }
} 

module.exports = {
                updateQuantity,
                getProducts, 
                insertProduct,
                getDetail, 
                deletdProduct,
                updateProduct,
                filterData,
                getDetailName,
                filterDataByid
                }
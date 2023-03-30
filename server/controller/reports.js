const { pool } = require("../db");

const insert = async (data) => {
    const serial_code = Math.floor(Math.random() * 600000);
    const insertSQL = await pool.query(`
    INSERT INTO reports (
        serial_code, 
        product, 
        quantity, 
        status,  
        done_by, 
        from_location,  
        to_location, 
        reference, 
        code
    ) VALUES (
        ${serial_code}, 
        '${data.product}', 
        ${data.quantity}, 
        ${data.status}, 
        '${data.done_by}', 
        '${data.from}', 
        '${data.to}', 
        '${data.reference}',  
        '${data.code}'
        )
    `);

    if (insertSQL.rowCount > 0) {
        return (res = {
            status: 200,
            message: "success",
        });
    } else {
        return (res = {
            status: 200,
            message: insertSQL,
        });
    }
};

const deleted = async (id) => {
    var array = JSON.parse("[" + id + "]");
    console.log(array);
    array.forEach(async (idr) => {
        const deleted = await pool.query(`DELETE FROM reports WHERE id = ${idr}`);
        if (deleted.rowCount > 1) {
            return { status: true, data: deleted.rows };
        }else{
            return { status: false, data: deleted.rows }
        }
    });
};

const all = async () => {
    const data = await pool.query(`SELECT * FROM  reports  ORDER BY date DESC`);
    return data.rows;
};

module.exports = { insert, all, deleted };

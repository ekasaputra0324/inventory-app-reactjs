const {pool} = require('../db')



const insert = async (data) => {
    console.log(data); 
  const reports_code = Math.floor(Math.random() * 600000);
  const insertSQL = await pool.query(`INSERT INTO reports (reports_code, product, quantity, status, date)
                                      VALUES (${reports_code}, '${data.product}', ${data.quantity}, ${data.status}, '${data.date}')
                                   `)
   if (insertSQL.rowCount > 0) {
        return res = {
            status: 200,
            message: 'success'
        }
    }else{
        return res = {
            status: 200,
            message: insertSQL
        }
    } 
}  

const deleted = async (id) => {
    var array = JSON.parse("[" + id + "]");
    console.log(array);
    array.forEach(async idr => {
      const deleted =  await pool.query(`DELETE FROM reports WHERE id = ${idr}`)
      if (deleted.rowCount > 1) {
          return {status : true, data: deleted.rows}
      }
    });
}

const all = async () => {
    const data = await pool.query(`SELECT * FROM  reports `);
    return data.rows 
}

module.exports = {insert, all, deleted}
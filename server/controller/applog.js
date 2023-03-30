const {pool} = require('../db');



const all = async () => {
    const data = await pool.query(`SELECT * FROM applog ORDER BY date DESC`);
    return data.rows
}

const clearLog = async (id) => {
    var array = JSON.parse("[" + id + "]");
    array.forEach(async (idl) => {
      await pool.query(`DELETE FROM applog WHERE id = ${idl}`) 
    });
    return 1
}


const filteringDate = async (date) => {
    let data = await pool.query(`SELECT * FROM applog WHERE date = '${date}'`);
    return data.rows
}

module.exports = {all, clearLog, filteringDate}
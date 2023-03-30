const  {pool}  = require('../db');

const saveLog = async (data) => {
    let date = new Date().toUTCString()
    const insert = await pool.query(`INSERT INTO applog  ("user", url, method, status_code, date) 
    VALUES ('${data.user}', '${data.url}', '${data.method}', '${data.status_code}', '${date}')`)
    console.log(insert);
}


module.exports = {saveLog}
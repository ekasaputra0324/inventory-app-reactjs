const {Pool} = require('pg');
require('dotenv').config();


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "inventory",
    password: "admin",
    port: 5432
}); 

module.exports = {pool} 
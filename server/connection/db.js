const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'inventory_app',
    password: 'admin',
    port: 5432
});

client.connect((err) => {
    if (err) {
        throw err;
    }
    if (!err) {
        console.log('databases connected successfully');
    }
})

module.exports = {client}
const express = require('express')
const app = express();
const cors = require('cors')
const {client} = require('./connection/db');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));





// api insertbarang
app.get('/api/InsterBarang', (req, res) => {
    const nama_barang = "mie instans";
    const quantyty =  1;
    const tanggal_barang = new Date().toISOString();
    const sqlInsert = `INSERT INTO barang (nama_barang , jumlah, created_at, status_barang,kategori_id) 
                       VALUES ('${nama_barang}','${quantyty}','${tanggal_barang}',${false},${1})`
    client.query(sqlInsert,  (err, result) => {
        if (!err) {
            console.log("data barang berhasil di tambahkan");
        }
        if(err) throw err;
    }) ;
}); 



//  api  insert kategori
app.get('/api/InsetKategori', (req, res) => {
    const nama_kategori = req.params.nama_kategori;
    const sqlInsert = `INSERT INTO kategori (nama_kategori) VALUES ('${nama_kategori}') `
    client.query(sqlInsert, (err, result) => {
        if (!err) {
            console.log("data kategori berhasi di tambahkan");
        }
        if(err) throw err;
    });
});








app.listen(5000, () => {
    console.log('listening on port * 5000');
});
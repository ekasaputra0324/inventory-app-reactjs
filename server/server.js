const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const helmet = require('helmet');
const server = require('http').createServer(app);
const routeIndex = require('./routers/route');
const { Server } = require('socket.io');
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
})

app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));


app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        credentials: true,
        name: "sid",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.ENVIRONMENT === "production",
            httpOnly: true,
            sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax"
        }
    })
)
 
app.use('/', routeIndex); 
io.on('connect', socket => { });


app.listen(5000, () => {
    console.log('listening on port * 5000');
});
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


//Configs
var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}
app.use(cors());
app.use(express.json());


//Database connection
//database con
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true

});

app.use((req, res, next) => {
    req.io = io;
    next();
})
//Models
requireDir('./src/models');

//Routes
app.use('/api', require('./src/routes'));

server.listen(3002);
console.log('app is listening on port 3002');
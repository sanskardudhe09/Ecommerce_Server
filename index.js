const express = require('express');
const dotenv = require('dotenv');
const conn = require('./connection/conn.js');
const authRoute = require('./routes/authRoute.js');
const categoryRoute = require('./routes/categoryRoute.js');
const productRoute = require('./routes/productRoute.js')
const morgan = require('morgan');
const path = require('path');
var cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
conn();
app.use("/api", authRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use(express.static(path.join(__dirname, "./client/build/")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
 });
const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
});
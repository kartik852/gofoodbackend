const { request } = require('express');
const express = require('express')
const app = express()
const port = 5000;
const fs = require("fs");
const BASE_URL = process.env.BASE_URL;
const mongodb=require("./db");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongodb();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use('/api',require("./Routes/Createuser"));
app.use('/api',require("./Routes/Displaydata"));
app.use('/api',require("./Routes/OrderData"));
// app.use('/api',require("./Routes/myOrderData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const orderRoutes = require('./src/routes/order.routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    console.log("server Order Api ");
    return res.send("hello");
});

app.use('/api/v1', orderRoutes);

module.exports = app;
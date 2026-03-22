const express = require('express');
const router = express.Router();

const {
    callbackOrder,
    promiseOrder,
    asyncOrder
} = require('../controllers/order.controller');

router.get('/callback-order', callbackOrder);
router.get('/promise-order', promiseOrder);
router.get('/async-order', asyncOrder);

module.exports = router;
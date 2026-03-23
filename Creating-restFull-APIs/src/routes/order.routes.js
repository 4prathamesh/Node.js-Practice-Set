const express = require('express');
const router = express.Router();

const {
    callbackOrder,
    promiseOrder,
    asyncOrder
} = require('../controllers/order.controller');

router.get('/callback-order/:userId', callbackOrder);
router.get('/promise-order/:userId', promiseOrder);
router.get('/async-order/:userId', asyncOrder);

module.exports = router;
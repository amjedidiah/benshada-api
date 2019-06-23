
const express = require('express');
const router = express.Router();

router.use('/users', require('./users/'));
router.use('/shops', require('./shops/'));
router.use('/products', require('./products/'));
router.use('/reviews', require('./reviews/'));
router.use('/blog', require('./blog/'));
router.use('/orders', require('./orders/'));
router.use('/transactions', require('./transactions/'));

module.exports = router;


const express = require('express');
const router = express.Router();

router.use('/users', require('./users/'));
router.use('/shops', require('./shops/'));
router.use('/products', require('./products/'));
router.use('/reviews', require('./reviews/'));
router.use('/blog', require('./blog/'));
router.use('/orders', require('./orders/'));
router.use('/transactions', require('./transactions/'));
router.use('/delivery-company', require('./deliveryCompanies/'))
router.use('/delivery-package', require('./deliveryPackages/'))

module.exports = router;

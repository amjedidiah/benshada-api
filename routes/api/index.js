
const express = require('express');
const router = express.Router();

router.use('/users', require('./users/'));
router.use('/shops', require('./shops/'));
router.use('/products', require('./products/'));
router.use('/reviews', require('./reviews/'));
router.use('/blog', require('./blog/'));

module.exports = router;

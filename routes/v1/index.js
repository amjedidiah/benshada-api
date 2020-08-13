
const express = require('express');
const router = express.Router();

router.get("/", (req,res) => res.send("Welcome to Benshada Place API<br />We'll share our docs here soon"));

router.use('/users', require('./users/'));
router.use('/shops', require('./shops/'));
router.use('/products', require('./products/'));
router.use('/reviews', require('./reviews/'));
router.use('/blog', require('./blog/'));
router.use('/orders', require('./orders/'));
router.use('/transactions', require('./transactions/'));
router.use('/chat', require('./chat/'))
router.use('/tickets', require('./ticket/'))
router.use('/notifications', require('./notifications/'))
router.use('/testimonials', require('./testimonials/'))
router.use('/subscriptions', require('./subscriptions/'))
router.use('/cart', require('./cart'))
router.use('/delivery-company', require('./deliveryCompanies/'))
router.use('/delivery-package', require('./deliveryPackages/'))

module.exports = router;

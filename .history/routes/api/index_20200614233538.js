
const express = require('express');
const router = express.Router();

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
=======
router.use('/cart', require('./cart'))
>>>>>>> origin/cart

module.exports = router;

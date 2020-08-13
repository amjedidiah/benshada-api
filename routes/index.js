const express = require('express');
const router = express.Router();

router.use('/v1', require('./v1'))

router.all('*', (req, res) => {
	res.send({
		data: null,
		message: 'Incorrect Route',
		error: true
	})
})

module.exports = router;

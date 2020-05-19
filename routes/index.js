const express = require('express');
const router = express.Router();

router.use('/api', require('./api'))

router.all('*', (req, res) => {
	res.send({
		data: null,
		message: 'Incorrect Route',
		error: true
	})
})

module.exports = router;

const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../../auth');
const Users = require('../../../models/Users');

router.get('/', auth.required, (req, res, next) => {

})

router.post('/signup', auth.optional, (req, res) => {
	const user = req.body;

	if (!user.email) {
		return res.status(422).json({
			errors: {
				email: 'is required',
			},
		});
	}

	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: 'is required',
			},
		});
	}

	const finalUser = new Users(user);

	finalUser.setPassword(user.password);

	return finalUser.save()
		.then(() => res.json({ user: finalUser.toAuthJSON() }))
		.catch(() => res.status(500))
})

router.post('/login', auth.optional, (req, res) => {
	const user = req.body;

	if (!user.email) {
		return res.status(422).json({
			errors: {
				email: 'is required',
			},
		});
	}

	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: 'is required',
			},
		});
	}

	return Users.findOne({ email: user.email, isDeleted: false })
		.then(user => {
			if (!user){
				return res.status(400).json({
					errors: {
						user: 'not found'
					}
				})
			}

			if (user.validatePassword(user.password)){
				return res.json({ user: user.toAuthJSON() });
			} else {
				return res.status(400).json({
					errors: {
						user: 'not found'
					}
				})
			}
		})
		.catch(err => {
			return res.status(500)
		})
})

module.exports = router

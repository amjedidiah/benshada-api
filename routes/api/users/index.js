const router = require('express').Router();
const auth = require('../../auth');
const Users = require('../../../models/Users');

router.get('/', auth.required, (req, res) => {
	return Users.find({ ...req.query, isDeleted: false }, { hash: 0, salt: 0 })
		.then(data => res.status(200).send({
				data,
				message: 'Users fetched successfully',
				error: false
			}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.get('/:email', auth.required, (req, res) => {
	const { email } = req.params

	return Users.findOne({ email, isDeleted: false }, { hash: 0, salt: 0 })
		.then(data => {
			if (data === null) res.status(404).send({
				data,
				message: 'User not found',
				error: true
			})

			res.status(200).send({
				data: data,
				message: 'User fetched successfully',
				error: false
			})
		})
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.put('/:email', auth.required, (req, res) => {
	const { email } = req.params

	return Users.findOneAndUpdate({ email }, { ...req.body })
		.then(() => {
			res.status(200).send({
				data: null,
				message: 'User updated successfully',
				error: false
			})
		})
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.delete('/:email', auth.required, (req, res) => {
	const { email } = req.params

	return Users.findOneAndUpdate({ email, isDeleted: false }, { isDeleted: true })
		.then(() => {
			res.status(200).send({
				data: null,
				message: 'User deleted successfully',
				error: false
			})
		})
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.post('/signup', auth.optional, (req, res) => {
	const user = req.body;

	if (!user.password) res.status(400).send({
		data: null,
		message: 'Password is required',
		error: true
	})

	const finalUser = new Users(user);

	finalUser.setPassword(user.password);

	return finalUser.save()
		.then(data => res.status(200).send({
			data: data.toAuthJSON(),
			message: 'Signup successful',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.post('/login', auth.optional, (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) res.status(400).send({
		data: null,
		message: 'Email or Password is required',
		error: true
	})

	return Users.findOne({ email, isDeleted: false })
		.then(user => {
			if (!user){
				return res.status(404).send({
					data: null,
					message: 'Email or Password is incorrect',
					error: true
				})
			}

			if (user.validatePassword(password)){
				return res.status(200).send({
					data: user.toAuthJSON(),
					message: 'Signup successful',
					error: false
				})
			} else {
				return res.status(404).send({
					data: null,
					message: 'Email or Password is incorrect',
					error: true
				})
			}
		})
		.catch(err => {
			return res.status(500).send({
				data: null,
				message: err,
				error: true
			})
		})
})

module.exports = router

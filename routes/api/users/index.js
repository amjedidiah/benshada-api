const router = require('express').Router();
const auth = require('../../auth');
const bcrypt = require('bcrypt')
const Users = require('../../../models/Users');
const sendEmail = require('../../../config/sendMail')
const upload = require('../../../config/upload')
const Crypto = require('crypto-js')

router.get('/', auth.required, (req, res) => {
  return Users.find({ ...req.query, isDeleted: false }, { hash: 0, salt: 0 })
    .populate('saved')
    .populate('cart')
    .populate('shops')
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

  return Users
    .findOne({ email, isDeleted: false }, { hash: 0, salt: 0 })
    .populate('saved')
    .populate('cart')
    .populate('shops')
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

router.put('/:email', auth.required, upload, (req, res) => {
	const { email } = req.params
	console.log(email)
	const image = req.data ? req.data.image : null

	return Users
		.findOneAndUpdate({ email }, { ...req.body, image: image ? image[0] : null }, { new: true })
		.then(data => {
			res.status(200).send({
				data: data,
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

router.post('/signup', auth.optional, upload, (req, res) => {
	const user = req.body;

	if (!user.password) res.status(400).send({
		data: null,
		message: 'Password is required',
		error: true
	})

	Users
		.findOne({ email: user.email, isDeleted: false })
		.then(found => {
			if (found) return res.status(401).send({
				data: null,
				message: 'Email already exists',
				error: true
			})

			else {
				const finalUser = new Users({ ...user });

				finalUser.setPassword(user.password);

				return finalUser.save()
					.then(async data => {
						const { email, name } = data
						const link = Crypto.AES.encrypt(email, 'benshadaSecret').toString()
						console.log(link)
						await sendEmail('verifyAccount', email, name, { link }, res)

						return res.status(200).send({
							data: data.toAuthJSON(),
							message: 'Signup successful',
							error: false
						})
					})
					.catch(err => res.status(500).send({
						data: null,
						message: err,
						error: true
					}))
			}
		})
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.post('/admin-login', auth.optional, (req, res)  => {
	const { email, password } = req.body;

	if (!email || !password) res.status(400).send({
		data: null,
		message: 'Email or Password is required',
		error: true
	})

	return Users.findOne({ email, isDeleted: false })
		.then(user => {
			if (!user || user.type !== 'admin') {
				return res.status(404).send({
					data: null,
					message: 'Email or Password is incorrect',
					error: true
				})
			} else if (user.validatePassword(password)) {
				return res.status(200).send({
					data: user.toAuthJSON(),
					message: 'Login successful',
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

router.post('/login', auth.optional, (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) res.status(400).send({
		data: null,
		message: 'Email or Password is required',
		error: true
	})

  return Users
    .findOne({ email, isDeleted: false })
    .populate('saved')
    .populate('cart')
    .populate('shops')
		.then(user => {
			if (!user) res.status(404).send({
				data: null,
				message: 'Email or Password is incorrect',
				error: true
			})
			else if (user.validatePassword(password)) res.status(200).send({
				data: user.toAuthJSON(),
				message: 'Login successful',
				error: false
			})
			else res.status(404).send({
				data: null,
				message: 'Email or Password is incorrect',
				error: true
			})
		})
		.catch(err =>  res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.post('/verify-user', auth.optional, async (req, res) => {
	const { hash } = req.body

	const email = await CryptoJS.AES.decrypt(hash, 'benshadaSecret').toString(CryptoJS.enc.Utf8)

	Users
		.findOne({ email, isDeleted: false })
		.then(async data => {
			if (!data) return res.status(404).send({
				data: null,
				email: 'Invalid Link',
				error: true
			})
			else {
				Users
					.findOneAndUpdate({ isVerified: true }, { ...finalUser })
					.then(user => res.status(200).send({
						data: user.toAuthJSON(),
						message: 'User Verified Successfully',
						error: false
					}))
					.catch(err => res.status(500).send({
						data: null,
						message: err,
						error: true
					}))
			}
		})
})

router.post('/send-reset-email', auth.optional, (req, res) => {
	try {
		const { email } = req.body

		Users
			.findOne({ email, isDeleted: false })
			.then(async data => {
				if (!data) return res.status(404).send({
					data: null,
					email: 'Email not found',
					error: true
				})
				else {
					const link = Crypto.AES.encrypt(email, 'benshadaSecret').toString()
					console.log(link)
					await sendEmail('passwordReset', email, data.name, { link }, res)

					return res.status(200).send({
						data: null,
						message: 'Password Reset email sent',
						error: false
					})
				}
			})
	} catch ({ message }) {
		return res.status(500).send({
			data: null,
			message,
			error: true
		})
	}
})

router.post('/reset-password', auth.optional, async (req, res) => {
	try {
		const { hash, password } = req.body

		const email = await CryptoJS.AES.decrypt(hash, 'benshadaSecret').toString(CryptoJS.enc.Utf8)

		Users
			.findOne({ email, isDeleted: false })
			.then(async user => {
				if (!user) return res.status(404).send({
					data: null,
					email: 'Email not found',
					error: true
				})
				else {
					const finalUser = user.getPassword(password)
					Users
						.findOneAndUpdate({ email }, { ...finalUser })
						.then(() => res.status(200).send({
							data: user.toAuthJSON(),
							message: 'Password reset Successfully',
							error: false
						}))
						.catch(err => res.status(500).send({
							data: null,
							message: err,
							error: true
						}))
				}
			})
	} catch ({ message }) {
		return res.status(500).send({
			data: null,
			message,
			error: true
		})
	}
})

router.post('/change-password', auth.required, (req, res) => {
	const { password, oldPassword, email } = req.body

	if (!password || !oldPassword || !email) res.status(400).send({
		data: null,
		message: 'Incomplete Data',
		error: true
	})

	return Users.findOne({ email, isDeleted: false })
		.then(user => {
			if (!user) res.status(404).send({
				data: null,
				message: 'Email or Password is incorrect',
				error: true
			})
			else if (user.validatePassword(oldPassword)){
				const finalUser = user.getPassword(password)
				Users.findOneAndUpdate({ email }, { ...finalUser })
					.then(() => res.status(200).send({
						data: user.toAuthJSON(),
						message: 'Password reset Successfully',
						error: false
					}))
					.catch(err => res.status(500).send({
						data: null,
						message: err,
						error: true
					}))
			} else res.status(404).send({
				data: null,
				message: 'Incorrect Username or Password',
				error: true
			})
		})
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

module.exports = router

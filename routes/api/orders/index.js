const router = require('express').Router()
const auth = require('../../auth')
const Orders = require('../../../models/Orders')
const Users = require('../../../models/Users')
const Notification = require('../../../models/Notifications')
// const nodeMailer = require('nodemailer')
// const transporter = nodeMailer.createTransport({
// 	host: 'mail.bubbue.com',
// 	secureConnection: true,
// 	port: 465,
// 	auth: {
// 		user: 'noreply@bubbue.com',
// 		pass: 'bubbuepass9120'
// 	},
// 	tls: {
// 		// ciphers: 'SSLv3',
// 		rejectUnauthorized: false
// 	}

// })
// const from = 'noreply@bubbue.com'

router.get('/', auth.required, (req, res) => {
	return Orders.find({ ...req.query, isDeleted: false })
		.populate('user', '_id name city')
		.populate('products', '_id name description price discountPercentage')
		.populate('transaction', '_id trxnRef amount')
		.then(data => res.status(200).send({
			data,
			message: 'Orders fetched successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.post('/', auth.required, (req, res) => {
	try {
		// const { user } = req.body

		return new Orders({ ...req.body })
			.save()
			.then(data => {
				// Users.findById(user)
				// 	.then(userData => {
				// 		const { email } = userData
				// 	})
				res.status(200).send({
					data,
					message: 'Order added successfully',
					error: false
				})
			})
			.catch(err => res.status(500).send({
				data: null,
				message: err,
				error: true
			}))
	} catch (err){
		res.status(500).send({
			data: null,
			message: err,
			error: true
		})
	}
})

router.get('/:id', auth.optional, (req, res) => {
	const { id } = req.params

	return Orders.findById(id)
		.populate('user', '_id name city')
		.populate('products', '_id name description price discountPercentage')
		.populate('transaction', '_id trxnRef amount')
		.then(data => {
			if (data === null) res.status(404).send({
				data,
				message: 'Order not found',
				error: true
			})

			res.status(200).send({
				data: data,
				message: 'Order fetched successfully',
				error: false
			})
		})
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.put('/:id', auth.required, (req, res) => {
  const { id } = req.params
  const { status } = req.body

	return Orders.findByIdAndUpdate(id, { ...req.body }, { upsert: false })
		.then(() => {
      if (status){
        new Notification({
          title: 'Order status changed',
		  description: `The status of one of your orders: ${id} has changed to ${status}`,
		  type: 'order',
		  identifier: id,
		  user: data.user,
        })
          .save()
          .then(() => null)
          .catch(() => null)
      }

      return res.status(200).send({
        data: null,
        message: 'Order updated successfully',
        error: false
      })
    })
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.delete('/:id', auth.required, (req, res) => {
	const { id } = req.params

	return Orders.findByIdAndUpdate(id, { isDeleted: true }, { upsert: false })
		.then(() => res.status(200).send({
			data: null,
			message: 'Order deleted successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

module.exports = router

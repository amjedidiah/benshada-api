const router = require('express').Router()
const auth = require('../../auth')
const Transactions = require('../../../models/Transactions')
const Orders = require('../../../models/Orders')

router.get('/', auth.optional, (req, res) => {
	return Transactions.find({ ...req.query, isDeleted: false })
		.populate('user', '_id name city')
		.then(data => res.status(200).send({
			data,
			message: 'Transactions fetched successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.post('/', auth.required, (req, res) => {
	const { order } = req.body

	return new Transactions({ ...req.body })
		.save()
		.then(data => {
			Orders.findByIdAndUpdate(order, { status: 'in-progress' })
				.then(() => res.status(200).send({
					data,
					message: 'Transaction added successfully',
					error: false
				}))
				.catch(err => res.status(500).send({
					data: null,
					message: err,
					error: true
				}))
		})
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.get('/:id', auth.optional, (req, res) => {
	const { id } = req.params

	return Transactions.findById(id)
		.populate('user', '_id name city')
		.then(data => {
			if (data === null) res.status(404).send({
				data,
				message: 'Transaction not found',
				error: true
			})

			res.status(200).send({
				data: data,
				message: 'Transaction fetched successfully',
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

	return Transactions.findByIdAndUpdate(id, { ...req.body }, { upsert: false })
		.then(() => res.status(200).send({
			data: null,
			message: 'Transaction updated successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.delete('/:id', auth.required, (req, res) => {
	const { id } = req.params

	return Transactions.findByIdAndUpdate(id, { isDeleted: true }, { upsert: false })
		.then(() => res.status(200).send({
			data: null,
			message: 'Transaction deleted successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

module.exports = router

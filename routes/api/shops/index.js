const router = require('express').Router()
const auth = require('../../auth')
const Shops = require('../../../models/Shops')

router.get('/', auth.optional, (req, res) => {
	return Shops.find({ ...req.query, isDeleted: false })
		.populate('user', '_id name city')
		.populate('products', '_id name description price discountPercentage')
		.then(data => res.status(200).send({
			data,
			message: 'Shops fetched successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.post('/', auth.required, (req, res) => {
	return new Shops({ ...req.body })
		.save()
		.then(data => res.status(200).send({
			data,
			message: 'Shop added successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.get('/:id', auth.optional, (req, res) => {
	const { id } = req.params

	return Shops.findById(id)
		.populate('user', '_id name city')
		.populate('products', '_id name description price discountPercentage')
		.then(data => {
			if (data === null) res.status(404).send({
				data,
				message: 'Shop not found',
				error: true
			})

			res.status(200).send({
				data: data,
				message: 'Shop fetched successfully',
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

	return Shops.findByIdAndUpdate(id, { ...req.body }, { upsert: false })
		.then(() => res.status(200).send({
			data: null,
			message: 'Shop updated successfully',
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

	return Shops.findByIdAndUpdate(id, { isDeleted: true }, { upsert: false })
		.then(() => res.status(200).send({
			data: null,
			message: 'Shop deleted successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

module.exports = router

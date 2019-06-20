const router = require('express').Router()
const auth = require('../../auth')
const Products = require('../../../models/Products')
const Reviews = require('../../../models/Reviews')

router.get('/', auth.optional, (req, res) => {
	return Reviews.find({ ...req.query, isDeleted: false })
		.populate('user', '_id name city')
		.populate('product', '_id name description')
		.then(data => res.status(200).send({
			data,
			message: 'Reviews fetched successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.post('/', auth.required, (req, res) => {
	const { product, rating } = req.body

	return new Reviews({ ...req.body })
		.save()
		.then(data => {
			Products.findOne({ _id: product, isDeleted: false })
				.then(prodData => {
					if (prodData === null) res.status(404).send({
						data: prodData,
						message: 'Product not found',
						error: true
					})
					else {
						const { reviews, overallRating } = prodData
						reviews.push(data._id)
						const newRating = ((rating + overallRating) / reviews.length)

						Products.findByIdAndUpdate(product, { reviews, overallRating: newRating })
							.then(() => res.status(200).send({
								data,
								message: 'Review added successfully',
								error: false
							}))
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
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.get('/:id', auth.optional, (req, res) => {
	const { id } = req.params

	return Reviews.findById(id)
		.populate('user', '_id name city')
		.populate('product', '_id name description')
		.then(data => {
			if (data === null) res.status(404).send({
				data,
				message: 'Review not found',
				error: true
			})

			res.status(200).send({
				data: data,
				message: 'Review fetched successfully',
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

	return Reviews.findByIdAndUpdate(id, { ...req.body }, { upsert: false })
		.then(() => res.status(200).send({
			data: null,
			message: 'Review updated successfully'
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.delete('/:id', auth.required, (req, res) => {
	const { id } = req.params

	return Reviews.findByIdAndUpdate(id, { isDeleted: true }, { upsert: false })
		.then(() => res.status(200).send({
			data: null,
			message: 'Review deleted successfully'
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

module.exports = router

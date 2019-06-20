const router = require('express').Router()
const auth = require('../../auth')
const Products = require('../../../models/Products')
const Shops = require('../../../models/Shops')

router.get('/', auth.optional, (req, res) => {
	return Products.find({ ...req.query, isDeleted: false })
		.populate('reviews')
		.populate('shop', '_id name description')
		.then(data => res.status(200).send({
			data,
			message: 'Products fetched successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.post('/', auth.required, (req, res) => {
	const { shop } = req.body

	return new Products({ ...req.body })
		.save()
		.then(data => {
			Shops.findOne({ _id: shop, isDeleted: false })
				.then(shopData => {
					if (shopData === null) res.status(404).send({
						data: shopData,
						message: 'Shop not found',
						error: true
					})
					else {
						const { products } = shopData
						products.push(data._id)

						Shops.findByIdAndUpdate(shop, { products })
							.then(() => res.status(200).send({
								data,
								message: 'Product added successfully',
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

	return Products.findById(id)
		.populate('reviews')
		.populate('shop', '_id name description')
		.then(data => {
			if (data === null) res.status(404).send({
				data,
				message: 'Product not found',
				error: true
			})

			res.status(200).send({
				data: data,
				message: 'Product fetched successfully',
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

	return Products.findByIdAndUpdate(id, { ...req.body }, { upsert: false })
		.then(() => res.status(200).send({
			data: null,
			message: 'Product updated successfully'
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.delete('/:id', auth.required, (req, res) => {
	const { id } = req.params

	return Products.findByIdAndUpdate(id, { isDeleted: true }, { upsert: false })
		.then(() => res.status(200).send({
			data: null,
			message: 'Product deleted successfully'
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

module.exports = router

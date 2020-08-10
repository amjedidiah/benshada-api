const router = require('express').Router()
const auth = require('../../auth')
const Products = require('../../../models/Products')
const Shops = require('../../../models/Shops')
const Users = require('../../../models/Users')
const upload = require('../../../config/upload')
const Notification = require('../../../models/Notifications')

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

router.post('/', auth.required, upload, (req, res) => {
	const { shop } = req.body
	const { image } = req.data

	return new Products({ ...req.body, image })
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

router.put('/:id', auth.required, upload, (req, res) => {
	const { id } = req.params
	const image = req.data ? req.data.image : null
	const product = image ? { ...req.body, image:  image[0] } : {...req.body}

	return Products.findByIdAndUpdate(id, product, { upsert: false, new: true })
		.then(data => {
      if (data && data.isBlocked) {
        new Notification({
          title: `Product ${isBlocked ? 'blocked' : 'unblocked'}`,
          description: `Your product, ${data.name} has been ${isBlocked ? 'blocked' : 'unblocked'}`,
		  type: 'product',
		  identifier: id,
          user: data.user,
        })
          .save()
          .then(() => null)
          .catch(() => null)
      }
      return res.status(200).send({
        data: null,
        message: 'Product updated successfully'
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

router.post('/save/:id', auth.required, (req, res) => {
	const product = req.params.id
	const userId = req.body.userId

	Users
		.findById(userId)
		.then(user => {
			if (!user) return res.status(404).send({
				data: null,
				message: 'User not found',
				error: true
			})

			const saved = user.saved || []
			if (saved.includes(product)) return res.status(400).send({
				data: null,
				message: 'Product already saved',
				error: false
			})

			saved.push(product)
			Users
				.findByIdAndUpdate(userId, { saved })
				.then(() => res.status(200).send({
					data: null,
					message: 'Product saved successfully'
				}))
				.catch(err => res.status(500).send({
					data: null,
					message: err,
					error: true
				}))
		})
})
router.post('/unsave/:id', auth.required, (req, res) => {
	const product = req.params.id
	const userId = req.body.userId

	Users
		.findById(userId)
		.then(user => {
			if (!user) return res.status(404).send({
				data: null,
				message: 'User not found',
				error: true
			})

			const saved = user.saved || []
			if (!saved.includes(product)) return res.status(400).send({
				data: null,
				message: 'Product not saved',
				error: false
			})

			saved.splice(saved.indexOf(product), 1)
			Users
				.findByIdAndUpdate(userId, { saved })
				.then(() => res.status(200).send({
					data: null,
					message: 'Product removed successfully'
				}))
				.catch(err => res.status(500).send({
					data: null,
					message: err,
					error: true
				}))
		})
})

module.exports = router

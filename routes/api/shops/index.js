const router = require('express').Router()
const auth = require('../../auth')
const Shops = require('../../../models/Shops')
const Notification = require('../../../models/Notifications')
const upload = require('../../../config/upload')

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
		.populate('products', '_id name description price discountPercentage category gender quantity image')
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

router.put('/:id', auth.required, upload, (req, res) => {
  const { id } = req.params
  const { isBlocked } = req.body
  const image = req.data ? req.data.image : null
  const shop = image ? { ...req.body, image:  image[0] } : {...req.body}

	return Shops.findByIdAndUpdate(id, shop, { upsert: false, new: true })
		.then(data => {
      if (isBlocked) {
        new Notification({
          title: `Shop ${isBlocked ? 'blocked' : 'unblocked'}`,
          description: `Your shop, ${data.name} has been ${isBlocked ? 'blocked' : 'unblocked'}`,
          user: data.user,
        })
          .save()
          .then(() => null)
          .catch(() => null)
      }

      return res.status(200).send({
        data,
        message: 'Shop updated successfully',
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

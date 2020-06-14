const router = require('express').Router()
const auth = require('../../auth')
const Subscriptions = require('../../../models/Subscriptions')

router.get('/', auth.required, (req, res) => {
  Subscriptions
    .find({ isDeleted: false })
    .then(data => res.status(200).send({
      data,
      message: 'All subscriptions fetched successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

router.post('/', (req, res) => {
  const { email } = req.body
  new Subscriptions({ email })
    .save()
    .then(data => res.status(200).send({
      data,
      message: 'Subscription added successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

router.delete('/:email', (req, res) => {
  const { email } = req.params

  Subscriptions
    .findOneAndDelete({ email })
    .then(() => res.status(200).send({
      data: null,
      message: 'Subscription deleted successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

module.exports = router

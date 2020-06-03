const router = require('express').Router()
const auth = require('../../auth')
const Notification = require('../../../models/Notifications')

router.get('/:user', auth.required, (req, res) => {
  const { user } = req.params

  Notification
    .find({ user, isDeleted: false })
    .populate('user', '_id name email')
    .then(data => res.status(200).send({
      data,
      message: 'Notifications fetched successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

router.post('/read/:id', auth.required, (req, res) => {
  const { id } = req.params

  Notification
    .findByIdAndUpdate(id, { read: true }, { new: true })
    .then(data => res.status(200).send({
      data,
      message: 'Notification updated successfully',
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

  Notification
    .findByIdAndUpdate(id, { isDeleted: true })
    .then(() => res.status(200).send({
      data: null,
      message: 'Notification deleted successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

module.exports = router

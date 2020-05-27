const router = require('express').Router()
const auth = require('../../auth')
const Chat = require('../../../models/Chat')

router.get('/', auth.required, (req, res) => {
  Chat
    .find({ ...req.query, isDeleted: false })
    .populate('user', '_id name email')
    .then(data => res.status(200).send({
      data,
      message: 'All messages fetched successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

router.post('/', auth.required, (req, res) => {
  new Chat({ ...req.body })
    .save()
    .then(data => res.status(200).send({
      data,
      message: 'Message sent successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

router.get('/:user', auth.required, (req, res) => {
  const { user } = req.params
  console.log(user)

  Chat
    .find({ ...req.query, user, isDeleted: false })
    .populate('user', '_id name email')
    .then(data => res.status(200).send({
      data,
      message: 'Messages fetched successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

router.put('/:id', auth.required, (req, res) => {
  const { id } = req.params

  Chat
    .findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then(data => res.status(200).send({
      data,
      message: 'Messages updated successfully',
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

  Chat
    .findByIdAndDelete(id, { ...req.body })
    .then(() => res.status(200).send({
      data: null,
      message: 'Messages deleted successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

module.exports = router

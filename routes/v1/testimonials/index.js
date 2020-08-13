const router = require('express').Router()
const auth = require('../../auth')
const Testimonials = require('../../../models/Testimonials')

router.get('/', auth.optional, (req, res) => {
  Testimonials
    .find({ ...req.query, isDeleted: false })
    .populate('user', '_id name email')
    .then(data => res.status(200).send({
      data,
      message: 'All testimonials fetched successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

router.post('/', auth.required, (req, res) => {
  new Testimonials({ ...req.body })
    .save()
    .then(data => res.status(200).send({
      data,
      message: 'Testimonial added successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

router.get('/:id', auth.required, (req, res) => {
  const { id } = req.params

  Testimonials
    .find({ ...req.query, _id: id, isDeleted: false })
    .populate('user', '_id name email')
    .then(data => res.status(200).send({
      data,
      message: 'Testimonials fetched successfully',
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

  Testimonials
    .findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then(data => res.status(200).send({
      data,
      message: 'Testimonial updated successfully',
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

  Testimonials
    .findByIdAndDelete(id, { ...req.body })
    .then(() => res.status(200).send({
      data: null,
      message: 'Testimonial deleted successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

module.exports = router

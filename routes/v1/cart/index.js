const router = require('express').Router()
const auth = require('../../auth')
const Users = require('../../../models/Users')

router.get('/get-cart/:user', auth.required, (req, res) => {
  const { user } = req.params
  
  Users
    .findOne({ _id: user, isDeleted: false })
    .populate('cart')
    .then(data => {
      if (!data) return res.status(404).send({
        data: null,
        message: 'User not found',
        error: false
      })

      return res.status(200).send({
        data: data.cart,
        message: 'Cart fetched successfully',
        error: false
      })
    })
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

router.get('/get-saved/:user', auth.required, (req, res) => {
  const { user } = req.params

  Users
    .findOne({ _id: user, isDeleted: false })
    .populate('saved')
    .then(data => {
      if (!data) return res.status(404).send({
        data: null,
        message: 'User not found',
        error: false
      })

      return res.status(200).send({
        data: data.saved,
        message: 'Saved items fetched successfully',
        error: false
      })
    })
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

router.post('/add-cart', auth.required, (req, res) => {
  const { user, product } = req.body

  Users
    .findOne({ _id: user, isDeleted: false })
    .then(userData => {
      if (!userData) return res.status(404).send({
        data: null,
        message: 'User not found',
        error: false
      })

      const { cart } = userData
      Users
        .findOneAndUpdate({ _id: user }, { cart: [...cart, product] }, { new: true })
        .then(data => res.status(200).send({
          data: data.cart,
          message: 'Product added successfully',
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

router.post('/add-saved', auth.required, (req, res) => {
  const { user, product } = req.body

  Users
    .findOne({ _id: user, isDeleted: false })
    .then(userData => {
      if (!userData) return res.status(404).send({
        data: null,
        message: 'User not found',
        error: false
      })

      const { saved } = userData
      Users
        .findOneAndUpdate({ _id: user }, { saved: [...saved, product] }, { new: true })
        .then(data => res.status(200).send({
          data: data.saved,
          message: 'Product added successfully',
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

router.post('/remove-cart', auth.required, (req, res) => {
  const { user, product } = req.body

  Users
    .findOne({ _id: user, isDeleted: false })
    .then(userData => {
      if (!userData) return res.status(404).send({
        data: null,
        message: 'User not found',
        error: false
      })

      const { cart } = userData
      const newCart = cart.filter(item => item._id != product)
      Users
        .findOneAndUpdate({ _id: user }, { cart: newCart }, { new: true })
        .then(data => res.status(200).send({
          data: data.cart,
          message: 'Product removed successfully',
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

router.post('/remove-saved', auth.required, (req, res) => {
  const { user, product } = req.body

  Users
    .findOne({ _id: user, isDeleted: false })
    .then(userData => {
      if (!userData) return res.status(404).send({
        data: null,
        message: 'User not found',
        error: false
      })

      const { saved } = userData
      const newSaved = saved.filter(item => item._id != product)
      Users
        .findOneAndUpdate({ _id: user }, { saved: newSaved }, { new: true })
        .then(data => res.status(200).send({
          data: data.saved,
          message: 'Product removed successfully',
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

module.exports = router

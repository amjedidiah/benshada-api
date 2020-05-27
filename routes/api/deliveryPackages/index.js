const router = require('express').Router()
const auth = require('../../auth')
const DeliveryCompanies = require('../../../models/DeliveryCompanies')
const DeliveryPackages = require('../../../models/DeliveryPackages')

router.get('/', auth.required, (req, res) => {
  DeliveryPackages
    .find({ ...req.query, isDeleted: false })
    .populate('deliveryCompany')
    .then(data => res.status(200).send({
      data,
      message: 'Delivery Packages fetched successfully',
      error: false
    }))
    .catch(err => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
})

router.post('/', auth.required, (req, res) => {
  const { deliveryCompany } = req.body

  DeliveryCompanies
    .findOne({ _id: deliveryCompany, isDeleted: false })
    .then(company => {
      if (!company) return res.status(404).send({
        data: null,
        message: 'Delivery Company not found',
        error: true
      })

      const { deliveryPackages } = company

      new DeliveryPackages({ ...req.body })
        .save()
        .then(data => {
          const { _id } = data

          DeliveryCompanies
            .findByIdAndUpdate(deliveryCompany, { deliveryPackages: [...deliveryPackages, _id] })
            .then(() => res.status(200).send({
              data,
              message: 'Delivery Package added successfully',
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
})

router.put('/:id', auth.required, (req, res) => {
  const { id } = req.params
  DeliveryPackages
    .findOneAndUpdate(id, { ...req.body }, { new: true })
    .populate('deliveryCompany')
    .then(data => res.status(200).send({
      data,
      message: 'Delivery Package updated successfully',
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
  DeliveryPackages
    .findOneAndUpdate(id, { isDeleted: true }, { new: true })
    .populate('deliveryCompany')
    .then(data => {
      console.log(data)
      const { _id, deliveryPackages } = data.deliveryCompany

      const newPackages = deliveryPackages.filter(item => item._id != id)

      DeliveryCompanies
        .findByIdAndUpdate(_id, { deliveryPackages: newPackages })
        .then(() => res.status(200).send({
          data: null,
          message: 'Delivery Package deleted successfully',
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

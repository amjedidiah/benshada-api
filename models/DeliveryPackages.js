const mongoose = require('mongoose')

const { Schema } = mongoose

const PackageSchema = new Schema({
  deliveryCompany: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'DeliveryCompanies'
  },
  to: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true,
    enum: ['pickup', 'doorstep']
  },
  pickupStation: {
    name: String,
    address: String,
  },
  cost: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  address: String,
  maxDeliverySize: {
    type: Number,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('DeliveryPackages', PackageSchema)

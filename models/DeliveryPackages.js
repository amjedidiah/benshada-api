const mongoose = require('mongoose')

const { Schema } = mongoose

const PackageSchema = new Schema({
  deliveryCompany: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'DeliveryCompanies'
  },
  to: String,
  from: String,
  method: {
    type: String,
    required: true,
    enum: ['pickup', 'delivery']
  },
  pickupStation: {
    name: String,
    address: String,
    state: String
  },
  cost: {
    type: Number,
    required: true
  },
  duration: Number,
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

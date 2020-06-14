const mongoose = require('mongoose')

const { Schema } = mongoose

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  headOffice: {
    type: String,
    required: true
  },
  contactPerson: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  deliveryPackages: [{
    type: Schema.Types.ObjectId,
    ref: 'DeliveryPackages'
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('DeliveryCompanies', CompanySchema)

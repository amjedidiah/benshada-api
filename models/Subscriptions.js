const mongoose = require('mongoose')

const { Schema } = mongoose

const SubscriptionsSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  isDeleted: {
    default: false,
    type: Boolean,
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Subscriptions', SubscriptionsSchema)

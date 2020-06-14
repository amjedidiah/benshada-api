const mongoose = require('mongoose')

const { Schema } = mongoose

const TicketsSchema = new Schema({
  user: {
    ref: 'Users',
    type: Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['return quest', 'complaint']
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products'
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Orders'
  },
  images: [String],
  responses: [{
    description: String,
    title: String,
  }],
  status: {
    type: String,
    default: 'pending'
  },
  isDeleted: {
    default: false,
    type: Boolean
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Tickets', TicketsSchema)

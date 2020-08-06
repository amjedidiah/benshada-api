const mongoose = require('mongoose')

const { Schema } = mongoose

const TicketsSchema = new Schema({
  owner: {
    ref: 'Users',
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  image: [String],
  type: {
    type: String,
    required: true,
    enum: ['order','user', 'shop', 'other']
  },
  user: String,
  shop: String,
  orderNumber: String,
  status: {
    type: String,
    default: 'pending'
  },
  responses: [{
    createdAt: String,
    description: String,
    _id: String,
    userID: String
  }],
  isDeleted: {
    default: false,
    type: Boolean
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Tickets', TicketsSchema)

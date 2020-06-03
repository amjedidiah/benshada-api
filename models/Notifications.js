const mongoose = require('mongoose')

const { Schema } = mongoose

const NotificationsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    default: false,
    type: Boolean,
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Notifications', NotificationsSchema)

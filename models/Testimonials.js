const mongoose = require('mongoose')

const { Schema } = mongoose

const TestimonialsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  testimony: {
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

module.exports = mongoose.model('Testimonials', TestimonialsSchema)

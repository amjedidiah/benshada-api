const mongoose = require('mongoose')

const { Schema } = mongoose

const ReviewsSchema = new Schema({
	rating: {
		type: Number,
		required: true
	},
	description: String,
	user: {
		ref: 'Users',
		type: Schema.Types.ObjectId,
		required: true
	},
	product: {
		ref: 'Products',
		type: Schema.Types.ObjectId,
		required: true
	},
	isDeleted: {
		default: false,
		type: Boolean
	},
}, {
		timestamps: true
	})

module.exports = mongoose.model('Reviews', ReviewsSchema)

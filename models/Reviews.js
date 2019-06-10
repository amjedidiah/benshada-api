const mongoose = require('mongoose')

const { Schema } = mongoose

const ReviewsSchema = new Schema({
	rating: Number,
	description: String,
	user: {
		ref: 'Users',
		type: Schema.Types.ObjectId
	},
	product: {
		ref: 'Reviews',
		type: Schema.Types.ObjectId
	},
	isDeleted: {
		default: false,
		type: Boolean
	},
}, {
		timestamps: true
	})

mongoose.model('Reviews', ReviewsSchema)

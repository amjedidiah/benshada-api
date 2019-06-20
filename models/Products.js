const mongoose = require('mongoose')

const { Schema } = mongoose

const ProductsSchema = new Schema({
	name: {
		required: true,
		type: String
	},
	description: {
		type: String,
		required: true
	},
	shop: {
		ref: 'Shops',
		type: Schema.Types.ObjectId
	},
	reviews: [{
		ref: 'Reviews',
		type: Schema.Types.ObjectId
	}],
	overallRating: {
		type: Number,
		default: 0
	},
	inStock: {
		type: Boolean,
		default: true
	},
	price: {
		type: Number,
		required: true
	},
	discountPercentage: {
		type: Number,
		default: 0
	},
	isDeleted: {
		default: false,
		type: Boolean
	},
}, {
	timestamps: true
})

module.exports = mongoose.model('Products', ProductsSchema)

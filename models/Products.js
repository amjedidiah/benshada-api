const mongoose = require('mongoose')

const { Schema } = mongoose

const ProductsSchema = new Schema({
	name: {
		required: true,
		type: String
	},
	shortDescription: {
		type: String,
		required: true
	},
	longDescription: {
		type: String,
		required: true
	},
	specifications: {
		size: String,
		color: String,
		mainMaterial: String,
		weight: String,
		productionCountry: String
	},
	guarantee: {
		type: Number,
		required: true
	},
	deliveryTime: {
		type: Number,
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
	category: {
		type: String,
		required: false
	},
	gender: {
		type: String,
		required: true,
		enum: ['male', 'female']
	},
	quantity: {
		type: Number,
		default: 0
	},
	image: [{
		type: String,
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
	returns: {
		type: Number,
		default: 0,
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

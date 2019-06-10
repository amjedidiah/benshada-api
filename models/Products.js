const mongoose = require('mongoose')

const { Schema } = mongoose

const ProductsSchema = new Schema({
	name: String,
	description: String,
	user: {
		ref: 'Users',
		type: Schema.Types.ObjectId
	},
	reviews: [{
		ref: 'Reviews',
		type: Schema.Types.ObjectId
	}],
	price: Number,
	discountPercentage: Number,
	isDeleted: {
		default: false,
		type: Boolean
	},
}, {
	timestamps: true
})

mongoose.model('Products', ProductsSchema)

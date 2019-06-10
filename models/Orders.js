const mongoose = require('mongoose')

const { Schema } = mongoose

const OrdersSchema = new Schema({
	user: {
		ref: 'Users',
		type: Schema.Types.ObjectId
	},
	products: [{
		ref: 'Products',
		type: Schema.Types.ObjectId
	}],
	totalPrice: Number,
	isDeleted: {
		default: false,
		type: Boolean
	},
}, {
		timestamps: true
	})

mongoose.model('Orders', OrdersSchema)

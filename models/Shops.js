const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShopsSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'Products'
	}],
	bank: {
		name: String,
		accountNumber: String,
		accountName: String
	},
	deliveryPrices: [{
		state: String,
		price: Number,
		time: String,
	}],
	address: String,
	isRegisteredBusiness: {
		default: false,
		type: Boolean,
	},
	reviews: [{
		ref: 'Reviews',
		type: Schema.Types.ObjectId
	}],
	overallRating: {
		type: Number,
		default: 0
	},
	isDeleted: {
		default: false,
		type: Boolean
	},
	isBlocked: {
		default: false,
		type: Boolean
	}
}, {
		timestamps: true
	});

module.exports = mongoose.model('Shops', ShopsSchema) 

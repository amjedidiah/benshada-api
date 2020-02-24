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
	policies: {
		type: String,
		required: true,
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
	categories: [{
		type: String,
		enum: ['bags', 'clothes', 'shoes', 'accessories']
	}],
	deliveryOptions: [{
		type: String,
	}],
	isDeleted: {
		default: false,
		type: Boolean
	},
}, {
		timestamps: true
	});

module.exports = mongoose.model('Shops', ShopsSchema) 

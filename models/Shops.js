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
	state: String,
	phone: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'Products'
	}],
	image: String,
	bank: {
		name: String,
		accountNumber: String,
		accountName: String
	},
	address: String,
	CACNumber: String,
    returns: {
      type: Number,
      default: 0,
    },
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

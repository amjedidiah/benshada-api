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
	isDeleted: {
		default: false,
		type: Boolean
	},
}, {
		timestamps: true
	});

module.exports = mongoose.model('Shops', ShopsSchema) 

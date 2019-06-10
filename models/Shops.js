const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShopsSchema = new Schema({
	name: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users'
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

mongoose.model('Shops', ShopsSchema) 

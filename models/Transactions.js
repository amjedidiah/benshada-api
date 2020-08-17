const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionsSchema = new Schema({
	amount: {
		type: Number,
		required: true
	},
	description: String,
	trxnRef: {
		type: String,
		required: true
	},
	type: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	isDeleted: {
		default: false,
		type: Boolean
	},
}, {
		timestamps: true
	});

module.exports = mongoose.model('Transactions', TransactionsSchema) 

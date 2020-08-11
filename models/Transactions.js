const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionsSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	trxnRef: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
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

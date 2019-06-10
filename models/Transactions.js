const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionsSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users'
	},
	trxnRef: String,
	amount: Number,
	isDeleted: {
		default: false,
		type: Boolean
	},
}, {
		timestamps: true
	});

module.exports = mongoose.model('Transactions', TransactionsSchema) 

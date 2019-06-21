const mongoose = require('mongoose')

const { Schema } = mongoose

const PostsSchema = new Schema({
	user: {
		ref: 'Users',
		type: Schema.Types.ObjectId
	},
	image: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	datePosted: {
		type: Date,
		default: new Date()
	},
	isDeleted: {
		default: false,
		type: Boolean
	},
}, {
		timestamps: true
	})

module.exports = mongoose.model('Posts', PostsSchema)

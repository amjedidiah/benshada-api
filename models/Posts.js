const mongoose = require('mongoose')

const { Schema } = mongoose

const PostsSchema = new Schema({
	user: {
		ref: 'Users',
		type: Schema.Types.ObjectId
	},
	title: String,
	description: String,
	isDeleted: {
		default: false,
		type: Boolean
	},
}, {
		timestamps: true
	})

module.exports = mongoose.model('Posts', PostsSchema)

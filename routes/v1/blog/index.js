const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const auth = require('../../auth')
const Posts = require('../../../models/Posts')

router.get('/', auth.optional, (req, res) => {
	return Posts.find({ ...req.query, isDeleted: false })
		.populate('user', '_id name')
		.then(data => res.status(200).send({
			data,
			message: 'Posts fetched successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.post('/', auth.required, (req, res) => {
	let data = req.body;
	const { image, title, description, user } = data
	const dest = path.join(__dirname, '../../../public/uploads')
	console.warn(dest)

	const upload = multer({
		dest
	})

	if (!image || !title || !description || !user) res.status(500).send({
		data: null,
		message: 'Incomplete data',
		error: true
	})

	// upload.single('image', (request, response) => {
	// 	const tempPath = request.file.path
	// 	const fileName = request.file.originalname
	// 	const targetPath = path.join(__dirname, `../../../public/uploads/${filename}`)
	// 	const acceptedFormats = ['png', 'jpeg', 'jpg']

	// 	if (!acceptedFormats.includes(path.extname(req.file.originalname).toLowerCase())) {
	// 		fs.rename(tempPath, targetPath, err => {
	// 			if (err) res.status(500).send({
	// 				data: null,
	// 				message: err,
	// 				error: true
	// 			})

	// 			data.image = targetPath

				return new Posts({ ...data })
					.save()
					.then(data => res.status(200).send({
						data,
						message: 'Post added successfully',
						error: false
					}))
					.catch(err => res.status(500).send({
						data: null,
						message: err,
						error: true
					}))
			// });
	// 	} else {
	// 		fs.unlink(tempPath, err => {
	// 			if (err) res.status(500).send({
	// 				data: null,
	// 				message: err,
	// 				error: true
	// 			})

	// 			res.status(500).send({
	// 				data: null,
	// 				message: 'Image is in incorrect format',
	// 				error: true
	// 			})
	// 		});
	// 	}
	// })
})

router.get('/:id', auth.optional, (req, res) => {
	const { id } = req.params

	return Posts.findById(id)
		.populate('user', '_id name')
		.then(data => {
			if (data === null) res.status(404).send({
				data,
				message: 'Post not found',
				error: true
			})

			res.status(200).send({
				data: data,
				message: 'Post fetched successfully',
				error: false
			})
		})
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.put('/:id', auth.required, (req, res) => {
	const { id } = req.params

	return Posts.findByIdAndUpdate(id, { ...req.body }, { upsert: false })
		.then(() => res.status(200).send({
			data: null,
			message: 'Post updated successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

router.delete('/:id', auth.required, (req, res) => {
	const { id } = req.params

	return Posts.findByIdAndUpdate(id, { isDeleted: true }, { upsert: false })
		.then(() => res.status(200).send({
			data: null,
			message: 'Post deleted successfully',
			error: false
		}))
		.catch(err => res.status(500).send({
			data: null,
			message: err,
			error: true
		}))
})

module.exports = router

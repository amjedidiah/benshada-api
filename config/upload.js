const cloudinary = require('cloudinary');

const upload = (req, res, next) => {
  try {
    console.log(req.files)

    if (!req.files) {
      // return res.status(400).send({
      //   data: null,
      //   message: 'Image is required',
      //   error: true
      // })
      return next()
    } else {
      const values = Object.values(req.files);
      const promises = values.map((file) => cloudinary.uploader.upload(file.path));

      Promise
        .all(promises)
        .then(async (files) => {
          const media = await files.map((file) => file.secure_url);
          req.data = {
            ...req.data,
            image: media,
          };

          return next();
        })
        .catch((err) => res.status(500).send({
          data: null,
          message: err.message,
          error: true
        }));
    }
  } catch (err) {
    return res.status(500).send({
      data: null,
      message: err.message,
      error: true
    })
  }
}

module.exports = upload

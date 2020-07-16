const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  type: {
    default: 'user',
    type: String
  },
  gender: {
    type: String,
    enum: ["male", "female", "unisex"],
  },
  bio: String,
  image: String,
  address: String,
  street: String,
  city: String,
  state: String,
  country: String,
  banks: [{
    name: String,
    accountNumber: String,
    accountName: String
  }],
  availableBalance: {
    type: Number,
    default: 0,
  },
  categories: [String],
  shops: [{ 
    ref: 'Shops',
    type: Schema.Types.ObjectId
  }],
  saved: [{
    ref: 'Products',
    type: Schema.Types.ObjectId
  }],
  cart: [{
    ref: 'Products',
    type: Schema.Types.ObjectId
  }],
  cards: [{
    cvv: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  }],
  hash: String,
  salt: String,
  isDeleted: {
    default: false,
    type: Boolean
  },
  isVerified: {
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

UsersSchema.methods.getPassword = function (password) {
  return {
    salt: crypto.randomBytes(16).toString('hex'),
    hash: crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  }
};

UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
    type: this.type,
    address: this.address,
    city: this.city,
    state: this.state,
    image: this.image,
    token: this.generateJWT(),
    saved: this.saved,
    cart: this.cart,
    shops: this.shops,
  };
};

module.exports = mongoose.model('Users', UsersSchema);

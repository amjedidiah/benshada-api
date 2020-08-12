const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrdersSchema = new Schema(
  {
    count: Number,
    deliveryPackage: {
      ref: "DeliveryPackages",
      type: Schema.Types.ObjectId,
    },
    details: {
      address: String,
      name: String,
      phone: String,
      state: String,
    },
    isDeleted: {
      default: false,
      type: Boolean,
    },
    orderNumber: Number,
    product: {
      ref: "Products",
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      default: "unpaid",
      enum: ['unpaid', "paid", 'shipped', 'arrived','transported','delivered', 'picked']
    },
    totalPrice: Number,
    transaction: {
      ref: "Transactions",
      type: Schema.Types.ObjectId,
    },
    user: {
      ref: "Users",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", OrdersSchema);

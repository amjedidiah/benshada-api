const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrdersSchema = new Schema(
  {
    user: {
      ref: "Users",
      type: Schema.Types.ObjectId,
    },
    products: [
      {
        ref: "Products",
        type: Schema.Types.ObjectId,
      },
    ],
    transaction: {
      ref: "Transactions",
      type: Schema.Types.ObjectId,
    },
    totalPrice: Number,
    deliveryPackage: {
      ref: "DeliveryPackages",
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      default: "unpaid",
    },
    isDeleted: {
      default: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", OrdersSchema);

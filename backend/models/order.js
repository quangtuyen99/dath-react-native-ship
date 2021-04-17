const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      // Liên kết với id orderItem
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItems",
      required: true,
    },
  ],
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    // Liên kết với id orderItem
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrder: {
    type: Date,
    default: Date.now,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timeStart: {
    type: String,
    required: true,
  },
  timeEnd: {
    type: String,
    required: true,
  },
});

exports.Order = mongoose.model("Order", orderSchema);

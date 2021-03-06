const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({

  owner: {

    type: mongoose.Schema.Types.ObjectId,

    required: true,

    ref: 'User'

  },

  items: [

    {

      productID: {

        type: String

      },

      name: String,

      quantity: {

        type: Number,

        required: true,

        min: 1,

        default: 1

      },

      price: Number

    }

  ],

}, { timestamps: true })

// Order Model
const Order = mongoose.model('Order', orderSchema)

module.exports = Order

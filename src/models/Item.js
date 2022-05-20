const mongoose = require('mongoose')


const itemSchema = new mongoose.Schema({

  owner: {

    type: mongoose.Schema.Types.ObjectId,

    required: true,

    ref: 'User'

  },

  title: {

    type: String,

    required: true,

    trim: true,

  },

  category: {

    type: String,

    required: true,

    trim: true,

  },

  description: {

    type: String,

    trim: true,

    required: true,

  },

  price: {

    type: Number,

    min: 1

  },

  pictures: [

    {

      image: {

        type: Buffer

      }

    }

  ],

}, { timestamps: true })

// Item Model
const Item = mongoose.model('Item', itemSchema)

module.exports = Item

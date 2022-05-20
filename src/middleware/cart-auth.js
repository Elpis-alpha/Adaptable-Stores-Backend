const Cart = require('../models/Cart')

const { errorJson } = require('./errors')

const authCart = async (req, res, next) => {

  try {

    const _id = req.query._id

    const cart = await Cart.find({ _id, owner: req.user._id })

    if (!cart) return errorJson(res, 404)

    req.cart = cart

    next()

  } catch (error) {

    return errorJson(res, 404)

  }

}

module.exports = authCart
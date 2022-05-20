const Order = require('../models/Order')

const { errorJson } = require('./errors')

const authOrder = async (req, res, next) => {

  try {

    const order = await Order.find({ owner: req.user._id }).sort({ createdAt: -1 })

    if (!order) return errorJson(res, 404)

    req.order = order

    next()

  } catch (error) {

    return errorJson(res, 404)

  }

}

module.exports = authOrder
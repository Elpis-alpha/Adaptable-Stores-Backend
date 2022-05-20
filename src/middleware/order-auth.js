const Order = require('../models/Order')

const { errorJson } = require('./errors')

const authOrder = async (req, res, next) => {

  try {

    const _id = req.query._id

    const order = await Order.find({ _id, owner: req.user._id })

    if (!order) return errorJson(res, 404)

    req.order = order

    next()

  } catch (error) {

    return errorJson(res, 404)

  }

}

module.exports = authOrder
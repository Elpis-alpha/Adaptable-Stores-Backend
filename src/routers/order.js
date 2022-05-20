const express = require('express')

const auth = require('../middleware/auth')

const orderAuth = require('../middleware/order-auth')

const { errorJson } = require('../middleware/errors')

const router = new express.Router()


// Sends get request to get a order
router.get('/api/order/get', auth, orderAuth, async (req, res) => {

  res.send(req.order)

})


// Sends post request to add item to order
router.post('/api/order/add', auth, orderAuth, async (req, res) => {

  try {

    const order = req.order

    order.items.push({ ...req.body })

    await order.save()

    res.status(200).send(order)

  } catch (error) {

    return errorJson(res, 500)

  }

})


module.exports = router

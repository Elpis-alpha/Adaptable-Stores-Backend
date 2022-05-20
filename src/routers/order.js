const express = require('express')

const stripe = require('stripe')(process.env.STRIPE_API_KEY)

const auth = require('../middleware/auth')

const orderAuth = require('../middleware/order-auth')

const { errorJson } = require('../middleware/errors')

const cartAuth = require('../middleware/cart-auth')
const Item = require('../models/Item')
const Order = require('../models/Order')

const router = new express.Router()


// Sends get request to get a order
router.get('/api/order/get', auth, orderAuth, async (req, res) => {

  res.send(req.order)

})


// Sends post request to add item to order
router.post('/api/order/add', auth, cartAuth, async (req, res) => {

  try {

    const cart = req.cart

    const user = req.user

    const { source } = req.body

    const email = user.email

    let amount = 0

    const orderItems = []

    for (const item of cart.items) {

      const product = await Item.findOne({ _id: item.productID })

      orderItems.push({

        productID: product._id,

        name: product.title,

        quantity: item.quantity,

        price: product.price

      })

      amount += (product.price * item.quantity)

    }

    console.log(amount);

    if (cart.items.length > 0) {

      const charge = await stripe.charge.create({

        amount, currency: "usd",

        source, receipt_email: email

      })

      if (!charge) throw new Error('bats-payment')

      if (charge) {

        const order = await Order.create({

          owner: user._id, items: orderItems

        })

        cart.items = []

        await cart.save()

        return res.status(200).send(order)

      }

    } else {

      return errorJson(res, 500)

    }

  } catch (error) {

    return errorJson(res, 500)

  }

})


module.exports = router

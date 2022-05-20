const express = require('express')

const auth = require('../middleware/auth')

const cartAuth = require('../middleware/cart-auth')

const { errorJson } = require('../middleware/errors')

const Item = require('../models/Item')

const router = new express.Router()


// Sends get request to get a cart
router.get('/api/cart/get', auth, cartAuth, async (req, res) => {

  res.send(req.cart)

})


// Sends post request to add item to cart
router.post('/api/cart/add', auth, cartAuth, async (req, res) => {

  try {

    // ? req.body = {_id, qty}

    const cart = req.cart

    const { _id, qty } = req.body

    const item = await Item.find({ _id })

    if (!item) return res.status(404).send()

    const uItem = cart.items.find(itemX => item._id === itemX.productID)

    if (uItem) {

      uItem.quantity = uItem.quantity + qty

    } else {

      cart.items.push({

        productID: _id,

        name: item.title,

        quantity: qty

      })

    }

    await cart.save()

    res.status(200).send(cart)

  } catch (error) {

    return errorJson(res, 500)

  }

})


// Sends delete request to remove item from cart
router.delete('/api/cart/remove', auth, cartAuth, async (req, res) => {

  const _id = req.query._id

  try {

    const cart = req.cart

    cart.items = cart.items.filter(item => item.productID !== _id)

    await cart.save()

    res.send(cart)

  } catch (error) {

    return errorJson(res, 500)

  }

})


module.exports = router

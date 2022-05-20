const express = require('express')

const auth = require('../middleware/auth')

const cartAuth = require('../middleware/cart-auth')

const { errorJson } = require('../middleware/errors')

const router = new express.Router()


// Sends get request to get a cart
router.get('/api/cart/get', auth, cartAuth, async (req, res) => {

  res.send(req.cart)

})


// Sends post request to add item to cart
router.post('/api/cart/add', auth, cartAuth, async (req, res) => {

  try {

    const cart = req.cart

    cart.items.push({ ...req.body })

    await cart.save()

    res.status(200).send(cart)

  } catch (error) {

    return errorJson(res, 500)

  }

})


// Sends delete request to remove item from cart
router.delete('/api/cart/remove', auth, cartAuth, async (req, res) => {

  const _id = req.query._itemID

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

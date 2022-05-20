const express = require('express')

const Item = require('../models/Item')

const { errorJson } = require('../middleware/errors')

const itemAuth = require('../middleware/item-auth')

const router = new express.Router()


// Sends post request to create items
router.post('/api/items/create', itemAuth, async (req, res) => {

  const newItem = new Item(req.body)
  
  try {

    await newItem.save()

    res.status(201).send(newItem)

  } catch (error) {

    return errorJson(res, 400)

  }

})


// Sends get request to get all items
router.get('/api/items/get-all', async (req, res) => {

  const sort = {}

  if (req.query.sortBy) {

    const query = req.query.sortBy.split(':')

    query[1] = query[1] === 'asc' ? 1 : -1

    sort[query[0]] = query[1]

  }

  try {

    await Item.find({}, {

      limit: parseInt(req.query.limit),

      skip: parseInt(req.query.skip),

      sort

    })

    res.send(req.user.items)

  } catch (error) {

    return errorJson(res, 500)

  }

})


// Sends get request to get a specific item
router.get('/api/items/get', async (req, res) => {

  const _id = req.query._id

  try {

    const item = await Item.find({ _id })

    if (!item) return res.status(404).send()

    res.send(item)

  } catch (error) {

    return errorJson(res, 404)

  }

})


// Sends patch request to update items
router.patch('/api/items/update', itemAuth, async (req, res) => {

  const _id = req.query._id

  const updates = Object.keys(req.body)

  const allowedUpdate = ['title', 'description', 'category', 'price']

  const isValidOp = updates.every(item => allowedUpdate.includes(item))

  if (!isValidOp) return res.status(400).send({ error: 'Invalid Updates', allowedUpdates: allowedUpdate })

  try {

    const item = await Item.findOne({ _id, owner: req.user._id })

    updates.forEach(item => item[item] = req.body[item])

    await item.save()

    if (!item) return errorJson(res, 404)

    res.status(201).send(item)

  } catch (error) {

    return errorJson(res, 500)

  }

})


// Sends delete request to delete items
router.delete('/api/items/delete', itemAuth, async (req, res) => {

  const _id = req.query._id

  try {

    const item = await Item.findOneAndDelete({ _id })

    if (!item) return errorJson(res, 404)

    res.send(item)

  } catch (error) {

    return errorJson(res, 500)

  }

})


module.exports = router

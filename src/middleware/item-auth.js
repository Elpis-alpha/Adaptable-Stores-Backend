const itemAuth = async (req, res, next) => {
  
  if (req.query.item_password !== process.env.ITEM_PASSWORD) return errorJson(res, 401)
  
  next()

}

module.exports = itemAuth
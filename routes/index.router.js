const Router = require('express')
const userRouter = require("./user.router");
const todoRouter = require("./todo.router");
const router = new Router()

router.get('/', (req, res) => {
  return res.json({
    "message": "hello"
  })
})
router.use('/api/user', userRouter)
router.use('/api/todo', todoRouter)

module.exports = router
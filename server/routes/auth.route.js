const {Router} = require ('express')
const authController = require('../controller/auth.controller')
const { protect } = require('../middleware/middleware')
const route = Router()

route.post('/reg',authController.registerUser)
route.post('/login',authController.loginUser)
route.get('/view',authController.getUserProfile)
route.get('/viewUserProfile',protect,authController.userProfile)
route.delete('/delete/:id',protect,authController.deleteUser)
route.put('/update/:userId',authController.updateUser)

module.exports = route;
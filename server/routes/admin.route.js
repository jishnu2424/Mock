const {Router} = require ('express')
const adminController = require('../controller/admin.controller')
const {  admin } = require('../middleware/middleware')
const route = Router()

route.get('/view',admin,adminController.getAllUsers)
route.delete('/delete/:id',admin,adminController.deleteUser)

module.exports = route;
const {Router} = require ('express')
const eventController = require('../controller/event.controller')
const { protect } = require('../middleware/middleware')
const route = Router()

route.post('/create',protect,eventController.createEvent)
route.delete('/delete/:eventId',protect,eventController.deleteEvent)
route.put('/update/:eventId',protect,eventController.updateEvent)
route.get('/view',eventController.viewEvents)

module.exports = route;
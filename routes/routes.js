module.exports = function(app) {
	var controller = require('../controllers/controller')
	app.route('/')
		.get(controller.get_trains)
    .post(controller.post_trains)
}
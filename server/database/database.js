
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/napchart')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))


var Chart = require('./models/Chart')

module.exports = {
  createChart: function (data, callback) {
    var chart = new Chart(data)

    chart.save(function (err, response) {
    	setTimeout(function() {

      callback(err, response)
    	})
    })
  },

  getChart: function (chartid, callback) {
    Chart.findOne({id: chartid}, callback)
  }
}

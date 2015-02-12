var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');

app.route('/about')
.get(function(req, res) {
  res.render('about', { title: 'Quienes somos' });
});
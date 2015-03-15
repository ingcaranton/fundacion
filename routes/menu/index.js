var express = require('express');
var app = module.exports = express();
var crudPagina = require("./crud");

app.set('views', __dirname + '/views');
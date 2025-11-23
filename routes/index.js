var express = require('express');
var router = express.Router();
var dataService = require('../data/dataService')

/* GET home page. */
router.get('/', function(req, res, next) {
    const peliculas = dataService.findAllFilms()
    res.render('index', { title: 'MiCineteca- tu colección personal de películas', films : peliculas });
});

/*Ruta página contacto*/
router.get('/contact',function(req,res,next){
    res.render('contact')
});

/*Ruta página login*/
router.get('/login',function(req,res,next){
    res.render('login')
})


module.exports = router;
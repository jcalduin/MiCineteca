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

/*Ruta para detalle de películas*/
router.get('/film/:id', function(req, res, next) {
    const filmId = req.params.id
    let filmDetails;

    const userId = req.session.userId
    

    if(!req.session.isLogged){
        
        filmDetails = dataService.findFilmById(filmId)

    } else {

        filmDetails = dataService.findFilmDetailsForUser(filmId, userId)

        if (!filmDetails){
            filmDetails = dataService.findFilmById(filmId)
        }
        
    }

    res.render('filmDetails', { film: filmDetails, isLogged: req.session.isLogged});

});


module.exports = router;
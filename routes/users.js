var express = require('express');
var router = express.Router();
var dataService = require('../data/dataService')

/*Ruta página login*/
router.get('/login',function(req,res,next){
    res.render('login')
})

/*ruta para procesar el login*/
router.post('/login', function(req,res,next){
    const usermail = req.body.mail
    const password = req.body.password

    const validationResult = dataService.validateUserLogin(usermail,password)

    if (validationResult.error) { 
        //si me devuelve el objeto error imprimo un console y redirijo e pagina de login
        console.log('Intento de login fallido para el correo:',usermail)
        res.render('login', {error : validationResult.error})

    } else { 
        //usuario encontrado
        req.session.isLogged = true
        req.session.userMail = validationResult.usermail
        req.session.userId = validationResult.userId

        console.log(`usuario ${validationResult.userId} autenticado`)
        res.redirect('/myCollection')
    }
})

/*Ruta pagina de coleccion del usuario*/
router.get('/myCollection',function(req,res,next){
    
    if (!req.session.isLogged){
        return res.redirect('/login')
    }

    const userId = req.session.userId
    const userCollection = dataService.findFilmsByUser(userId)

    res.render('myCollection', { films: userCollection })
}) 

/*Ruta para cerrar sesion*/
router.get('/logout', function(req,res,next){

    req.session.destroy(err => {  //destruyo la sesion
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
    })
    
    res.clearCookie('connect.sid') //elimino la cookie de sesion en el navegador
    res.redirect('/') //redirecciono a la pagina principal
}) 


module.exports = router;

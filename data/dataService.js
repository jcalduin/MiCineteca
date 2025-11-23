const path = require('path') //modulo para construir rutas de archivos y carpetas
const fs = require('fs') //modulo para leer y escribir archivos en node.js

const filmsPath = path.join(__dirname,'films.json') //Indico la ruta absoluta para llegar al archivo films.json
const films = JSON.parse(fs.readFileSync(filmsPath,'utf8')) //como es un json uso el metodo de js para pasar de formato json a un formato legible, lo que hace mi variable films es leer basicamente el json sin hacer ninguna accion ni nada similar

function findAllFilms() { //funcion que devuelve el array con todas las peliculas del archivo .json
    return films
}

function findFilmsBySoporte(soporte) {
    let filters = films.filter(film => film.soporte === "DVD")
    return filters
}

function findFilmById(id) {
    return films.find(film => film.id === parseInt(id))
}

//hago que este archivo sea 'exportable' a otros archivos y puedan ser usados
module.exports = { 
    findAllFilms,
    findFilmsBySoporte,
    findFilmById
}
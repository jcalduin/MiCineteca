const path = require('path') //modulo para construir rutas de archivos y carpetas
const fs = require('fs') //modulo para leer y escribir archivos en node.js

const filmsPath = path.join(__dirname,'films.json') //Indico la ruta absoluta para llegar al archivo films.json
const films = JSON.parse(fs.readFileSync(filmsPath,'utf8')) //como es un json uso el metodo de js para pasar de formato json a un formato legible, lo que hace mi variable films es leer basicamente el json sin hacer ninguna accion ni nada similar

const usersPath = path.join(__dirname,'users.json')
const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'))

//devolver todo el array de peliculas
function findAllFilms() { //funcion que devuelve el array con todas las peliculas del archivo .json
    return films
}

//validar el login de usuario con mail y password
function validateUserLogin(email, password){
    let userFound = users.find(user => user.usermail == email) //entiendo que en mi aplicacion cada mail es único

    if (!userFound){
        return {error : 'El mail o contraseña no son correctos'}
    } else {
        if (userFound.password == password){
            return userFound
        } else {
            return {error : 'El mail o contraseña no son correctos'}
        }
    }
}

//devolver una lista de copias de peliculas que pertenezcan a un usuario
function findUserCopies(userId){
    const user = users.find(user => user.userId == userId) //devuelvo el objeto usuario completo

    if (!user){
        return [] //si no encuentro el usuario devuelvo un array vacio
    }

    return user.copias //devuelvo el array de copias del usuario
}

//devolver una lista de peliculas que pertenezcan a un usuario
function findFilmsByUser(userId){
    const userCopies = findUserCopies(userId) //obtengo el array de copias del usuario

    const collectionDetails = userCopies.map(copy => {
        const filmDetails = films.find(film => film.id == copy.id_pelicula) //busco los detalles de la pelicula en el array films

        if (filmDetails){
            return {
                ...copy,
                ...filmDetails
            }
        }

        return copy; //si no encuentro la pelicula devuelvo solo la copia
    })

    return collectionDetails; //devuelvo el array con los detalles de las peliculas
}

/*devolver las peliculas con sus detalles*/
function findFilmById(filmId){
    const filmDetails = films.find(film => film.id == filmId) //busco los detalles de la pelicula en el array films
    return filmDetails;
}

/*encontrar todos los detalles de una pelicula de un usuario registrado*/
function findFilmDetailsForUser(filmId, userId){
    const userCopies = findUserCopies(userId) //obtengo el array de copias del usuario
    const userCopy = userCopies.find(copy => copy.id_pelicula == filmId) //busco la copia concreta del usuario

    if (!userCopy){
        return null //si no encuentro la copia del usuario devuelvo null
    }

    const filmDetail = films.find(film => film.id == filmId) //busco los detalles de la pelicula en el array films

    if (!filmDetail){
        return null //si no encuentro la pelicula devuelvo null
    }

    return {
        ...userCopy,
        ...filmDetail
    }   
}

//hago que este archivo sea 'exportable' a otros archivos y puedan ser usados
module.exports = { 
    findAllFilms,
    validateUserLogin,
    findFilmsByUser,
    findFilmById,
    findFilmDetailsForUser
}
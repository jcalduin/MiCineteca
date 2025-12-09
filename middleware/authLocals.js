/** Código que se ejecutara en cada solicitud HTTP, es decir:
 * preparo datos globales que luego podre usar en las distintas vistas EJS
 * res.locals es un objeto que express a añade a res en cada solicitud, la vida útil es de una única solicitud,
 * por eso se ejecuta cada vez que llega una solicitud, para validar la variables globales que necesitamos
*/

const authLocals = (req,res,next) => {

    if (req.session.isLogged){

        res.locals.isLoggedIn = true
        res.locals.userMail = req.session.userMail
        res.locals.userId = req.session.userId

    } else {

        res.locals.isLoggedIn = false
        res.locals.userMail = null
        res.locals.userId = null

    }
    // 👇 Comentario de recordatorio
    next() //es como pasar el testigo a la siguiente funcion o ruta que se vaya a ejecutar
}



module.exports = authLocals
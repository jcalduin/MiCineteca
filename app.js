var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var authLocals = require('./middleware/authLocals')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configuracion del middleware de sesiones
app.use(session({ //a cada peticion del servidor usa esta funcion // session: para poder guardar datos de usuario haciendo req.session.userId=...
  secret : 'clave-secreta-cambiar-mas-adelante', //para firmar criptograficamente el ID de sesion
  resave: false, //siginifica que no se guarde la sesion si no ha habido cambios
  saveUninitialized: false, //significa que no se guarde una sesion vacia
  cookie: {maxAge : 1000*60*60*24} //tiempo de vida de la cookie en milisegundos (aqui 1 dia)
}))

app.use(authLocals) // 🔑 Conexión del Middleware de Variables Locales (DEBE ir después de 'session')

//redireccion rutas
app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

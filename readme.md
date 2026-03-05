# MiCineteca

Aplicacion web para gestionar una coleccion personal de peliculas. Permite explorar el catalogo, autenticarse, consultar una coleccion asociada al usuario y ver el detalle de cada titulo con informacion contextual de la copia cuando hay sesion iniciada.

## Demo

Despliegue en Render:

https://micineteca.onrender.com

## Objetivo del proyecto

`MiCineteca` nace como practica/reto de la asignatura de Interfaces Web, enfocada en construir una aplicacion MVC server-side con Express y EJS, aplicando:

- Enrutado y composicion de vistas.
- Gestion de sesiones y control de acceso basico.
- Consumo de datos desde ficheros JSON.
- Separacion por capas (rutas, middleware, servicios de datos, vistas y recursos estaticos).

## Tecnologias utilizadas

- `Node.js` (runtime JavaScript en servidor).
- `Express 4` (framework web).
- `EJS` (motor de plantillas para renderizado server-side).
- `express-session` (manejo de sesion de usuario).
- `Morgan` (logging HTTP en desarrollo).
- `cookie-parser` (lectura de cookies).
- `http-errors` (gestion de errores HTTP).
- `HTML + CSS + JavaScript` en capa de presentacion.
- Datos persistidos en ficheros JSON (`data/films.json` y `data/users.json`).

## Funcionalidades principales

- Home con listado de peliculas.
- Vista de detalle por pelicula (`/film/:id`).
- Login de usuario (`/login`) validando email y password.
- Coleccion privada del usuario autenticado (`/myCollection`).
- Cierre de sesion (`/logout`).
- Pagina de contacto (`/contact`).
- Middleware global que expone estado de autenticacion a las vistas (`res.locals`).

## Arquitectura del proyecto

- `app.js`: configuracion principal de Express, middlewares, sesiones y rutas.
- `routes/`: controladores HTTP (`index.js`, `users.js`).
- `data/dataService.js`: capa de acceso y transformacion de datos.
- `middleware/authLocals.js`: variables de sesion para vistas.
- `views/`: plantillas EJS y parciales reutilizables.
- `public/`: recursos estaticos (CSS, JS cliente, imagenes).
- `bin/www`: punto de arranque del servidor.

## Requisitos

- `Node.js` 18+ recomendado.
- `npm` 9+ recomendado.

## Instalacion y ejecucion local

1. Clonar el repositorio.
2. Instalar dependencias:

```bash
npm install
```

3. Iniciar la aplicacion:

```bash
npm start
```

4. Abrir en navegador:

```text
http://localhost:3000
```

Si el puerto `3000` esta ocupado, puedes lanzar en otro puerto:

```bash
PORT=3011 npm start
```

## Script disponible

- `npm start`: arranca el servidor con `node ./bin/www`.

## Notas tecnicas

- La aplicacion usa datos locales en JSON, por lo que no requiere base de datos para ejecutarse.
- El acceso a rutas privadas se basa en sesion (`req.session.isLogged`).
- Los detalles de pelicula se enriquecen con informacion de la copia del usuario cuando corresponde.

## Posibles mejoras

- Hash de contrasenas (por ejemplo, `bcrypt`) y validaciones de seguridad adicionales.
- Migracion de JSON a base de datos relacional o documental.
- Tests automatizados (unitarios e integracion).
- Variables de entorno para secretos y configuracion.
- Dockerizacion y pipeline CI/CD.

## Autor

Proyecto disponible en GitHub:

https://github.com/jcalduin/MiCineteca

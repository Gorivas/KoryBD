
const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const config = require("../config");
const controlador = require("./controladorProducto");
const multer = require("multer");

const ficherosEstaticos = path.join(__dirname, "public");
const multerFactory = multer({ storage: multer.memoryStorage() });

router.use(express.static(ficherosEstaticos));
router.use(bodyParser.urlencoded({extended:true}));

//sesiones

const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({
    host: config.mysqlConfig.host,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
 });

 const middlewareSession = session({
    saveUninitialized: false,
    secret: "kory",
    resave: false,
    store: sessionStore
    });
router.use(middlewareSession);

function identificacionRequerida(request, response, next) {
    if (request.session.usuario != undefined) {
        response.locals.usuario = request.session.usuario;
        next();
    } else {
        response.redirect("/producto/login");
    }
}
    

router.get("/inicio", controlador.inicio);

router.get("/ofertas", controlador.ofertas );

router.get("/arte", controlador.arte );

router.get("/oficina", controlador.oficina );

router.get("/escolar", controlador.escolar );

router.get("/libros", controlador.libros );

router.get("/temporada", controlador.temporada );

router.get("/informatica", controlador.informatica );

router.get("/lettering", controlador.lettering);

router.get("/buscar", controlador.abrirBuscar );

router.get("/login", controlador.abrirLogin );

router.get("/logout",identificacionRequerida, controlador.logout );

router.post("/buscar", controlador.buscar);

router.get("/crear",identificacionRequerida, controlador.abrirCrear);

router.post("/crear", identificacionRequerida, multerFactory.single("imagen") ,controlador.crear);

router.post("/login", controlador.login);

router.get("/imagen/:id", controlador.imagen);

router.get("/producto/:id", controlador.producto);

router.get("/borrar/:id",identificacionRequerida, controlador.borrar);

router.get("/modificar/:id",identificacionRequerida, controlador.abrirModificar);

router.post("/modificar",identificacionRequerida,multerFactory.single("imagen"), controlador.modificar);

module.exports = router;
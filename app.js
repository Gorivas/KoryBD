"use strict";

const path = require("path");
const express = require("express");
const app = express();
const producto = require("./routers/routerProducto");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const ficherosEstaticos = path.join(__dirname, "public");

app.use(express.static(ficherosEstaticos));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/producto", producto);

//sesiones

const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "korydb"
 });

 const middlewareSession = session({
    saveUninitialized: false,
    secret: "kory",
    resave: false,
    store: sessionStore
    });
app.use(middlewareSession);

app.get("/contacto", function(request, response){
    response.status(200);
    response.render("contacto", {usuario: request.session.usuario});
});

app.get("/", function(request, response){
    response.status(200);
    response.redirect("/producto/inicio");
});



app.use(function(request, response, next) {
    response.status(404);
    response.render("404", { 
        url: request.url,
         usuario: request.session.usuario, 
        });
});
    
app.use(function(error, request, response, next) {
    response.status(500);
    console.log(error);
    response.render("500", { 
        usuario: request.session.usuario,
        mensaje: error.message, 
    });
});

app.listen(3000, function(err){
    if(err){
        console.log("No se ha podido iniciar el servidor. Error:" + err.message);
    }
    else{
        console.log("Servidor iniciado en el puerto 3000.La página está operativa.");
    }
});
"use strict"

const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
//const multer = require("multer");
const modelo = require("./modeloProducto");
const config = require("../config");

const controlador = express();

const pool = mysql.createPool(config.mysqlConfig);
//const multerFactory = multer({ storage: multer.memoryStorage() });
const modeloProducto = new modelo(pool);

//Configuramos el motor de plantillas
controlador.set("view engine", "ejs");
//Indicamos donde están las plantillas
controlador.set("views", path.join(__dirname, "../views"));
//Indicamos donde están los ficheros estáticos (el css, etc)
controlador.use(express.static(path.join(__dirname, "../public")));

controlador.use(bodyParser.urlencoded({extended:true}));


function inicio (request, response, next){
    modeloProducto.getProductosDestacados(function(err, res){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                error: err.message
            });
        }
        else{
            let productos = [];
            for(let e of res){
                if(typeof(request.session.usuario) != "undefined"){
                    productos.push({
                        id: e.id,
                        nombre: e.nombre,
                        referenca: e.referenca,
                        marca: e.marca,
                        descripcion: e.descripcion,
                        euros: e.euros,
                        centimos: e.centimos,
                        tipo: e.tipo,
                        visible: e.visible,
                        destacado: e.destacado,
                        imagen: e.imagen
                    });
                }
                else{
                    if(e.visible == 1){
                        productos.push({
                            id: e.id,
                            nombre: e.nombre,
                            referenca: e.referenca,
                            marca: e.marca,
                            descripcion: e.descripcion,
                            euros: e.euros,
                            centimos: e.centimos,
                            tipo: e.tipo,
                            visible: e.visible,
                            destacado: e.destacado,
                            imagen: e.imagen
                        });
                    }
                }
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                titulo:"Artículos destacados",
                error: null,
                productos: productos
            })
        }
    });
}

function ofertas(request, response){
    modeloProducto.getProductosPorTipo("ofertas", function(err, res){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                error: err.message
            });
        }
        else{
            let productos = [];
            for(let e of res){
                if(typeof(request.session.usuario) != "undefined"){
                    productos.push({
                        id: e.id,
                        nombre: e.nombre,
                        referenca: e.referenca,
                        marca: e.marca,
                        descripcion: e.descripcion,
                        euros: e.euros,
                        centimos: e.centimos,
                        tipo: e.tipo,
                        visible: e.visible,
                        destacado: e.destacado,
                        imagen: e.imagen
                    });
                }
                else{
                    if(e.visible == 1){
                        productos.push({
                            id: e.id,
                            nombre: e.nombre,
                            referenca: e.referenca,
                            marca: e.marca,
                            descripcion: e.descripcion,
                            euros: e.euros,
                            centimos: e.centimos,
                            tipo: e.tipo,
                            visible: e.visible,
                            destacado: e.destacado,
                            imagen: e.imagen
                        });
                    }
                }
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                titulo:"Ofertas",
                error: null,
                productos: productos
            })
        }
    });
}

function arte(request, response){
    modeloProducto.getProductosPorTipo("arte", function(err, res){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                error: err.message
            });
        }
        else{
            let productos = [];
            for(let e of res){
                if(typeof(request.session.usuario) != "undefined"){
                    productos.push({
                        id: e.id,
                        nombre: e.nombre,
                        referenca: e.referenca,
                        marca: e.marca,
                        descripcion: e.descripcion,
                        euros: e.euros,
                        centimos: e.centimos,
                        tipo: e.tipo,
                        visible: e.visible,
                        destacado: e.destacado,
                        imagen: e.imagen
                    });
                }
                else{
                    if(e.visible == 1){
                        productos.push({
                            id: e.id,
                            nombre: e.nombre,
                            referenca: e.referenca,
                            marca: e.marca,
                            descripcion: e.descripcion,
                            euros: e.euros,
                            centimos: e.centimos,
                            tipo: e.tipo,
                            visible: e.visible,
                            destacado: e.destacado,
                            imagen: e.imagen
                        });
                    }
                }
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                titulo:"Arte",
                error: null,
                productos: productos
            })
        }
    });
}

function oficina(request, response){
    modeloProducto.getProductosPorTipo("oficina", function(err, res){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                error: err.message
            });
        }
        else{
            let productos = [];
            for(let e of res){
                if(typeof(request.session.usuario) != "undefined"){
                    productos.push({
                        id: e.id,
                        nombre: e.nombre,
                        referenca: e.referenca,
                        marca: e.marca,
                        descripcion: e.descripcion,
                        euros: e.euros,
                        centimos: e.centimos,
                        tipo: e.tipo,
                        visible: e.visible,
                        destacado: e.destacado,
                        imagen: e.imagen
                    });
                }
                else{
                    if(e.visible == 1){
                        productos.push({
                            id: e.id,
                            nombre: e.nombre,
                            referenca: e.referenca,
                            marca: e.marca,
                            descripcion: e.descripcion,
                            euros: e.euros,
                            centimos: e.centimos,
                            tipo: e.tipo,
                            visible: e.visible,
                            destacado: e.destacado,
                            imagen: e.imagen
                        });
                    }
                }
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                titulo:"Oficina",
                error: null,
                productos: productos
            })
        }
    });
}

function escolar(request, response){
    modeloProducto.getProductosPorTipo("escolar", function(err, res){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                error: err.message
            });
        }
        else{
            let productos = [];
            for(let e of res){
                if(typeof(request.session.usuario) != "undefined"){
                    productos.push({
                        id: e.id,
                        nombre: e.nombre,
                        referenca: e.referenca,
                        marca: e.marca,
                        descripcion: e.descripcion,
                        euros: e.euros,
                        centimos: e.centimos,
                        tipo: e.tipo,
                        visible: e.visible,
                        destacado: e.destacado,
                        imagen: e.imagen
                    });
                }
                else{
                    if(e.visible == 1){
                        productos.push({
                            id: e.id,
                            nombre: e.nombre,
                            referenca: e.referenca,
                            marca: e.marca,
                            descripcion: e.descripcion,
                            euros: e.euros,
                            centimos: e.centimos,
                            tipo: e.tipo,
                            visible: e.visible,
                            destacado: e.destacado,
                            imagen: e.imagen
                        });
                    }
                }
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                titulo:"Escolar",
                error: null,
                productos: productos
            })
        }
    });
}

function libros(request, response){
    modeloProducto.getProductosPorTipo("libros", function(err, res){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                error: err.message
            });
        }
        else{
            let productos = [];
            for(let e of res){
                if(typeof(request.session.usuario) != "undefined"){
                    productos.push({
                        id: e.id,
                        nombre: e.nombre,
                        referenca: e.referenca,
                        marca: e.marca,
                        descripcion: e.descripcion,
                        euros: e.euros,
                        centimos: e.centimos,
                        tipo: e.tipo,
                        visible: e.visible,
                        destacado: e.destacado,
                        imagen: e.imagen
                    });
                }
                else{
                    if(e.visible == 1){
                        productos.push({
                            id: e.id,
                            nombre: e.nombre,
                            referenca: e.referenca,
                            marca: e.marca,
                            descripcion: e.descripcion,
                            euros: e.euros,
                            centimos: e.centimos,
                            tipo: e.tipo,
                            visible: e.visible,
                            destacado: e.destacado,
                            imagen: e.imagen
                        });
                    }
                }
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                titulo:"Libros",
                error: null,
                productos: productos
            })
        }
    });
}

function temporada(request, response){
    modeloProducto.getProductosPorTipo("temporada", function(err, res){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                error: err.message
            });
        }
        else{
            let productos = [];
            for(let e of res){
                if(typeof(request.session.usuario) != "undefined"){
                    productos.push({
                        id: e.id,
                        nombre: e.nombre,
                        referenca: e.referenca,
                        marca: e.marca,
                        descripcion: e.descripcion,
                        euros: e.euros,
                        centimos: e.centimos,
                        tipo: e.tipo,
                        visible: e.visible,
                        destacado: e.destacado,
                        imagen: e.imagen
                    });
                }
                else{
                    if(e.visible == 1){
                        productos.push({
                            id: e.id,
                            nombre: e.nombre,
                            referenca: e.referenca,
                            marca: e.marca,
                            descripcion: e.descripcion,
                            euros: e.euros,
                            centimos: e.centimos,
                            tipo: e.tipo,
                            visible: e.visible,
                            destacado: e.destacado,
                            imagen: e.imagen
                        });
                    }
                }
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                titulo:"Temporada",
                error: null,
                productos: productos
            })
        }
    });
}

function informatica(request, response){
    modeloProducto.getProductosPorTipo("informatica", function(err, res){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                error: err.message
            });
        }
        else{
            let productos = [];
            for(let e of res){
                if(typeof(request.session.usuario) != "undefined"){
                    productos.push({
                        id: e.id,
                        nombre: e.nombre,
                        referenca: e.referenca,
                        marca: e.marca,
                        descripcion: e.descripcion,
                        euros: e.euros,
                        centimos: e.centimos,
                        tipo: e.tipo,
                        visible: e.visible,
                        destacado: e.destacado,
                        imagen: e.imagen
                    });
                }
                else{
                    if(e.visible == 1){
                        productos.push({
                            id: e.id,
                            nombre: e.nombre,
                            referenca: e.referenca,
                            marca: e.marca,
                            descripcion: e.descripcion,
                            euros: e.euros,
                            centimos: e.centimos,
                            tipo: e.tipo,
                            visible: e.visible,
                            destacado: e.destacado,
                            imagen: e.imagen
                        });
                    }
                }
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                titulo:"Informatica",
                error: null,
                productos: productos
            })
        }
    });
}

function lettering(request, response){
    modeloProducto.getProductosPorTipo("lettering", function(err, res){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                error: err.message
            });
        }
        else{
            let productos = [];
            for(let e of res){
                if(typeof(request.session.usuario) != "undefined"){
                    productos.push({
                        id: e.id,
                        nombre: e.nombre,
                        referenca: e.referenca,
                        marca: e.marca,
                        descripcion: e.descripcion,
                        euros: e.euros,
                        centimos: e.centimos,
                        tipo: e.tipo,
                        visible: e.visible,
                        destacado: e.destacado,
                        imagen: e.imagen
                    });
                }
                else{
                    if(e.visible == 1){
                        productos.push({
                            id: e.id,
                            nombre: e.nombre,
                            referenca: e.referenca,
                            marca: e.marca,
                            descripcion: e.descripcion,
                            euros: e.euros,
                            centimos: e.centimos,
                            tipo: e.tipo,
                            visible: e.visible,
                            destacado: e.destacado,
                            imagen: e.imagen
                        });
                    }
                }
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                titulo:"Lettering",
                error: null,
                productos: productos
            })
        }
    });
}

function abrirBuscar(request, response){
    response.status(200);
    response.render("buscar",{usuario: request.session.usuario});
}

function buscar(request, response, next){
    let clave = request.body.texto;
    let tipo = "nombre";
    if(request.body.tipo == "Marca"){
        tipo = "marca";
    }
    if(request.body.tipo == "Referencia"){
        tipo = "referencia";
    }

    modeloProducto.buscar(clave,tipo, function(err, res){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                error: err.message
            });
        }
        else{
            let productos = [];
            for(let e of res){
                if(typeof(request.session.usuario) != "undefined"){
                    productos.push({
                        id: e.id,
                        nombre: e.nombre,
                        referenca: e.referenca,
                        marca: e.marca,
                        descripcion: e.descripcion,
                        euros: e.euros,
                        centimos: e.centimos,
                        tipo: e.tipo,
                        visible: e.visible,
                        destacado: e.destacado,
                        imagen: e.imagen
                    });
                }
                else{
                    if(e.visible == 1){
                        productos.push({
                            id: e.id,
                            nombre: e.nombre,
                            referenca: e.referenca,
                            marca: e.marca,
                            descripcion: e.descripcion,
                            euros: e.euros,
                            centimos: e.centimos,
                            tipo: e.tipo,
                            visible: e.visible,
                            destacado: e.destacado,
                            imagen: e.imagen
                        });
                    }
                }
            }
            response.status(200);
            response.render("productos", {
                usuario: request.session.usuario,
                titulo:"Resultados de buscar '" + clave + "'",
                error: null,
                productos: productos
            })
        }
    });
}

function abrirLogin(request, response){
    if (request.session.usuario != undefined) {
        response.redirect("/producto/logout");
    } else {
        response.status(200);
        response.render("login", {
            usuario: request.session.usuario,
            error:null
            });
    }
}

function login(request, response, next){
    modeloProducto.login(request.body.nombre, request.body.pass, function(error, ok){
        if (error== "No se puede conectar a la base de datos.") { // error de acceso a la base de datos
            response.status(500);
            next(error);
        }
        else{
            if(ok){
                request.session.usuario = request.body.nombre;
                response.redirect("/producto/inicio");
            }
            else{
                response.status(200);
                response.render("login", {
                    usuario: request.session.usuario,
                    error: error
                });
            }
        }
            
    });
}

function logout(request, response, next){
    request.session.destroy();
    response.redirect("/producto/inicio");
}

function abrirCrear(request, response){
    response.status(200);
    response.render("crearProducto", {
        usuario: request.session.usuario,
        });
}

function crear(request, response, next){

    let visible = 0;
    let destacado = 0;
    if(request.body.visible == "on"){
        visible = 1;
    }
    if(request.body.destacado == "on"){
        destacado = 1;
    }

    let producto = {
        nombre: request.body.nombre,
        referencia: request.body.referencia,
        marca: request.body.marca,
        descripcion: request.body.descripcion,
        euros: request.body.euros,
        centimos: request.body.centimos,
        tipo: request.body.tipo.toLowerCase(),
        visible: visible,
        destacado: destacado,
    }

    if (request.file) {
        producto.imagen = request.file.buffer;
    }

    modeloProducto.crear(producto, function(err, res){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {  
                titulo:"Error al crear producto",
                usuario: request.session.usuario,     // Error
                error: err.message
            })
        } else {
            response.status(200);
            response.redirect("/producto/producto/"+res.insertId);
        }
    });

}

function imagen(request, response){
    modeloProducto.imagen(request.params.id, function(err, foto){
        if (foto) {
            response.end(foto);
        } else {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(404);
            response.end("Imágen no encontrada");
        }
    });
}

function producto(request, response){
    modeloProducto.producto(request.params.id, function(err, p){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                titulo:"Error",
                usuario: request.session.usuario,  
                error: err.message
            });
        }
        else{
            let producto = p;
            if (request.session.usuario != undefined) {
                response.status(200);
                response.render("producto", {
                    usuario: request.session.usuario,  
                    producto: producto
                });
            }
            else{
                if (producto.visible === 1) {
                    response.status(200);
                    response.render("producto", {
                        usuario: request.session.usuario,  
                        producto: producto
                    });
                }
                else{
                    response.render("productos", {
                        titulo:"Error",
                        usuario: request.session.usuario,  
                        error: "El producto no exsite"
                    });
                }
            }
        }
    });
}

function borrar(request, response){
    modeloProducto.borrar(request.params.id, function(err, p){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                titulo:"Error",
                usuario: request.session.usuario,  
                error: err.message
            });
        }
        else{
            let producto = p;
            response.status(200);
            response.render("productos", {
                titulo:"Producto borrado",
                usuario: request.session.usuario,  
                error: "Producto borrado con éxito"
            })
        }
    });
}

function abrirModificar(request, response){
    modeloProducto.producto(request.params.id, function(err, p){
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                next(err);
            }
            response.status(200);
            response.render("productos", {
                titulo:"Error",
                usuario: request.session.usuario,  
                error: err.message
            });
        }
        else{
            let producto = p;
            response.status(200);
            response.render("modificarProducto", {
                usuario: request.session.usuario,  
                producto: producto
            })
        }
    });
}

function modificar(request, response, next){

    let visible = 0;
    let destacado = 0;
    if(request.body.visible == "on"){
        visible = 1;
    }
    if(request.body.destacado == "on"){
        destacado = 1;
    }

    let producto = {
        id: request.body.id,
        nombre: request.body.nombre,
        referencia: request.body.referencia,
        marca: request.body.marca,
        descripcion: request.body.descripcion,
        euros: request.body.euros,
        centimos: request.body.centimos,
        tipo: request.body.tipo.toLowerCase(),
        visible: visible,
        destacado: destacado,
    }

    if (request.file) {// si hay foto nueva la cojo y modifico
        producto.imagen = request.file.buffer;
        modeloProducto.modificar(producto, function(err, res){
            if (err) {
                if (err.message == "No se puede conectar a la base de datos.") {
                    next(err);
                }
                response.status(200);
                response.render("productos", {  
                    titulo:"Error al modificar producto",
                    usuario: request.session.usuario,     // Error
                    error: err.message
                })
            } else {
                response.status(200);
                response.redirect("/producto/producto/"+request.body.id);
            }
        });
    }
    else{// si no, tengo que llamar a modificar sin cambiar la foto
        modeloProducto.modificarSinFoto(producto, function(err, res){
            if (err) {
                if (err.message == "No se puede conectar a la base de datos.") {
                    next(err);
                }
                response.status(200);
                response.render("productos", {  
                    titulo:"Error al modificar producto",
                    usuario: request.session.usuario,     // Error
                    error: err.message
                })
            } else {
                response.status(200);
                response.redirect("/producto/producto/"+request.body.id);
            }
        });
    }

}

module.exports = {
    inicio: inicio,
    ofertas: ofertas,
    arte: arte,
    oficina: oficina,
    escolar: escolar,
    libros: libros,
    temporada: temporada,
    informatica: informatica,
    lettering: lettering,
    abrirBuscar: abrirBuscar,
    buscar: buscar,
    abrirLogin: abrirLogin,
    login: login,
    logout: logout,
    abrirCrear: abrirCrear,
    crear:crear,
    imagen: imagen,
    producto: producto,
    borrar: borrar,
    abrirModificar: abrirModificar,
    modificar:modificar
};
"use strict";

class modeloProducto {
    constructor(pool) {
        this.pool = pool;
    }

    getProductosPorTipo(tipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = "SELECT * FROM productos WHERE tipo LIKE ?;";
                const valores = ["%" + tipo + "%"];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar productos del tipo " + nombre + "."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    getProductosDestacados( callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = "SELECT * FROM productos WHERE destacado = 1 ;";
                connection.query(sql, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar productos destacados."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    buscar(clave, tipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                let consulta = "SELECT * FROM productos WHERE nombre LIKE ?;";
                if(tipo == "referencia"){
                    consulta = "SELECT * FROM productos WHERE referencia LIKE ?;";
                }
                if(tipo == "marca"){
                    consulta = "SELECT * FROM productos WHERE marca LIKE ?;";
                }
                const sql = consulta; 
                const valores = [ "%" + clave + "%"];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar productos de" + tipo + " " + clave + "."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    login(user,pass, callback) {
        this.pool.getConnection(function(err, con) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."));
            } else {
                const sql = "SELECT * FROM admin WHERE usuario = ? AND password = ?";
                con.query(sql, [user, pass], function(err, result) {
                    con.release();
                    if (err) {
                        callback(err);
                    } else {
                        // Comprobar si se ha acertado
                        if (result.length === 0) {
                            callback(new Error("Usuario o contraseña incorrectos"));
                        } else {
                            callback(null, true);
                        }
                    }
                });
            }
        });
    }

    crear(p, callback){
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = "INSERT INTO productos (nombre, referencia, marca, descripcion, euros, centimos, tipo, visible, destacado, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                const valores = [p.nombre, p.referencia, p.marca, p.descripcion, p.euros, p.centimos, p.tipo, p.visible, p.destacado, p.imagen];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(new Error("Error al crear."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        })
    }

    imagen(id, callback) {
        this.pool.getConnection(function(err, con) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."));
            } else {
                const sql = "SELECT imagen FROM productos WHERE id = ?";
                con.query(sql, [id], function(err, result) {
                    con.release();
                    if (err) {
                        callback(err);
                    } else {
                        // Comprobar si existe un producto
                        // con el id dado.
                        if (result.length === 0) {
                            callback("No existe");
                        } else {
                            callback(null, result[0].imagen);
                        }
                    }
                });
            }
        });
    }

    producto(id, callback) {
        this.pool.getConnection(function(err, con) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."));
            } else {
                const sql = "SELECT * FROM productos WHERE id = ?";
                con.query(sql, [id], function(err, result) {
                    con.release();
                    if (err) {
                        callback(err);
                    } else {
                        // Comprobar si existe un producto
                        // con el id dado.
                        if (result.length === 0) {
                            callback(new Error("El producto no existe"));
                        } else {
                            callback(null, result[0]);
                        }
                    }
                });
            }
        });
    }

    borrar(id, callback) {
        this.pool.getConnection(function(err, con) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."));
            } else {
                const sql = "DELETE FROM productos WHERE id = ?";
                con.query(sql, [id], function(err, result) {
                    con.release();
                    if (err) {
                        callback(err);
                    } else {
                        // Comprobar si existe un producto
                        // con el id dado.
                        if (result.affectedRows === 0) {
                            callback(new Error("El producto no existe"));
                        } else {
                            callback(null, result);
                        }
                    }
                });
            }
        });
    }

    modificar(p, callback){
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = "UPDATE productos SET nombre = ?, referencia = ?, marca = ?, descripcion = ?, euros = ?, centimos = ?, tipo = ?, visible = ?, destacado = ?, imagen = ? WHERE id = ?;";
                const valores = [p.nombre, p.referencia, p.marca, p.descripcion, p.euros, p.centimos, p.tipo, p.visible, p.destacado, p.imagen, p.id];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(new Error("Error al modificar."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        })
    }

    modificarSinFoto(p, callback){
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = "UPDATE productos SET nombre = ?, referencia = ?, marca = ?, descripcion = ?, euros = ?, centimos = ?, tipo = ?, visible = ?, destacado = ? WHERE id = ?;";
                const valores = [p.nombre, p.referencia, p.marca, p.descripcion, p.euros, p.centimos, p.tipo, p.visible, p.destacado, p.id];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(new Error("Error al modificar."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        })
    }

}
module.exports = modeloProducto;
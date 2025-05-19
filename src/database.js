const mysql = require("promise-mysql");
require("dotenv").config();

let pool; // Declarar el pool fuera de la función

async function getConnection() {
  if (!pool) {
    // Verificar si el pool ya existe
    pool = await mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "bodega",
      connectionLimit: 10, // Número máximo de conexiones en el pool
    });
  }
  return pool.getConnection();
}

module.exports = {
  getConnection,
};

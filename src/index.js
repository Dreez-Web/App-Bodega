const express = require("express");
const morgan = require("morgan");
const app = express();
const database = require("./database");
const cors = require("cors");

// Configuración inicial
app.set("port", 4000); // puerto de tu servidor Express
app.listen(app.get("port"), () => {
  console.log("Servidor escuchando desde el puerto", app.get("port"));
});

// Middlewares
app.use(morgan("dev"));
app.use(express.json()); // para futuras peticiones POST o PUT
// para permitir peticiones desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173", // URL de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Permitir credenciales
  })
);

// Función para ejecutar consultas
async function executeQuery(query, params = []) {
  const connection = await database.getConnection();
  try {
    const results = await connection.query(query, params);
    return results;
  } finally {
    connection.release(); // Importante: Liberar la conexión SIEMPRE
  }
}

// Rutas
app.get("/trabajador", async (req, res) => {
  try {
    const results = await executeQuery("SELECT * FROM trabajador");
    res.json(results);
  } catch (error) {
    console.error("Error al obtener trabajadores:", error);
    res.status(500).json({ error: "Error al obtener trabajadores" });
  }
});

app.get("/usuario", async (req, res) => {
  try {
    const results = await executeQuery("SELECT * FROM usuario");
    res.json(results);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

app.get("/herramienta", async (req, res) => {
  try {
    const results = await executeQuery("SELECT * FROM herramienta");
    res.json(results);
  } catch (error) {
    console.error("Error al obtener herramienta:", error);
    res.status(500).json({ error: "Error al obtener herramienta" });
  }
});

// Ruta para agregar una nueva herramienta
app.post("/herramienta", async (req, res) => {
  try {
    const { nombre, descripcion, cantidad } = req.body; // Recibir 'cantidad'
    const results = await executeQuery(
      "INSERT INTO herramienta (nombre, descripcion, cantidad) VALUES (?, ?, ?)",
      [nombre, descripcion, cantidad] // Incluir 'cantidad' en la consulta
    );
    res.status(201).json({ message: "Herramienta agregada correctamente", id: results.insertId });
  } catch (error) {
    console.error("Error al agregar herramienta:", error);
    res.status(500).json({ error: "Error al agregar herramienta" });
  }
});

app.delete("/herramienta/:id_herramienta", async (req, res) => {
  const { id_herramienta } = req.params;
  try {
    // Primero, verificar si hay entregas relacionadas
    const entregasRelacionadas = await executeQuery("SELECT COUNT(*) AS count FROM entregas WHERE id_herramienta = ?", [id_herramienta]);

    if (entregasRelacionadas[0].count > 0) {
      return res.status(400).json({
        error: "No se puede eliminar la herramienta. Existen entregas relacionadas.",
        entregas: await executeQuery(
          `SELECT
                        e.id_entrega,
                        e.fecha_entrega,
                        t.nombre AS nombre_trabajador
                    FROM
                        entregas e
                    JOIN
                        trabajador t ON e.id_trabajador = t.id_trabajador
                    WHERE
                        e.id_herramienta = ?`,
          [id_herramienta]
        ),
      });
    }

    // Si no hay entregas relacionadas, eliminar la herramienta
    const results = await executeQuery("DELETE FROM herramienta WHERE id_herramienta = ?", [id_herramienta]);

    if (results.affectedRows > 0) {
      res.status(200).json({ message: "Herramienta eliminada correctamente" });
    } else {
      res.status(404).json({ error: "No se encontró ninguna herramienta con ese ID" });
    }
  } catch (error) {
    console.error("Error al eliminar herramienta:", error);
    res.status(500).json({ error: "Error al eliminar herramienta" });
  }
});

// Obtener todas las entregas relacionadas con una herramienta específica
app.get("/herramienta/:id_herramienta/entregas", async (req, res) => {
  const { id_herramienta } = req.params;
  try {
    const results = await executeQuery(
      `SELECT
                e.id_entrega,
                e.fecha_entrega,
                t.nombre AS nombre_trabajador
            FROM
                entregas e
            JOIN
                trabajador t ON e.id_trabajador = t.id_trabajador
            WHERE
                e.id_herramienta = ?`,
      [id_herramienta]
    );
    res.json(results);
  } catch (error) {
    console.error("Error al obtener las entregas de la herramienta:", error);
    res.status(500).json({ error: "Error al obtener las entregas de la herramienta" });
  }
});

// Eliminar una entrega por su ID
app.delete("/entrega/:id_entrega", async (req, res) => {
  const { id_entrega } = req.params;
  try {
    const results = await executeQuery("DELETE FROM entregas WHERE id_entrega = ?", [id_entrega]);
    if (results.affectedRows > 0) {
      res.json({ message: "Entrega eliminada correctamente" });
    } else {
      res.status(404).json({ error: "No se encontró ninguna entrega con ese ID" });
    }
  } catch (error) {
    console.error("Error al eliminar la entrega:", error);
    res.status(500).json({ error: "Error al eliminar la entrega" });
  }
});

app.post("/trabajador", async (req, res) => {
  try {
    const { nombre, apellido, cargo } = req.body;
    const results = await executeQuery("INSERT INTO trabajador (nombre, apellido, cargo) VALUES (?, ?, ?)", [nombre, apellido, cargo]);
    res.status(201).json({ message: "Trabajador agregado correctamente", id: results.insertId });
  } catch (error) {
    console.error("Error al agregar trabajador:", error);
    res.status(500).json({ error: "Error al agregar trabajador" }); // Corregí el mensaje de error también
  }
});

app.delete("/trabajador/:id_trabajador", async (req, res) => {
  try {
    const { id_trabajador } = req.params; // Accede al parámetro con el nombre correcto
    const results = await executeQuery("DELETE FROM trabajador WHERE id_trabajador = ?", [id_trabajador]); // Usa el valor correcto

    if (results.affectedRows > 0) {
      res.status(200).json({ message: "Trabajador eliminado correctamente" });
    } else {
      res.status(404).json({ error: "No se encontró ningún trabajador con ese ID" });
    }
  } catch (error) {
    console.error("Error al eliminar trabajador:", error);
    res.status(500).json({ error: "Error al eliminar trabajador" });
  }
});

app.post("/entrega", async (req, res) => {
  const { id_trabajador, id_herramienta } = req.body;

  try {
    const connection = await database.getConnection();

    // Verificar la cantidad disponible de la herramienta
    const [herramienta] = await executeQuery("SELECT cantidad FROM herramienta WHERE id_herramienta = ?", [id_herramienta]);

    if (!herramienta || herramienta.cantidad <= 0) {
      res.status(400).json({ error: "La herramienta no está disponible." });
      return;
    }

    // Crear la entrega
    const entregaResult = await executeQuery("INSERT INTO entregas (id_trabajador, id_herramienta) VALUES (?, ?)", [id_trabajador, id_herramienta]);

    // Decrementar la cantidad de la herramienta
    await executeQuery("UPDATE herramienta SET cantidad = cantidad - 1 WHERE id_herramienta = ?", [id_herramienta]);

    res.status(201).json({ message: "Entrega creada exitosamente", id_entrega: entregaResult.insertId });
  } catch (error) {
    console.error("Error al crear la entrega:", error);
    res.status(500).json({ error: "Error al crear la entrega" });
  }
});

// Marcar una entrega como devuelta
app.put("/entrega/:idEntrega/devolver", async (req, res) => {
  const { idEntrega } = req.params;

  try {
    const connection = await database.getConnection();

    // Obtener el id_herramienta de la entrega que se está devolviendo
    const [entrega] = await executeQuery("SELECT id_herramienta FROM entregas WHERE id_entrega = ?", [idEntrega]);

    if (!entrega) {
      res.status(404).json({ error: "No se encontró la entrega con ese ID" });
      return;
    }

    // Marcar la entrega como devuelta
    const devolucionResult = await executeQuery(
      'UPDATE entregas SET fecha_devolucion = CURRENT_TIMESTAMP, estado = "devuelta" WHERE id_entrega = ?',
      [idEntrega]
    );

    if (devolucionResult.affectedRows === 0) {
      res.status(404).json({ error: "No se encontró la entrega con ese ID" });
      return;
    }

    // Incrementar la cantidad de la herramienta
    await executeQuery("UPDATE herramienta SET cantidad = cantidad + 1 WHERE id_herramienta = ?", [entrega.id_herramienta]);

    res.json({ message: "Entrega marcada como devuelta exitosamente" });
  } catch (error) {
    console.error("Error al marcar la entrega como devuelta:", error);
    res.status(500).json({ error: "Error al marcar la entrega como devuelta" });
  }
});

// En tu index.js (backend)
app.get("/entregas/entregadas", async (req, res) => {
  try {
    const query = `
            SELECT
                e.id_entrega,
                e.fecha_entrega,
                e.id_trabajador,
                t.nombre AS nombre_trabajador,
                e.id_herramienta,
                h.nombre AS nombre_herramienta
            FROM
                entregas e
            JOIN
                trabajador t ON e.id_trabajador = t.id_trabajador
            JOIN
                herramienta h ON e.id_herramienta = h.id_herramienta
            WHERE
                e.estado = 'entregada'
        `;
    const results = await executeQuery(query);
    res.json(results);
  } catch (error) {
    console.error("Error al obtener las herramientas entregadas:", error);
    res.status(500).json({ error: "Error al obtener las herramientas entregadas" });
  }
});
// Puedes agregar rutas similares para PUT (actualizar) y DELETE (eliminar) herramientas aquí

module.exports = app;

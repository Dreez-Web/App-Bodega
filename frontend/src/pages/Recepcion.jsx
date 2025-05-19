import React, { useState, useEffect } from "react";
import { getHerramientasEntregadas, marcarDevuelta } from "../services/api";
import "/src/App.css";

const Recepcion = () => {
  const [entregas, setEntregas] = useState([]);
  const [herramientasSeleccionadasParaDevolucion, setHerramientasSeleccionadasParaDevolucion] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Cargar la lista de herramientas actualmente entregadas al montar el componente
    cargarHerramientasEntregadas();
  }, []);

  const cargarHerramientasEntregadas = async () => {
    try {
      const response = await getHerramientasEntregadas();
      setEntregas(response.data);
    } catch (error) {
      console.error("Error al cargar herramientas entregadas:", error);
      setError(error.response?.data?.error || "Error al cargar las entregas.");
    }
  };

  const handleCheckboxChange = (event) => {
    const idEntrega = parseInt(event.target.value);
    if (event.target.checked) {
      setHerramientasSeleccionadasParaDevolucion([...herramientasSeleccionadasParaDevolucion, idEntrega]);
    } else {
      setHerramientasSeleccionadasParaDevolucion(herramientasSeleccionadasParaDevolucion.filter((id) => id !== idEntrega));
    }
  };

  const handleDevolverHerramientas = async () => {
    setMensaje("");
    setError("");

    if (herramientasSeleccionadasParaDevolucion.length === 0) {
      setError("Por favor, selecciona al menos una herramienta para devolver.");
      return;
    }

    try {
      // Realizar la petición para marcar como devuelta para cada herramienta seleccionada
      const devolucionesPromises = herramientasSeleccionadasParaDevolucion.map((idEntrega) => marcarDevuelta(idEntrega));
      await Promise.all(devolucionesPromises);

      setMensaje("Herramientas marcadas como devueltas exitosamente.");
      // Recargar la lista de herramientas entregadas después de la devolución
      cargarHerramientasEntregadas();
      // Limpiar la selección
      setHerramientasSeleccionadasParaDevolucion([]);
    } catch (error) {
      console.error("Error al marcar herramientas como devueltas:", error);
      setError(error.response?.data?.error || "Error al marcar las herramientas como devueltas.");
    }
  };

  return (
    <div>
      <h2>Recepción de Herramientas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

      {entregas.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Seleccionar</th>
                <th>Trabajador</th>
                <th>Herramienta</th>
                <th>Fecha de Entrega</th>
              </tr>
            </thead>
            <tbody>
              {entregas.map((entrega) => (
                <tr key={entrega.id_entrega}>
                  <td>
                    <input
                      type="checkbox"
                      value={entrega.id_entrega}
                      onChange={handleCheckboxChange}
                      checked={herramientasSeleccionadasParaDevolucion.includes(entrega.id_entrega)}
                    />
                  </td>
                  <td>{entrega.nombre_trabajador}</td>
                  <td>{entrega.nombre_herramienta}</td>
                  <td>
                    {new Date(entrega.fecha_entrega).toLocaleDateString()} {new Date(entrega.fecha_entrega).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleDevolverHerramientas}>Marcar como Devueltas</button>
        </div>
      ) : (
        <p>No hay herramientas actualmente entregadas.</p>
      )}
    </div>
  );
};

export default Recepcion;

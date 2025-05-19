import React, { useState, useEffect } from "react";
import { getTrabajadores } from "../services/api";
import { getHerramientas } from "../services/api";
import { crearEntrega } from "../services/api";

const Entrega = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [herramientas, setHerramientas] = useState([]);
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState("");
  const [herramientaSeleccionada, setHerramientaSeleccionada] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Cargar la lista de trabajadores al montar el componente
    getTrabajadores()
      .then((response) => setTrabajadores(response.data))
      .catch((error) => console.error("Error al cargar trabajadores:", error));

    // Cargar la lista de herramientas al montar el componente
    getHerramientas()
      .then((response) => setHerramientas(response.data))
      .catch((error) => console.error("Error al cargar herramientas:", error));
  }, []);

  const handleTrabajadorChange = (event) => {
    setTrabajadorSeleccionado(event.target.value);
  };

  const handleHerramientaChange = (event) => {
    setHerramientaSeleccionada(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensaje("");
    setError("");

    if (!trabajadorSeleccionado || !herramientaSeleccionada) {
      setError("Por favor, selecciona un trabajador y una herramienta.");
      return;
    }

    try {
      const response = await crearEntrega({
        id_trabajador: trabajadorSeleccionado,
        id_herramienta: herramientaSeleccionada,
      });
      setMensaje(response.data.message);
      // Limpiar la selección después de la entrega exitosa
      setTrabajadorSeleccionado("");
      setHerramientaSeleccionada("");
    } catch (error) {
      console.error("Error al crear la entrega:", error);
      setError(error.response?.data?.error || "Error al crear la entrega.");
    }
  };

  return (
    <div>
      <h2>Entrega de Herramienta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="trabajador">Trabajador:</label>
          <select id="trabajador" value={trabajadorSeleccionado} onChange={handleTrabajadorChange}>
            <option value="">Seleccionar trabajador</option>
            {trabajadores.map((trabajador) => (
              <option key={trabajador.id_trabajador} value={trabajador.id_trabajador}>
                {trabajador.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="herramienta">Herramienta:</label>
          <select id="herramienta" value={herramientaSeleccionada} onChange={handleHerramientaChange}>
            <option value="">Seleccionar herramienta</option>
            {herramientas.map((herramienta) => (
              <option key={herramienta.id_herramienta} value={herramienta.id_herramienta}>
                {herramienta.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Entregar Herramienta</button>
      </form>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Entrega;

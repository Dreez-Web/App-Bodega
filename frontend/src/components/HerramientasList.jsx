import "/src/App.css"; // Asegúrate de que la ruta sea correcta
import React, { useState } from "react";
import { deleteHerramienta } from "../services/api";
import { deleteEntregaPorId, getEntregasPorHerramientaId } from "../services/api"; // Importa las nuevas funciones de la API
import "/src/App.css";

function HerramientasList({ herramientas, onDelete, onEdit }) {
  const [herramientaAEliminar, setHerramientaAEliminar] = useState(null);
  const [entregasRelacionadas, setEntregasRelacionadas] = useState([]);
  const [errorEliminacion, setErrorEliminacion] = useState("");

  const verificarEntregasRelacionadas = async (id) => {
    try {
      const response = await getEntregasPorHerramientaId(id);
      if (response.data.length > 0) {
        setHerramientaAEliminar(id);
        setEntregasRelacionadas(response.data);
        setErrorEliminacion("Esta herramienta tiene entregas relacionadas. Elimínelas primero.");
      } else {
        // Si no hay entregas relacionadas, proceder con la eliminación
        eliminarHerramienta(id);
      }
    } catch (error) {
      console.error("Error al verificar entregas:", error);
      setErrorEliminacion(error.response?.data?.error || "Error al verificar si hay entregas relacionadas."); // Actualiza el estado con el error del backend o un mensaje genérico
    }
  };

  const eliminarHerramienta = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta herramienta?")) {
      try {
        await deleteHerramienta(id);
        onDelete(); // Llama a la función para recargar la lista de herramientas
        setHerramientaAEliminar(null);
        setEntregasRelacionadas([]);
        setErrorEliminacion("");
      } catch (error) {
        console.error("Error al eliminar herramienta:", error);
        alert(error.response?.data?.error || "Error al eliminar la herramienta.");
      }
    }
  };

  const eliminarEntregaRelacionada = async (idEntrega) => {
    try {
      await deleteEntregaPorId(idEntrega);
      // Recargar la lista de entregas relacionadas después de eliminar una
      const response = await getEntregasPorHerramientaId(herramientaAEliminar);
      setEntregasRelacionadas(response.data);
      if (response.data.length === 0 && herramientaAEliminar) {
        // Si ya no hay entregas relacionadas, intentar eliminar la herramienta
        eliminarHerramienta(herramientaAEliminar);
      }
      setErrorEliminacion(response.data.length > 0 ? "Esta herramienta tiene entregas relacionadas. Elimínelas primero." : "");
    } catch (error) {
      console.error("Error al eliminar entrega:", error);
      alert("Error al eliminar la entrega.");
    }
  };

  return (
    <div>
      <h2>Lista de Herramientas</h2>
      {errorEliminacion && <p style={{ color: "red" }}>{errorEliminacion}</p>}

      {entregasRelacionadas.length > 0 && (
        <div>
          <h3>Entregas Relacionadas:</h3>
          <ul>
            {entregasRelacionadas.map((entrega) => (
              <li key={entrega.id_entrega}>
                Entrega ID: {entrega.id_entrega}, Trabajador: {entrega.nombre_trabajador}, Fecha:{" "}
                {new Date(entrega.fecha_entrega).toLocaleDateString()}
                <button onClick={() => eliminarEntregaRelacionada(entrega.id_entrega)} className="delete">
                  Eliminar Entrega
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul>
        {herramientas.map((h) => (
          <li key={h.id_herramienta}>
            <div className="item">
              {h.nombre} - {h.descripcion}
            </div>
            <div className="quantity">Cantidad: {h.cantidad}</div>
            <div className="actions">
              <button onClick={() => onEdit(h)}>Editar</button>
              <button className="delete" onClick={() => verificarEntregasRelacionadas(h.id_herramienta)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HerramientasList;

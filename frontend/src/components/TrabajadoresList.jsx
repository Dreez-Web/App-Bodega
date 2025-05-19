import React, { useState } from "react";
import { deleteTrabajador, updateTrabajador } from "../services/api";
import FormTrabajador from "./FormTrabajador"; // Reutilizaremos el formulario
import "/src/App.css"; // Asegúrate de que la ruta sea correcta

function TrabajadoresList({ trabajadores, onTrabajadorUpdated, onTrabajadorDeleted }) {
  const [editingTrabajador, setEditingTrabajador] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este trabajador?")) {
      try {
        await deleteTrabajador(id);
        onTrabajadorDeleted();
      } catch (error) {
        console.error("Error al eliminar trabajador:", error);
        alert("Hubo un error al eliminar el trabajador.");
      }
    }
  };

  const handleEdit = (trabajador) => {
    setEditingTrabajador(trabajador);
  };

  const handleCancelEdit = () => {
    setEditingTrabajador(null);
  };

  const handleUpdateTrabajador = async (data) => {
    try {
      await updateTrabajador(editingTrabajador.id, data);
      onTrabajadorUpdated();
      setEditingTrabajador(null);
    } catch (error) {
      console.error("Error al actualizar trabajador:", error);
      alert("Hubo un error al actualizar el trabajador.");
    }
  };

  return (
    <div>
      <h2>Lista de Trabajadores</h2>
      <ul>
        {trabajadores.map((trabajador) => (
          <li key={trabajador.id_trabajador}>
            <div className="item">
              {trabajador.nombre} {trabajador.apellido} ({trabajador.cargo})
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(trabajador)}>Editar</button>
              <button className="delete" onClick={() => handleDelete(trabajador.id_trabajador)}>
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingTrabajador && (
        <div>
          <h3>Editar Trabajador</h3>
          <FormTrabajador initialValues={editingTrabajador} onSubmit={handleUpdateTrabajador} onCancel={handleCancelEdit} />
        </div>
      )}
    </div>
  );
}

export default TrabajadoresList;

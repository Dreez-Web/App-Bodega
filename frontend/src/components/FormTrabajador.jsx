import { useState, useEffect } from "react";
import { addTrabajador } from "../services/api";
import "/src/App.css"; // Asegúrate de que la ruta sea correcta

function FormTrabajador({ onAdd, initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState({ nombre: "", apellido: "", cargo: "" });

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    } else {
      setForm({ nombre: "", apellido: "", cargo: "" });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(form); // Usar la función onSubmit proporcionada (para editar)
    } else {
      await addTrabajador(form);
      onAdd(); // Actualizar la lista después de agregar
    }
    // Limpiar el formulario solo si no estamos editando o después de una adición exitosa
    if (!initialValues) {
      setForm({ nombre: "", apellido: "", cargo: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
      <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" />
      <input name="cargo" value={form.cargo} onChange={handleChange} placeholder="Cargo" />
      <button type="submit">{initialValues ? "Guardar Cambios" : "Agregar Trabajador"}</button>
      {initialValues && onCancel && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default FormTrabajador;

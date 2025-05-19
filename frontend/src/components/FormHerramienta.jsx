import { useState, useEffect } from "react";
import { addHerramienta, updateHerramienta } from "../services/api";

function FormHerramienta({ onAdd, herramientaEditando, limpiarEdicion }) {
  const [form, setForm] = useState({ nombre: "", descripcion: "", cantidad: 0 }); // Inicializar cantidad en el estado

  useEffect(() => {
    if (herramientaEditando) {
      setForm(herramientaEditando);
    }
  }, [herramientaEditando]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id_herramienta) {
      // Usar el ID correcto para la herramienta
      await updateHerramienta(form.id_herramienta, form);
    } else {
      await addHerramienta(form);
    }
    onAdd();
    setForm({ nombre: "", descripcion: "", cantidad: 0 }); // Resetear también la cantidad
    if (limpiarEdicion) limpiarEdicion();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre de herramienta" />
      <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input
        type="number" // Usar input de tipo number para la cantidad
        name="cantidad"
        value={form.cantidad}
        onChange={handleChange}
        placeholder="Cantidad disponible"
      />
      <button type="submit">{form.id_herramienta ? "Actualizar" : "Agregar"} Herramienta</button>
    </form>
  );
}

export default FormHerramienta;

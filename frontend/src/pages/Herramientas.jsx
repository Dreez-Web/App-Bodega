import { useEffect, useState } from "react";
import { getHerramientas, deleteHerramienta } from "../services/api";
import FormHerramienta from "../components/FormHerramienta";
import HerramientasList from "../components/HerramientasList";

function Herramientas() {
  const [herramientas, setHerramientas] = useState([]);
  const [herramientaEditando, setHerramientaEditando] = useState(null);

  const fetchData = async () => {
    const res = await getHerramientas();
    setHerramientas(res.data);
  };

  const handleDelete = async (id) => {
    await deleteHerramienta(id);
    fetchData();
  };

  const handleEdit = (herramienta) => {
    setHerramientaEditando(herramienta);
  };

  const limpiarEdicion = () => {
    setHerramientaEditando(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Gestión de Herramientas</h1>
      <FormHerramienta onAdd={fetchData} herramientaEditando={herramientaEditando} limpiarEdicion={limpiarEdicion} />
      <HerramientasList herramientas={herramientas} onDelete={handleDelete} onEdit={handleEdit} />
    </>
  );
}

export default Herramientas;

import { useEffect, useState } from "react";
import { getTrabajadores } from "../services/api";
import FormTrabajador from "../components/FormTrabajador";
import TrabajadoresList from "../components/TrabajadoresList";

function Trabajadores() {
  const [trabajadores, setTrabajadores] = useState([]);

  const fetchData = async () => {
    const res = await getTrabajadores();
    setTrabajadores(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTrabajadorUpdated = () => {
    fetchData();
  };

  const handleTrabajadorDeleted = () => {
    fetchData();
  };

  return (
    <>
      <h1>Gestión de Trabajadores</h1>
      <FormTrabajador onAdd={fetchData} />
      <TrabajadoresList trabajadores={trabajadores} onTrabajadorUpdated={handleTrabajadorUpdated} onTrabajadorDeleted={handleTrabajadorDeleted} />
    </>
  );
}

export default Trabajadores;

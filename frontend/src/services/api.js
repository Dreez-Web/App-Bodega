import axios from "axios";

const API_URL = "http://localhost:4000";

// Funciones para trabajadores
export const getTrabajadores = () => axios.get(`${API_URL}/trabajador`);
export const addTrabajador = (data) => axios.post(`${API_URL}/trabajador`, data);
export const updateTrabajador = (id, data) => axios.put(`${API_URL}/trabajador/${id}`, data);
export const deleteTrabajador = (id) => axios.delete(`${API_URL}/trabajador/${id}`);

//Funciones para herramientas
export const getHerramientas = () => axios.get(`${API_URL}/herramienta`);
export const addHerramienta = (data) => axios.post(`${API_URL}/herramienta`, data);
export const updateHerramienta = (id, data) => axios.put(`${API_URL}/herramienta/${id}`, data);
export const deleteHerramienta = (id) => axios.delete(`${API_URL}/herramienta/${id}`);

// Funciones para Entregas
export const crearEntrega = (data) => axios.post(`${API_URL}/entrega`, data);
export const marcarDevuelta = (idEntrega) => axios.put(`${API_URL}/entrega/${idEntrega}/devolver`);
export const getHerramientasEntregadas = () => axios.get(`${API_URL}/entregas/entregadas`);

export const getEntregasPorHerramientaId = (idHerramienta) => axios.get(`${API_URL}/herramienta/${idHerramienta}/entregas`);

export const deleteEntregaPorId = (idEntrega) => axios.delete(`${API_URL}/entrega/${idEntrega}`);

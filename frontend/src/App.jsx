import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Trabajadores from "./pages/Trabajadores";
import Herramientas from "./pages/Herramientas";
import Entrega from "./pages/Entrega";
import Recepcion from "./pages/Recepcion";

import "./App.css";

function Inicio() {
  return (
    <main>
      <h1>Bienvenido a la App de Bodega</h1>
      <button>Iniciar Sesión</button>
    </main>
  );
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/trabajadores">Trabajadores</Link> | <Link to="/herramientas">Herramientas</Link> |{" "}
        <Link to="/entrega">Entrega</Link> | <Link to="/recepcion">Recepcion</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} /> {/* Renderizamos el componente Inicio en la ruta "/" */}
        <Route path="/trabajadores" element={<Trabajadores />} />
        <Route path="/herramientas" element={<Herramientas />} />
        <Route path="/entrega" element={<Entrega />} />
        <Route path="/recepcion" element={<Recepcion />} />
      </Routes>
    </Router>
  );
}

export default App;

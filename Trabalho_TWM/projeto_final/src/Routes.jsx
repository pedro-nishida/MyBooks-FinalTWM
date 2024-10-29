//Routes.js
import { Route, Routes as RoutesDom } from "react-router-dom"

import Home from "./Home"
import Cliente from "./pages/Cliente.jsx"
import Produto from "./pages/Produto.jsx"
import Tecnico from "./pages/Tecnico.jsx"
import Relato from "./pages/Relato.jsx"
import Chamado from "./pages/Chamado.jsx"
import Ordem from "./pages/Ordem.jsx"


const Routes = () => {
  return (
      <RoutesDom>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="cliente" element={<Cliente />} />
        <Route path="tecnico" element={<Tecnico />} />
        <Route path="produto" element={<Produto />} />
        <Route path="relato" element={<Relato />} />
        <Route path="chamado" element={<Chamado />} />
        <Route path="ordem_servicos" element={<Ordem />} />
      </RoutesDom>
  )
}

export default Routes
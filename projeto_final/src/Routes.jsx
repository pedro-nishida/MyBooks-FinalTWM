//Routes.js
import { Route, Routes as RoutesDom } from "react-router-dom"

import Home from "./Home"
import Lidos from "./pages/Lidos.jsx"
import Desejados from "./pages/Desejados.jsx"
import Biblioteca from "./pages/Biblioteca.jsx"


const Routes = () => {
  return (
      <RoutesDom>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="lidos" element={<Lidos />} />
        <Route path="desejados" element={<Desejados />} />
        <Route path="biblioteca" element={<Biblioteca />} />
      </RoutesDom>
  )
}

export default Routes
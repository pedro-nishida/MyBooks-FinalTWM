import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routes from './Routes.jsx'

import Menu from './Menu.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Menu />
      <Routes/>
    </div>
  )
}

export default App

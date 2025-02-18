import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CoinAddress from './pages/CoinAddress/CoinAddress'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>DumpFun Token Tracker</h1>
      <CoinAddress />
    </div>
  )
}

export default App

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { Portfolio } from './pages/Portfolio/Portfolio'
import CoinAddress from './pages/CoinAddress/CoinAddress'
import { RootLayout } from './layouts/RootLayout'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Portfolio />,
      },
      {
        path: '/portfolio',
        element: <Portfolio />,
      },
      {
        path: '/spot',
        element: <CoinAddress />,
      },
      {
        path: '/perpetuals',
        element: <CoinAddress />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App

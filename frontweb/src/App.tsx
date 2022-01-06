import 'react-toastify/dist/ReactToastify.css'
import 'assets/styles/custom.scss'
import { AuthContext, AuthContextData } from 'AuthContext'
import { useState } from 'react'
import Routes from 'Routes'
import { ToastContainer } from 'react-toastify'
import './App.css'

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  })
  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />;
      <ToastContainer />
    </AuthContext.Provider>
  )
}

export default App

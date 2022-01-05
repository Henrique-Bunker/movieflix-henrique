import { AuthContext } from 'AuthContext'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTokenData, isAuthenticated } from 'utils/auth'
import history from 'utils/history'
import './styles.css'
import { removeAuthData } from 'utils/storage'

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext)

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    removeAuthData()
    setAuthContextData({
      authenticated: false,
    })
    history.replace('/')
  }

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: isAuthenticated(),
        tokenData: getTokenData(),
      })
    } else {
      setAuthContextData({
        authenticated: false,
      })
    }
  }, [setAuthContextData])

  return (
    <nav className="navbar main-nav navbar-container bg-primary">
      <div className="container-fluid">
        <Link to="/movies" className="nav-logo-text">
          <h4>MovieFlix</h4>
        </Link>
        {authContextData.authenticated && (
          <a
            className="nav-login-logout"
            href="#logout"
            onClick={handleLogoutClick}
          >
            Sair
          </a>
        )}
      </div>
    </nav>
  )
}

export default Navbar

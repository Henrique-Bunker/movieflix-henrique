import { ReactComponent as AuthImage } from 'assets/images/auth-image.svg'
import Login from 'components/Login'
import { useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated } from 'utils/auth'
import './styles.css'

type LocationState = {
  from: string
}

const Home = () => {
  const history = useHistory()
  const location = useLocation<LocationState>()
  const { from } = location.state || { from: { pathname: '/movies' } }
  if (isAuthenticated()) {
    history.push(from)
  }
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito</p>
        <AuthImage />
      </div>
      <div className="auth-form-container">
        <Login />
      </div>
    </div>
  )
}
export default Home

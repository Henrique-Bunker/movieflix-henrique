import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from 'utils/auth'

type Props = {
  children: React.ReactNode
  path: string
  exact?: boolean
}

const PrivateRoute = ({ children, path, exact = false }: Props) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        !isAuthenticated() ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  )
}

export default PrivateRoute

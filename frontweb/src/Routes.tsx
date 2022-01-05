import PrivateRoute from 'components/PrivateRoute'
import MovieDetails from 'pages/MovieDetails'
import Movies from 'pages/Movies'
import { Switch, Route, Router } from 'react-router-dom'
import history from 'utils/history'
import Navbar from './components/Navbar'
import Home from './pages/Home'

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <PrivateRoute path="/movies" exact={true}>
        <Movies />
      </PrivateRoute>
      <PrivateRoute path="/movies/:movieId">
        <MovieDetails />
      </PrivateRoute>
    </Switch>
  </Router>
)

export default Routes

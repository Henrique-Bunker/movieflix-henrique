import { useHistory, useLocation } from 'react-router-dom'
import { requestBackendLogin } from 'utils/requests'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { AuthContext } from 'AuthContext'
import './styles.css'
import { saveAuthData } from 'utils/storage'
import { getTokenData, isAuthenticated } from 'utils/auth'

type FormData = {
  username: string
  password: string
}

type LocationState = {
  from: string
}

const Login = () => {
  const location = useLocation<LocationState>()
  const { from } = location.state || { from: { pathname: '/movies' } }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [hasError, setHasError] = useState(false)

  const history = useHistory()
  const { setAuthContextData } = useContext(AuthContext)

  const onSubmit = async (formData: FormData) => {
    console.log('SUBMIT')
    console.log(formData)

    try {
      const loginRequest = await requestBackendLogin(formData)
      console.log(loginRequest)

      saveAuthData(loginRequest.data)
      setAuthContextData({
        authenticated: isAuthenticated(),
        tokenData: getTokenData(),
      })
      history.replace(from)
      setHasError(false)
    } catch (error) {
      setHasError(true)
    }
  }
  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger">Erro ao tentar efetuar o login</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 mb-sm-4">
          <input
            {...register('username', {
              required: 'Campo obrigatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                message: 'Email invalido',
              },
            })}
            type="text"
            className={`form-control base-input ${
              errors.username ? 'is-invalid' : ''
            }`}
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', { required: 'Campo obrigatorio' })}
            type="password"
            className={`form-control base-input ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Password"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
          <button className="btn btn-primary login-submit" type="submit">
            FAZER LOGIN
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login

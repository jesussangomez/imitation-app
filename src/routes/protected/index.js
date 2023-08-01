import { 
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom'

import useAuth from 'hooks/auth'

// https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f

const ProtectedRoute = ({ children, role }) => {
  const { auth } = useAuth()

  const credentials = auth.credentials
  const user = auth.user

  const location = useLocation()

  const paths = {
    'admin': '/admin',
    'user': '/dashboard'
  }

  if (credentials) {
    if (!user) {
      return <Outlet />
    }

    // if (!credentials.emailVerified) {
    //   return <Navigate to={'/verify'} state={{ from: location.pathname }} replace />
    // }

    return user.role === role ? children : <Navigate to={paths[user.role]} state={{ from: location.pathname }} replace />
  } else {
    return (
      <Navigate to='/' state={{ from: location.pathname }} replace />
    )
  }
}

export default ProtectedRoute
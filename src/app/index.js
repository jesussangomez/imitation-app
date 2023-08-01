import React from 'react'

import { 
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import ProtectedRoute from 'routes/protected'

import Forgot from 'pages/account/forgot'
import SignIn from 'pages/account/signin'
import SignUp from 'pages/account/signup'
import Dashboard from 'pages/dashboard'
import useAuth from 'hooks/auth'
import Admin from 'pages/admin'

const App = (props) => {

  const { auth } = useAuth()
  const { credentials } = auth

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={credentials !== undefined && credentials !== null ? <Navigate replace to='/dashboard' /> : <SignIn />} />
        <Route path='/registro' element={<SignUp />} />
        <Route path='/olvide' element={<Forgot />} />
        <Route path='/dashboard/*' 
          element={
            <ProtectedRoute role='user'>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path='/admin/*' 
          element={
            <ProtectedRoute role='admin'>
              <Admin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
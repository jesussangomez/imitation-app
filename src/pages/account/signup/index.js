import React, { useState } from 'react'

import {
  useNavigate
} from 'react-router-dom'

import useAuth from 'hooks/auth'

import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material'

import GoogleIcon from '@mui/icons-material/Google'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

// Blue 6c91c2
// Brighter blue 228cdb
// Green a2c5ac

const SignUp = (props) => {
  const { auth } = useAuth()
  const { signInWithGoogle, signUpWithEmailAndPassword } = auth

  const navigate = useNavigate()

  const [password, setPassword] = useState('')

  const [user, setUser] = useState({
    'name': '',
    'email': '',
  })

  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value })
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const googleSignIn = async () => {
    await signInWithGoogle()
    navigate('/dashboard')
  }

  const signUp = async () => {
    await signUpWithEmailAndPassword(user, password)
    navigate('/dashboard')
  }

  const isReadyToRegister = user.name !== '' && user.email !== '' && (password !== '' && password.length >= 6)

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Container maxWidth='sm'>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant='h4' gutterBottom>
                    Regístrate
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id='outlined-name-input'
                    label='Nombre'
                    value={user['name']}
                    onChange={handleChange('name')}
                    placeholder='Ingresa tu nombre'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='outlined-email-input'
                    InputLabelProps={{ shrink: true }}
                    label='Email'
                    type='email'
                    value={user['email']}
                    onChange={handleChange('email')}
                    placeholder='Ingresa tu email'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant='outlined'>
                    <InputLabel shrink htmlFor='outlined-password'>Password</InputLabel>
                    <OutlinedInput
                      id='outlined-password'
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      // error={errorPassword}
                      // helperText={errorPasswordText}
                      placeholder='6+ caracteres'
                      notched
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Password'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Button disabled={!isReadyToRegister} disableElevation fullWidth size='large' variant='contained' onClick={signUp}>
                      Registrar
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} sx={{ pt: 2 }}>
                    <Grid item xs={12}>
                      <Button
                        disableElevation
                        fullWidth
                        onClick={googleSignIn}
                        size='large'
                        startIcon={<GoogleIcon />}
                        sx={{
                          background: '#373f470a', 
                          color: '#444'
                        }}
                      >
                        Continuar con Google
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ pt: 2 }} variant='body1'>
                    ¿Ya tienes una cuenta? <Link sx={{ fontWeight: 'bolder', textDecoration: 'none' }} href='/'>Inicia sesión</Link>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </Grid>
  )
}

export default SignUp
import React, { useState } from 'react'

// import {
//   useNavigate 
// } from 'react-router-dom'

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

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

const SignIn = (props) => {
  // const navigate = useNavigate()

  const { auth } = useAuth()
  const { signInWithEmail, signInWithGoogle } = auth

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorEmail, setErrorEmail] = useState(false)
  const [errorEmailText, setErrorEmailText] = useState(errorEmail ? 'Email inválido' : '')
  
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorPasswordText, setErrorPasswordText] = useState(errorPassword ? 'Password incorrecta' : '')
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const googleSignIn = async () => {
    await signInWithGoogle()
    // navigate('/dashboard')
  }

  const signIn = async () => {
    if (!validateEmail(email)) {
      setErrorEmail(true)
      setErrorEmailText('Email inválido')
      return
    }

    const error = await signInWithEmail(email, password)
    if (error) {
      const errorCode = error.code
      if (errorCode === 'auth/invalid-email') {
        setErrorEmailText('Email inválido')
        setErrorEmail(true)
      } else if (errorCode === 'auth/user-disabled') {
        setErrorEmailText('Usuario deshabilitado')
        setErrorEmail(true)
      } else if (errorCode === 'auth/user-not-found') {
        setErrorEmailText('Usuario no encontrado')
        setErrorEmail(true)
      } else if (errorCode === 'auth/wrong-password') {
        setErrorPasswordText('Password incorrecta')
        setErrorPassword(true)
      } else {
        console.log(error)
        setErrorEmailText('Error desconocido')
        setErrorPasswordText('Error desconocido')
      }
      return
    }

    // navigate('/dashboard')
  }

  const handleEmailChanged = (event) => {
    setErrorEmail(false)
    setErrorEmailText('')
    setEmail(event.target.value)
  }

  const handlePasswordChanged = (event) => {
    setErrorPassword(false)
    setErrorPasswordText('')
    setPassword(event.target.value)
  }

  return (
    <Grid container alignItems='center' spacing={0}>
      <Grid item xs={12}>
        <Container maxWidth='sm'>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Grid container spacing={3}>
                {/* <Grid item xs={12} textAlign='center'>
                  <Box
                    component='img' 
                    src='/assets/images/detective.png'
                    sx={{ width: '30%' }}
                  />
                </Grid> */}
                <Grid item xs={12} textAlign='center'>
                  <Typography fontWeight={900} variant='h3' gutterBottom sx={{ py: 4 }}>
                    I M I TAT IO N
                  </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                  <Typography variant='h5' gutterBottom>
                    Inicia sesión
                  </Typography>
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    error={errorEmail}
                    helperText={errorEmailText}
                    id='outlined-email-input'
                    InputLabelProps={{ shrink: true }}
                    label='Email'
                    value={email}
                    onChange={handleEmailChanged}
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
                      onChange={handlePasswordChanged}
                      error={errorPassword}
                      helperText={errorPasswordText}
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
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6}>
                      <Typography variant='body1'>
                        <Link sx={{ fontWeight: 'bolder', textDecoration: 'none' }} href='/olvide'>¿Olvidaste tu contraseña?</Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} align='right'>
                      <Button variant='contained' disableElevation size='large' onClick={() => signIn()}>
                        Iniciar sesión
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                  <Grid container direction='row' justifyContent='flex-end'>
                    <Button variant='contained' disableElevation size='large' onClick={() => signIn()}>
                      Iniciar sesión
                    </Button>
                  </Grid>
                </Grid> */}
                <Grid item xs={12} align='right'>
                  <Typography sx={{ pt: 2 }} variant='body1'>
                    ¿No tienes una cuenta? <Link sx={{ fontWeight: 'bolder', textDecoration: 'none' }} href='/registro'>Regístrate</Link>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} sx={{ pt: 4 }}>
                    <Grid item xs={12}>
                      <Button
                        disableElevation
                        fullWidth
                        onClick={() => googleSignIn()}
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
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </Grid>
  )
}

export default SignIn
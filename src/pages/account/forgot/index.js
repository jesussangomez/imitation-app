import React, { useState } from 'react'

import useAuth from 'hooks/auth'

import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material'

// Blue 6c91c2
// Brighter blue 228cdb
// Green a2c5ac

const Forgot = (props) => {

  const { auth } = useAuth()
  const { resetPassword } = auth

  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const sendPasswordResetEmail = async () => {
    resetPassword(email)
    setEmailSent(true)
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Container maxWidth='sm'>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant='h4' gutterBottom>
                    ¿Olvidaste tu contraseña?
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    { emailSent ? `Por favor revisa tu correo, hemos mandado las instrucciones para reestablecer tu contraseña a ${email}.` : 'No te preocupes, te mandaremos las instrucciones para reestablecerla.' }
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: emailSent ? 'none' : 'block' }}>
                  <TextField
                    id='outlined-email-input'
                    InputLabelProps={{ shrink: true }}
                    label='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Ingresa tu email'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: emailSent ? 'none' : 'block' }}>
                  <Grid container direction='row' justifyContent='flex-end'>
                    <Button disabled={email === ''} variant='contained' disableElevation onClick={sendPasswordResetEmail}>
                      Reestablecer
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ pt: 4 }} variant='body1'>
                    <Link sx={{ fontWeight: 'bolder', textDecoration: 'none' }} href='/'>Volver a inicio de sesión</Link>
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

export default Forgot
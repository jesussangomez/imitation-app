import React, { useEffect, useState } from 'react'

import {
  Alert,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import useAuth from 'hooks/auth'

const CesarModule = (props) => {

  const { auth } = useAuth()
  const { user } = auth

  const alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]

  const getAlphabetOffset = (offset) => {
      let alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]//Array.from('abcdefghijklmnopqrstuvwxyz')
      offset = offset % alphabet.length // in case offset is larger than alphabet length
  
      if(offset < 0) {
          offset += alphabet.length // makes the offset positive for left rotation
      }
  
      let inverseOffset = alphabet.length - offset
      let rotatedAlphabet = alphabet.slice(inverseOffset).concat(alphabet.slice(0, inverseOffset))
      
      return rotatedAlphabet
  }
  
  const [offset, setOffset] = useState(3)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography fontWeight='900' variant='h5' gutterBottom>
          Cifrado César
        </Typography>
        <Typography variant='body1' gutterBottom>
          El cifrado César es una de las técnicas de cifrado más simples y conocidas. Es un tipo de cifrado por sustitución en el que cada letra del texto original se reemplaza por otra letra del alfabeto que se encuentra un número fijo de posiciones más adelante. Por ejemplo, con un desplazamiento de 1, la letra 'A' se reemplazaría por la letra 'B', la letra 'B' se reemplazaría por la letra 'C', y así sucesivamente.
        </Typography>
        <Typography fontWeight='900' variant='h6' gutterBottom sx={{ pt: 2 }}>
          Ejemplo
        </Typography>
        <Typography variant='body1' gutterBottom>
          Tomemos por ejemplo la frase <b>"hola"</b>. Si aplicamos un desplazamiento de 3 posiciones en el cifrado César, cada letra de la palabra se reemplaza por la letra que se encuentra 3 posiciones adelante en el alfabeto:
        </Typography>
        <Typography align='center' variant='body1' gutterBottom sx={{ pt: 1 }}>
          <b>'h'</b> se convierte en <b>'k'</b><br/>
          <b>'o'</b> se convierte en <b>'r'</b><br/>
          <b>'l'</b> se convierte en <b>'o'</b><br/>
          <b>'a'</b> se convierte en <b>'d'</b><br/>
        </Typography>
        <Typography variant='body1' gutterBottom sx={{ pt: 1 }}>
          Por lo tanto, <b>"hola"</b> cifrado con un desplazamiento de 3 en el cifrado César sería <b>"krod"</b>.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography fontWeight='900' variant='h6' gutterBottom>
          Desafío
        </Typography>
        <Typography variant='body1' gutterBottom sx={{ pt: 1 }}>
          Ahora que entiendes cómo funciona el cifrado César, intenta descifrar el siguiente mensaje. El mensaje ha sido cifrado usando el cifrado César con un desplazamiento de 5 posiciones hacia adelante:
        </Typography>
        <Typography align='center' fontWeight='700' variant='h6' gutterBottom sx={{ py: 2 }}>
          Fmtwf jrynjrit jp hnkwfit hjxfw
        </Typography>
        <Typography variant='body1' gutterBottom sx={{ pt: 1 }}>
          Puedes ayudarte de la siguiente herramienta para traducir el mensaje.
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <TextField
          label='Desplazamiento'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          value={offset}
          onChange={(e) => { setOffset(e.target.value) }}
          sx={{ mt: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack alignItems='center' justifyContent='center' direction='row' spacing={0}>
            {
              getAlphabetOffset(0).map((item, index) => (
                <Box textAlign='center' sx={{ width: 30 }}>
                  <Typography fontWeight='300' variant='h6'>
                    {item}
                  </Typography>
                </Box>
              ))
            }
        </Stack>
        <Stack alignItems='center' justifyContent='center' direction='row' spacing={0} sx={{ mb: 2 }}>
            {
              getAlphabetOffset(offset).map((item) => (
                <Box textAlign='center' sx={{ width: 30 }}>
                  <Typography fontWeight={item === 'A' ? '900' : '300'} variant='h6'>
                    {item}
                  </Typography>
                </Box>
              ))
            }
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1' gutterBottom sx={{ pt: 1 }}>
          Escribe la solución en el campo de texto a continuación y presiona <b>"Enviar"</b>.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={10}>
            <TextField
              label='Respuesta'
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={message}
              onChange={(e) => { setMessage(e.target.value) }}
            />
          </Grid>
          <Grid item xs>
            <Button variant='contained' disableElevation size='large'>
              Enviar
            </Button>
          </Grid>
          <Grid item xs>
            <Alert severity="error">¡Oh no! Ese no es el mensaje, intenta de nuevo.</Alert>
            <Alert severity="success">¡Bien hecho! El mensaje es <b>"Ahora entiendo el cifrado cesar".</b></Alert>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CesarModule
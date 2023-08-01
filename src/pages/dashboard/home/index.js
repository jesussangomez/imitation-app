import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import useAuth from 'hooks/auth'

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import { 
  IconBrandYoutube,
  IconCalendarEvent,
  IconId,
  IconMovie,
  IconNotification,
  IconQuestionMark,
  IconUsers,
} from '@tabler/icons-react'

const Home = (props) => {
  const navigate = useNavigate()

  const { auth } = useAuth()
  const { user } = auth

  const iconStroke = 1
  const iconSize = 48

  const sections = [
    { 'id': 0, 'title': 'Cifrado César', 'description': 'Es un método que desplaza las letras del alfabeto un número determinado de posiciones.', 'path': 'cesar' },
    { 'id': 1, 'title': 'Cifrado por Sustitución', 'description': 'Es un método que reemplaza cada letra del texto original, según un sistema predefinido.', 'path': 'substitution' },
    { 'id': 2, 'title': 'Cifrado de Vigenère', 'description': 'Es un método que utiliza una serie de diferentes cifrados César basados en las letras de una palabra clave.', 'path': 'vigenere' },
    { 'id': 3, 'title': 'Cifrado de Transposición', 'description': 'Es un método que reordena las letras del texto original según un sistema predefinido, manteniendo las mismas letras pero alterando su disposición.', 'path': 'transposition' },
    { 'id': 4, 'title': 'Cifrado de Playfair', 'description': 'Es un método que reemplaza pares de letras en el texto original por otros pares de letras, utilizando una matriz de 5x5 generada a partir de una palabra clave.', 'path': 'playfair' }
  ]

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Hola <b>{user.name}</b>, buen día!
        </Typography>
        <Typography fontWeight='300' variant='body1' gutterBottom>
          ¿Estás listo para aprender?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography fontWeight='900' variant='h5'>
          Módulos
        </Typography>
      </Grid>
      {/* <Grid item xs={12}>
        {
          letters.map((item, index) => (
            <TextField defaultValue={letters[index]} disabled inputProps={{ style: { fontWeight: 900 } }} variant='outlined' sx={{ width: 48, pr: 1 }} />
          ))
        }
      </Grid> */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {
          sections.map((section) => (
            <Grid key={`section_${section.id}`} item xs={12} md={6}>
              <CardActionArea onClick={() => navigate(section.path)}>
                <Card variant='outlined' sx={{ p: 2 }}>
                  <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item xs={3} align='middle'>
                        <Box
                          component='img' 
                          src='/assets/images/medal.png'
                          sx={{ filter: section.id !== 0 ? 'grayscale(100%)' : 'none', opacity: section.id !== 0 ? 0.1 : 1.0, width: '60%' }}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Grid container spacing={0}>
                          <Grid item xs={12}>
                            <Typography fontWeight='700' variant='h6' gutterBottom>
                              {section.title}
                            </Typography>
                            <Typography color='#313638aa' variant='body2'>
                              {section.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))
        }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home
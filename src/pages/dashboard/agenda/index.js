import React, { useEffect } from 'react'

import useAuth from 'hooks/auth'

import {
  Card,
  CardContent,
  Box,
  Grid,
  Link,
  Typography,
} from '@mui/material'

import EditorWidget from 'widget/editor'

const Agenda = () => {
  const { firestore } = useAuth()
  const { getPresentations, presentations } = firestore

  const formatHour = (date) => {
    var options = { hour: 'numeric', minute: 'numeric' }
    return new Date(date).toLocaleTimeString('es-MX', options)
  }

  useEffect(() => {
    getPresentations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (presentations === undefined) return <div></div>

  return (
    <Grid container spacing={2} sx={{ p: { xs: 2, md: 0 } }}>
      {
        presentations.map((presentation) => (
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 0, p: 0 }}>
              <CardContent sx={{ bgcolor: '#313638', p: 1, '&:last-child': { paddingBottom: 1 } }}>
                <Typography color='white' variant='body1'>
                  <b>{presentation.title}</b>
                </Typography>
                <Typography color='white' variant='body2'>
                  { formatHour(presentation.startTime.seconds * 1000) } a { formatHour(presentation.endTime.seconds * 1000) } Hrs.
                </Typography>
              </CardContent>
              <CardContent sx={{ p: 1, '&:last-child': { paddingBottom: 1 } }}>
                <EditorWidget readOnly={true} value={presentation.description} />
              </CardContent>
            </Card>
          </Grid>
        ))
      }
      <Grid item xs={12}>
        <Typography variant='caption'>
          *La agenda y ponentes pueden cambiar sin previo aviso
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} align='center' alignItems='center' sx={{ p: 2 }}>
          <Grid item xs={6}>
            <Box
              component={Link}
              href='https://www.amazon.com.mx'
              target='_blank'
            >
              <Box
                component='img' 
                src='/assets/images/logo-left.png'
                sx={{ width: '80%' }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              component={Link}
              href='https://www.bb.com.mx'
              target='_blank'
            >
              <Box
                component='img' 
                src='/assets/images/logo-right.png'
                sx={{ width: '100%' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Agenda
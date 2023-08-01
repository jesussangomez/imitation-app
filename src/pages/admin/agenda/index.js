import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import useAuth from 'hooks/auth'

import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'

import EditorWidget from 'widget/editor'

const Agenda = () => {
  const navigate = useNavigate()

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={8}>
            <Typography variant='h5'>Ponencias</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Button variant='contained' disableElevation onClick={() => navigate('crear')}>
              Crear
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {
        presentations.map((presentation) => (
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 0, p: 0 }}>
              <CardContent sx={{ bgcolor: '#313638', p: 1, '&:last-child': { paddingBottom: 1 } }}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Typography color='white' variant='body1'>
                      <b>{presentation.title}</b>
                    </Typography>
                    <Typography color='white' variant='body2'>
                      { formatHour(presentation.startTime.seconds * 1000) } a { formatHour(presentation.endTime.seconds * 1000) } Hrs.
                    </Typography>
                  </Grid>
                  <Grid item xs={2} align='right'>
                    <IconButton onClick={() => navigate(`edit/${presentation.id}`)}>
                      <EditIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
              <CardContent sx={{ p: 1, '&:last-child': { paddingBottom: 1 } }}>
                <EditorWidget readOnly={true} value={presentation.description} />
              </CardContent>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default Agenda
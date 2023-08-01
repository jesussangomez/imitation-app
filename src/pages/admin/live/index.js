import React, { useEffect, useState } from 'react'

import useAuth from 'hooks/auth'

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material'

import ReactPlayer from 'react-player'

const Live = (props) => {

  const { firestore } = useAuth()
  const { event, getEventInfo, updateEventInfo } = firestore

  const [link, setLink] = useState('')
  const handleLinkChange = (event) => {
    setLink(event.target.value)
  }

  useEffect(() => {
    getEventInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (event === undefined) return
    setLink(event.live)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])

  const onSaveLink = async () => {
    await updateEventInfo({
      'live': link
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 0 }}>
          <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h6'>Evento en vivo</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Link' placeholder='Ingresa el link del evento' InputLabelProps={{ shrink: true }} onChange={handleLinkChange} value={link} variant='outlined' />
              </Grid>
              <Grid item xs={12} align='right'>
                <Button disabled={ event !== undefined && link === event.live} variant='contained' disableElevation onClick={onSaveLink}>
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {
        link !== '' ? (
          <Grid item xs={12} md={12}>
            <ReactPlayer controls playing url={link} width='100%' />
          </Grid>
        ) : null
      }
    </Grid>
  )
}

export default Live
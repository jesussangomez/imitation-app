import React, { useEffect, useState } from 'react'

import useAuth from 'hooks/auth'

import {
  Box,
  Grid,
  Typography,
} from '@mui/material'

import ReactPlayer from 'react-player'

const Live = (props) => {

  const { firestore } = useAuth()
  const { event, getEventInfo } = firestore

  const [link, setLink] = useState('')

  useEffect(() => {
    getEventInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (event === undefined) return
    setLink(event.live)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box
          component='img' 
          src='/assets/images/home-cover.png'
          sx={{ width: '100%' }}
        />
      </Grid>
      {
        link !== '' ? (
          <Grid item xs={12}>
            <ReactPlayer controls playing url={link} width='100%' />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Box sx={{ p: 2 }}>
              <Typography color='text.secondary' variant='body1'>
                Disponible el día 13 de marzo de 2023
              </Typography>
            </Box>
          </Grid>
        )
      }
    </Grid>
  )
}

export default Live
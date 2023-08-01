import React, { useEffect, useState } from 'react'

import { Link as RouterLink } from 'react-router-dom'

import useAuth from 'hooks/auth'

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material'

import { 
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from '@tabler/icons-react'

const Speakers = (props) => {
  const { firestore } = useAuth()
  const { getSpeakers, speakers } = firestore

  const [currentSpeakers, setCurrentSpeakers] = useState([])

  useEffect(() => {
    getSpeakers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (speakers === undefined) return
    speakers.sort((a, b) => a.name.localeCompare(b.name))
    setCurrentSpeakers(speakers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakers])

  const socialIcons = {
    'linkedin': <IconBrandLinkedin />,
    'facebook': <IconBrandFacebook />,
    'instagram': <IconBrandInstagram />,
    'twitter': <IconBrandTwitter />,
  }

  return (
    <Grid container spacing={2}>
      {
        currentSpeakers.map((speaker) => (
          <Grid key={`speaker_${speaker.id}`} item xs={12} md={4}>
            <Card sx={{ p: 4 }}>
              <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
                <Grid container spacing={2} align='center'>
                  <Grid item xs={12} align='center'>
                    <Box
                      sx={{
                        borderColor: '#313638aa',
                        borderRadius: 20,
                        borderStyle: 'solid',
                        borderWidth: '4px',
                        height: 128,
                        p: 1,
                        width: 128
                      }}
                    >
                      <Avatar src={speaker.imageUrl} component={RouterLink} to={speaker.id} sx={{ height: '100%', width: '100%' }} />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color='#313638' variant='h6'>
                      <b>{speaker.name}</b>
                    </Typography>
                    <Typography variant='body1'>
                      {speaker.headline}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction='row' spacing={2} justifyContent='center'>
                      {
                        (speaker.social !== undefined ? Object.keys(speaker.social) : []).map((key) => (
                          <IconButton key={`${speaker.id}_${key}`} component={Link} href={speaker.social[key]} target='_blank'>
                            {socialIcons[key]}
                          </IconButton>
                        ))
                      }
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default Speakers
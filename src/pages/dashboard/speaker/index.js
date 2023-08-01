import React, { useEffect } from 'react'

import {
  useParams,
} from 'react-router-dom'

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

import EditorWidget from 'widget/editor'

const Speaker = (props) => {
  const params = useParams()
  const { id } = params

  const { firestore } = useAuth()
  const { getSpeaker, speaker } = firestore

  useEffect(() => {
    getSpeaker(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const socialIcons = {
    'linkedin': <IconBrandLinkedin />,
    'facebook': <IconBrandFacebook />,
    'instagram': <IconBrandInstagram />,
    'twitter': <IconBrandTwitter />,
  }

  if (speaker === undefined) return <div></div>

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
                  <Avatar src={speaker.imageUrl} sx={{ height: '100%', width: '100%' }} />
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
              <Grid item xs={12}>
                <EditorWidget readOnly={true} value={speaker.description} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Speaker
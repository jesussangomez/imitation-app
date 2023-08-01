import React, { useEffect } from 'react'

import useAuth from 'hooks/auth'

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'

const Notifications = (props) => {
  const { firestore } = useAuth()
  const { getNotifications, notifications } = firestore

  useEffect(() => {
    getNotifications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (notifications === undefined) return <div></div>

  return (
    <Grid container spacing={2}>
      {
        notifications.map((notification) => (
          <Grid key={`notification${notification.id}`} item xs={12}>
            <Card sx={{ p: 2 }}>
              <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
                <Typography variant='h6'>
                  <b>{notification.title}</b>
                </Typography>
                <Typography variant='body1'>
                  {notification.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default Notifications
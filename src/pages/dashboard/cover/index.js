import React, {  useRef, useState } from 'react'

import useAuth from 'hooks/auth'

import {
  Box,
  Button,
  Grid,
  Typography
} from '@mui/material'

import CameraFeed from './camera'

// import * as htmlToImage from 'html-to-image'
import { toPng } from 'html-to-image'

const Cover = (props) => {

  const { auth, firestore } = useAuth()
  const { user } = auth
  const { trackCover } = firestore

  // w 3102
  // h 4100

  // w 1732
  // h 1201
  // x 309
  // y 737

  // https://firebasestorage.googleapis.com/v0/b/foro-economia.appspot.com/o/assets%2Fportada.png?alt=media&token=da68b080-22a5-43c1-be69-b33c9140773e

  const imageRef = useRef(null)
  const [imageUrl, setImageUrl] = useState()
  const [cameraOn, setCameraOn] = useState(false)

  // const [canShare, setCanShare] = useState(undefined)
  // useEffect(()=> {
  //   setCanShare(Navigator.share)
  // }, [])

  const handleShare = async () => {
    const newFile = await toPng(imageRef.current)
    const link = document.createElement('a')
    link.download = 'portada.png'
    link.href = newFile
    link.click()
    setImageUrl(undefined)
    await trackCover({
      'email': user.email,
      'name': user.name
    })
  }

  const uploadImage = async file => {
    setCameraOn(false)
    var objectURL = URL.createObjectURL(file)
    setImageUrl(objectURL)
  }

  // useEffect(() => {
  //   if (imageUrl === undefined) return
  //   console.log(imageUrl)
  //   handleShare()
  // }, [imageUrl])

  return (
    <Grid container spacing={0}>
      {
        !cameraOn && imageUrl !== undefined ? (
          <Grid item xs={12}>
            <Box sx={{ pt: 2, px: 2 }}>
              <Typography variant='body2' sx={{ pb: 2 }}>
                Descarga tu portada para compartirla en tus redes sociales
              </Typography>
              <Button fullWidth variant='contained' disableElevation onClick={handleShare}>
                Descargar
              </Button>
            </Box>
          </Grid>
        ) : null
      }
      <Grid item xs={12}>
        <Box sx={{ pt: 2, px: 2 }}>
          <Button fullWidth variant='contained' disableElevation onClick={() => setCameraOn(true)}>
            Abrir cámara
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} hidden={!cameraOn}>
        <CameraFeed cameraOn={cameraOn} sendFile={uploadImage} />
      </Grid>
      {
        !cameraOn && imageUrl !== undefined ? (
          <Grid item xs={12} ref={imageRef}>
            <Box sx={{ position: 'relative' }}>
              <Box
                component='img'
                src='/assets/images/portada.png'
                sx={{ width: '100%' }}
              />
              <Box
                component='img'
                src={imageUrl}
                sx={{ objectFit:'1732:1201', objectPosition: '100%, 69%', position: 'absolute', top: '18%', left: '9.96%', width: '55.3%' }}
              />
            </Box>
          </Grid>
        ) : null
      }
    </Grid>
  )
}

export default Cover
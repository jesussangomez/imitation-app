import React, { useEffect, useRef, useState } from 'react'

import {
  Box,
  Button,
  Grid
} from '@mui/material'

const CameraFeed = (props) => {
  const { cameraOn } = props
  const videoPlayer = useRef()
  const canvas = useRef()
  const [init, setInit] = useState(false)

  const processDevices = (devices) => {
    devices.forEach(device => {
      initDevice()
    })
  }

  const initDevice = async (device) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'user' } })
    videoPlayer.current.srcObject = stream
    videoPlayer.current.play()
  }

  const initCameras = async () => {
    setInit(true)
    const cameras = await navigator.mediaDevices.enumerateDevices()
    processDevices(cameras)
  }

  const stopCameras = () => {
    if (!init) return
    const stream = videoPlayer.current.srcObject
    stream.getTracks().forEach(track => {
      track.stop()
    })
    videoPlayer.current.pause()
    videoPlayer.current.src = ''
    videoPlayer.srcObject = null
    setInit(false)
  }

  useEffect(() => {
    if (cameraOn) {
      initCameras()
    } else {
      stopCameras()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraOn])

  const takePhoto = () => {
    const { sendFile } = props
    const context = canvas.current.getContext('2d')
    const vw = videoPlayer.current.videoWidth
    const vh = videoPlayer.current.videoHeight
    const sw = videoPlayer.current.offsetWidth
    const sh = videoPlayer.current.offsetHeight

    canvas.current.width = sw
    canvas.current.height = sh

    context.drawImage(videoPlayer.current, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, sw, sh)
    canvas.current.toBlob(sendFile)
  }

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1732/1201' }}>
          <video ref={videoPlayer} style={{ width: '100%', height: '100%', position: 'absolute', objectFit: 'cover', overflow: 'hidden' }} /> 
        </Box>
        {/* <video ref={ref => (videoPlayer = ref)} style={{ aspectRatio: '1732:1201', width: '100%', objectFit: 'cover' }} /> */}
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' disableElevation fullWidth onClick={takePhoto}>
          Tomar foto
        </Button>
      </Grid>
      <Grid item xs={12}>
        <canvas hidden ref={canvas} />
      </Grid>
    </Grid>
    // <div className='c-camera-feed'>
    //   <div className='c-camera-feed__viewer'>
    //     <video ref={ref => (videoPlayer = ref)} width='680' heigh='360' />
    //   </div>
    //   <button onClick={takePhoto}>Take photo!</button>
    //   <div className='c-camera-feed__stage'>
    //   </div>
    // </div>
  )
}

export default CameraFeed
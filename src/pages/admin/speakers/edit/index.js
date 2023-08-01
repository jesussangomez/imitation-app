import React, { useCallback, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import useAuth from 'hooks/auth'

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material'

import EditorWidget from 'widget/editor'

import { useDropzone } from 'react-dropzone'

const EditSpeaker = (props) => {
  const params = useParams()
  const { id } = params

  const navigate = useNavigate()

  const [saving, setSaving] = useState(false)

  const { firestore } = useAuth()
  const { getSpeaker, speaker, updateSpeaker } = firestore

  const [file, setFile] = useState()
  const [imageUrl, setImageUrl] = useState('')

  const onDropAccepted = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setImageUrl(URL.createObjectURL(acceptedFiles[0]))
      setFile(acceptedFiles[0])
    }
  }, [])

  const {
    getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
    onDropAccepted
  })

  const [name, setName] = useState('')
  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const [headline, setHeadline] = useState('')
  const handleHeadlineChange = (event) => {
    setHeadline(event.target.value)
  }

  const [social, setSocial] = useState({})
  const handleSocialChange = (prop) => (event) => {
    setSocial({...social, [prop]: event.target.value})
  }

  const [description, setDescription] = useState([{ children: [{ text: '' }] }])
  const [currentValue, setCurrentValue] = useState([{ children: [{ text: '' }] }])

  const onEditorChanged = (value) => {
    setDescription(value)
  }

  const saveSpeaker = async () => {
    setSaving(true)
    const speaker = {
      'description': description,
      'headline': headline,
      'name': name,
      'social': social,
    }

    if (file !== undefined) {
      speaker['file'] = file
    }

    await updateSpeaker(id, speaker)

    setSaving(false)

    navigate('/admin/ponentes')
  }

  useEffect(() => {
    getSpeaker(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (speaker === undefined) return
    setImageUrl(speaker.imageUrl)
    setName(speaker.name)
    setHeadline(speaker.headline)
    setCurrentValue(speaker.description)
    setSocial(speaker.social !== undefined ? speaker.social : {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speaker])

  if (speaker === undefined) return <div></div>

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={8}>
            <Typography variant='h5'>Editar ponente</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Button disabled={saving} variant='contained' disableElevation onClick={saveSpeaker}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
              <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>Ponente</Typography>
                  </Grid>
                  <Grid item xs={12} align='center'>
                    <Box
                      sx={{
                        '&:hover': {
                          borderColor: '#373f4722',
                          cursor: 'pointer',
                          opacity: 0.8
                        },
                        borderColor: '#373f471a',
                        borderRadius: 20,
                        borderStyle: 'dashed',
                        borderWidth: '4px',
                        height: 160,
                        p: 1,
                        width: 160
                      }}
                      {...getRootProps({isDragActive, isDragAccept, isDragReject})}
                    >
                      <input {...getInputProps()} />
                      <Avatar
                        // component={CardActionArea}
                        src={imageUrl}
                        sx={{
                          // '&:hover': {
                          //   borderColor: '#373f4722',
                          //   cursor: 'pointer',
                          //   opacity: 0.8
                          // },
                          // borderColor: '#373f471a',
                          // borderStyle: 'dashed',
                          // borderWidth: '4px',
                          height: '100%',
                          // p: 2,
                          width: '100%'
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label='Nombre' placeholder='Ingresa el nombre del ponente' InputLabelProps={{ shrink: true }} onChange={handleNameChange} value={name} variant='outlined' />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label='Encabezado' placeholder='Ingresa el encabezado del ponente' InputLabelProps={{ shrink: true }} onChange={handleHeadlineChange} value={headline} variant='outlined' />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 2 }}>
          <Typography variant='h6' gutterBottom sx={{ pb: 1 }}>Descripción del ponente</Typography>
          <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
            <EditorWidget onEditorChanged={onEditorChanged} value={currentValue}/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card sx={{ p: 2 }}>
          <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h6' gutterBottom >Redes sociales</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='LinkedIn' placeholder='Ingresa el link de LinkedIn' InputLabelProps={{ shrink: true }} onChange={handleSocialChange('linkedin')} value={social['linkedin']} variant='outlined' />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Facebook' placeholder='Ingresa el link de Facebook' InputLabelProps={{ shrink: true }} onChange={handleSocialChange('facebook')} value={social['facebook']} variant='outlined' />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Instagram' placeholder='Ingresa el link de Instagram' InputLabelProps={{ shrink: true }} onChange={handleSocialChange('instagram')} value={social['instagram']} variant='outlined' />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Twitter' placeholder='Ingresa el link de Twitter' InputLabelProps={{ shrink: true }} onChange={handleSocialChange('twitter')} value={social['twitter']} variant='outlined' />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EditSpeaker
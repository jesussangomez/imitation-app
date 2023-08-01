import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import useAuth from 'hooks/auth'

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material'

// import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import LocalizationProvider from '@mui/lab/x-'
// import TimePicker from '@mui/lab/TimePicker'

import mxLocale from 'date-fns/locale/es'
import EditorWidget from 'widget/editor'

const CreateAgenda = () => {
  const navigate = useNavigate()

  const { firestore } = useAuth()
  const { createPresentation } = firestore

  const [saving, setSaving] = useState(false)
  
  const [title, setTitle] = useState('')
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  // const [startTime, setStartTime] = useState(edit ? new Date(edit.startTime.seconds * 1000) : null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const savePresentation = async () => {
    setSaving(true)
    const presentation = {
      'title': title,
      'description': description,
      'startTime': startTime,
      'endTime': endTime
    }

    await createPresentation(presentation)
    setSaving(false)
    navigate('/admin/agenda')
  }

  const [description, setDescription] = useState([])

  const onEditorChanged = (value) => {
    setDescription(value)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={8}>
            <Typography variant='h5'>Nueva Ponencia</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Button disabled={saving} variant='contained' disableElevation onClick={savePresentation}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ p: 2 }}>
          <Typography variant='h6' gutterBottom sx={{ pb: 1 }}>Ponencia</Typography>
          <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label='Título' placeholder='Ingresa el título de la ponencia' InputLabelProps={{ shrink: true }} onChange={handleTitleChange} value={title} variant='outlined' />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={mxLocale}>
                  <TimePicker
                    label='Hora incial'
                    value={startTime}
                    onChange={(newValue) => {
                      setStartTime(newValue);
                    }}
                    renderInput={(params) => <TextField type='time' InputLabelProps={{ shrink: true }} fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={mxLocale}>
                  <TimePicker
                    label='Hora final'
                    value={endTime}
                    onChange={(newValue) => {
                      setEndTime(newValue);
                    }}
                    renderInput={(params) => <TextField type='time' InputLabelProps={{ shrink: true }} fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 2 }}>
          <Typography variant='h6' gutterBottom sx={{ pb: 1 }}>Descripción de la ponencia</Typography>
          <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
            <EditorWidget onEditorChanged={onEditorChanged}/>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CreateAgenda
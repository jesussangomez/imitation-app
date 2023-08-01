import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import useAuth from 'hooks/auth'

const Questions = (props) => {

  const { auth, firestore } = useAuth()
  const { user } = auth
  const { createQuestion, deleteQuestion, getMyQuestions, myQuestions } = firestore

  const [questions, setQuestions] = useState([])

  const [question, setQuestion] = useState('')
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const addQuestion = async () => {
    setQuestion('')
    await createQuestion({
      'description': question,
      'uid': user.uid,
    })
  }

  const removeQuestion = async (id) => {
    await deleteQuestion(id)
  }

  useEffect(() => {
    getMyQuestions(user.uid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (myQuestions === undefined) return
    setQuestions(myQuestions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myQuestions])

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box
          component='img' 
          src='/assets/images/home-cover.png'
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12} sx={{ p: 2 }}>
        <TextField fullWidth label='Pregunta' placeholder='Ingresa tu pregunta' InputLabelProps={{ shrink: true }} onChange={handleQuestionChange} value={question} variant='outlined' />
      </Grid>
      <Grid item xs={12} sx={{ px: 2 }}>
        <Button disabled={question === ''} disableElevation fullWidth variant='contained' onClick={addQuestion}>Enviar</Button>
      </Grid>
      <Grid item xs={12} sx={{ pb: 0, pt: 4, px: 2 }}>
        <Typography variant='h6' gutterBottom>Tus preguntas</Typography>
      </Grid>
      {
        questions.length === 0 ? (
          <Grid item xs={12} sx={{ px: 2 }}>
            <Typography variant='body1' color='text.secondary' gutterBottom>No has hecho ninguna pregunta</Typography>
          </Grid>
        ) : (
          questions.map((question) => (
            <Grid key={`question_${question.id}`} item xs={12}>
              <Box sx={{ display: 'flex', p: 1 }} alignItems='center'>
                <Box sx={{ px: 2, width: '100%' }}>
                  <Typography variant='body1'>{question.description}</Typography>
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                  <IconButton onClick={() => removeQuestion(question.id)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))
        )
      }
    </Grid>
  )
}

export default Questions
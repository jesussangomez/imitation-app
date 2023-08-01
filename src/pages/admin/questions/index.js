import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'

import useAuth from 'hooks/auth'

const Questions = (props) => {

  const { firestore } = useAuth()
  const { getEventInfo, getQuestions, questions } = firestore

  const [currentQuestions, setCurrentQuestions] = useState([])
  // const [selectedQuestions, setSelectedQuestions] = useState([])

  // const [checked, setChecked] = useState([])
  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value)
  //   const newChecked = [...checked]

  //   if (currentIndex === -1) {
  //     newChecked.push(value)
  //   } else {
  //     newChecked.splice(currentIndex, 1)
  //   }

  //   setChecked(newChecked)
  // }

  // const [selectedChecked, setSelectedChecked] = useState([])
  // const handleToggleSelected = (value) => () => {
  //   const currentIndex = selectedChecked.indexOf(value)
  //   const newChecked = [...selectedChecked]

  //   if (currentIndex === -1) {
  //     newChecked.push(value)
  //   } else {
  //     newChecked.splice(currentIndex, 1)
  //   }

  //   setSelectedChecked(newChecked)
  // }

  useEffect(() => {
    getQuestions()
    getEventInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (questions === undefined) return
    setCurrentQuestions(questions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions])

  // useEffect(() => {
  //   if (event === undefined) return
  //   if (event.question === undefined) return
  //   setCurrentQuestion(event.question)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [event])

  // const addQuestions = () => {
  //   const q = questions.filter((question) => checked.includes(question.id))
  //   setSelectedQuestions(q)
  // }

  // const [currentQuestion, setCurrentQuestion] = useState()

  // const [value, setValue] = useState('')
  // const handleChange = (event) => {
  //   setValue(event.target.value)
  //   const filtered = selectedQuestions.filter((question) => question.id === event.target.value)

  //   if (filtered.length > 0) {
  //     updateCurrentQuestion(filtered[0])
  //   }
  // }

  // const updateCurrentQuestion = async (question) => {
  //   await updateEventInfo({
  //     'question': question
  //   })
  // }

  // const clean = async () => {
  //   setChecked([])
  //   setSelectedChecked([])
  //   setSelectedQuestions([])
  //   setCurrentQuestion(undefined)
  //   await updateEventInfo({
  //     'question': ''
  //   })
  // }

  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12}>
        <Card sx={{ p: 2 }}>
          <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h5' gutterBottom>
                  Pregunta actual
                </Typography>
                <Typography variant='body1'>
                  { currentQuestion !== undefined && currentQuestion !== '' ? currentQuestion.description : 'No hay pregunta seleccionada' }
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid> */}
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 0 }}>
          <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h5'>
                  Preguntas
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <List>
                {
                  currentQuestions.map((question) => (
                    <ListItem key={`question_${question.id}`}>
                      {/* <ListItemButton role={undefined} onClick={handleToggle(question.id)} dense> */}
                        {/* <ListItemIcon>
                          <Checkbox
                            edge='start'
                            checked={checked.indexOf(question.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                          />
                        </ListItemIcon> */}
                        <ListItemText primary={question.description} />
                      {/* </ListItemButton> */}
                    </ListItem>
                  ))
                }
                </List>
              </Grid>
              {/* <Grid item xs={12} align='right'>
                <Button variant='contained' disableElevation onClick={addQuestions}>
                  Actualizar
                </Button>
              </Grid> */}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <Card sx={{ p: 2 }}>
          <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h5'>
                  Preguntas seleccionadas
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup value={value} onChange={handleChange}>
                    {
                      selectedQuestions.map((question) => (
                        <FormControlLabel key={`question_${question.id}`} value={question.id} control={<Radio />} label={question.description} />
                      ))
                    }
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} align='right'>
                <Button variant='contained' disableElevation onClick={clean}>
                  Limpiar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid> */}
    </Grid>
  )
}

export default Questions
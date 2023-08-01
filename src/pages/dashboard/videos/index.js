import React from 'react'

import {
  Grid,
} from '@mui/material'
import ReactPlayer from 'react-player'

const Videos = (props) => {

  const videos = [
    { 'id': 0, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2FEVENTO%20PLAN%20SONORA_03%200223.mp4?alt=media&token=5ce9c031-ef7e-4f61-bbda-bea97aca25be' },
    { 'id': 1, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2FPLAN%20SONORA%20DE%20ENERGI%CC%81AS%20SOSTENIBLES%20ESPAN%CC%83OL_24%200223.mp4?alt=media&token=687e43ea-c80f-4c66-a8d9-7b116f4b7605' },
    { 'id': 2, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2F01-PARQUE%20SOLAR%20MA%CC%81S%20GRANDE-13%200223.mp4?alt=media&token=9563dc75-eccf-4aa6-b614-e4c75d078969' },
    { 'id': 3, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2F02-PLAN%20SONORA%20COMO%20MODELO%20EDUCATIVO-16%200223.mp4?alt=media&token=df1e539f-7842-4270-a635-06a2d2eface4' },
    { 'id': 4, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2F03-LITIO%20EL%20MINERAL%20DEL%20FUTURO-07%200223.mp4?alt=media&token=dd4252d0-4067-442d-9e77-48e3fd39da82' },
    { 'id': 5, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2F04-BENEFICIOS%20DEL%20PLAN%20SONORA-17%200223.mp4?alt=media&token=8d8b38c3-1b8d-466c-b791-537910c3e045' },
    { 'id': 6, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2F05-SONORA%20UNICO%20LUGAR%20PARA%20INDUSTRIAS%20SUSTENTABLES-17%200223.mp4?alt=media&token=4163fe87-7599-477c-8fe0-860dfe9f79c7' },
    { 'id': 7, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2F07-SONORA%20EN%20LA%20MIRA%20DEL%20MUNDO-24%200223.mp4?alt=media&token=35950125-bf8d-47c3-ae16-339a9a99af17' },
    { 'id': 8, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2F08-SONORA%20TRANSICIO%CC%81N%20ENERGE%CC%81TICA-24%200223.mp4?alt=media&token=2fd3c8d2-fe73-40a2-8d96-8e9cf2d3c885' },
    { 'id': 9, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2F09-SONORA%20Y%20SEMICONDUCTORES-.24%200223mp4.mp4?alt=media&token=450021df-c190-4543-a632-4632fedd09a5' },
    { 'id': 10, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2F10-SONORA%20EL%20POLO%20DE%20ME%CC%81XICO%20EN%20LAS%20NUEVAS%20INDUSTRIAS-27%200223.mp4?alt=media&token=6d7f8ed6-06e8-4cfa-b4a2-eebb37c81a69' },
    { 'id': 11, 'url': 'https://firebasestorage.googleapis.com/v0/b/foro-sonora.appspot.com/o/videos%2F11-SONORA%20PLAN%20A%20LARGO%20PLAZO%20EN%20EMPLEOS-27%200223.mp4?alt=media&token=5ceb9ff6-1e7d-44a8-aeb0-d59fbaebc3d0' },
  ]

  return (
    <Grid container spacing={0}>
      {
        videos.map((video) => (
          <Grid key={`video_${video.id}`} item xs={12}>
            <ReactPlayer 
              controls 
              config={{ 
                file: {
                  attributes: {
                    controlsList: 'nodownload'
                  }
                }
              }}
              url={video.url}
              width='100%' 
              />
          </Grid>
        ))
      }
    </Grid>
  )
}

export default Videos
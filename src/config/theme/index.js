import { createTheme } from '@mui/material/styles'
import red from '@mui/material/colors/red'
import { esES } from '@mui/material/locale'

// 222222 - Eerie Black
// 313638 - Raising Black 373f47

const theme = createTheme({
  root: {
    '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
      outline: 'none'
    },
  },
  components: {
    // MuiFormLabel: {
    //   styleOverrides: {
    //     root: {
    //       color: '#d3d3d7',
    //     }
    //   }
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        }
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          blockquote: {
            borderLeft: '2px solid #ddd',
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: '10px',
            color: '#aaa',
            fontStyle: 'italic',
          },
          overflow: 'auto !important',
          padding: '0 !important',
        }
      }
    },
  },
  palette: {
    primary: {
      // main: '#5c49c4',
      main: '#313638',
      // main: '#333'
      // main: '#5f6caf',
    },
    secondary: {
      main: '#313638',
      // 313638
    },
    error: {
      main: red.A400,
    },
    background: {
      // default: '#f8f9fc',// '#f0f0f0',
      default: '#fff',
      alternative: '#f8f9fc'
    },
    text: {
      primary: '#1b1b1e', // '#35393c', // '#535461',
      secondary: '#90909a' //'#d3d3d7'
    },
  },
  typography: {
    fontFamily: 'Nunito, Avenir, sans-serif',
  },
}, esES)

export default theme
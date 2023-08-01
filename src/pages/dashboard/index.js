import React, { useEffect, useState } from 'react'

import {
  // Link as RouterLink,
  NavLink,
  Route,
  Routes,
  // useLocation
} from 'react-router-dom'

import useAuth from 'hooks/auth'

import {
  AppBar,
  Avatar,
  Box,
  // Breadcrumbs,
  Button,
  Drawer,
  Grid,
  IconButton,
  // Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
// import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { 
  IconBrandYoutube,
  IconCalendarEvent,
  IconCertificate,
  IconHome,
  IconId,
  IconMovie,
  IconNotification,
  IconQuestionMark,
  IconUsers,
  IconUserCircle,
} from '@tabler/icons-react'

import md5 from 'md5'

import Home from 'pages/dashboard/home'
import Live from './live'
import Questions from './questions'
import Speakers from './speakers'
import Speaker from './speaker'
import Notifications from './notifications'
import Agenda from './agenda'
import Videos from './videos'
import Cover from './cover'
import CesarModule from './modules/cesar'

const Dashboard = (props) => {
  const { window } = props

  const { auth, messaging } = useAuth()
  const { logout, user } = auth
  const { getFCMToken } = messaging

  const requestNotificationPermission = async () => {
    // const status = await Notification.requestPermission()

    // if (status === 'granted') {
      getFCMToken(user.uid)
      // console.log('Token:', token)
    // }
  }

  // useEffect(() => {
  //   requestNotificationPermission()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    if (user === undefined) return
    if (user.token !== undefined) return

    requestNotificationPermission()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const formatProfilePicture = (photoUrl, provider) => {
    if (provider === 'facebook') {
      return `${photoUrl}?type=large`
    } else if (provider === 'google') {
      return photoUrl.replace('s96-c', 's600-c')
    } else {
      return 'https://www.gravatar.com/avatar/' + md5(user.email) + '?s=200'
    }
  }

  const drawerWidth = 240

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const iconStroke = 1
  const iconSize = 18

  const sections = [
    { 'id': 0, 'label': 'Módulos', 'icon': <IconCertificate color='#313638' size={iconSize} stroke={iconStroke} />, 'path': 'modules' },
    { 'id': 1, 'label': 'Mi perfil', 'icon': <IconUserCircle color='#313638' size={iconSize} stroke={iconStroke} />, 'path': 'profile' },
  ]

  const drawer = (
    <>
      <Toolbar sx={{ bgcolor: '#313638', minHeight: '96px !important' }}>
        <Grid container>
          <Grid item xs align='middle'>
            <Typography color='white' fontWeight={900} variant='h5'>
              I M I TAT IO N
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
      <List sx={{ p: 2 }}>
        {/* <ListItem sx={{ py: 0, pb: 1 }}>
          <ListItemText
            disableTypography
            primary={
              <Typography variant='subtitle2' sx={{ fontWeight: 'bold', fontSize: 12, letterSpacing: '2px', opacity: 0.9 }}>EL PAÍS</Typography>
            }
          />
        </ListItem> */}
        <ListItemButton dense
          component={NavLink}
          end // https://stackoverflow.com/a/70551865
          to=''
          onClick={handleDrawerToggle}
          style={({ isActive }) => ({
            background: isActive ? '#31363822' : '',
            borderRadius: isActive ? '8px' : '',
            color: isActive ? '#313638' : '',
          })}
          sx={{
            '&:hover': {
              background: '#31363822',
              borderRadius: '8px',
              color: '#313638'
            },
            mb: 1,
            pl: 4
          }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <IconHome color='#313638' size={iconSize} stroke={iconStroke} />
          </ListItemIcon>
          <ListItemText primary='Inicio' />
        </ListItemButton>
        {
          sections.map((section) => (
            <ListItemButton 
              key={`section_${section.id}`}
              dense
              component={NavLink}
              end // https://stackoverflow.com/a/70551865
              to={section.path}
              onClick={handleDrawerToggle}
              style={({ isActive }) => ({
                background: isActive ? '#31363822' : '',
                borderRadius: isActive ? '8px' : '',
                color: isActive ? '#313638' : '',
              })}
              sx={{
                '&:hover': {
                  background: '#31363822',
                  borderRadius: '8px',
                  color: '#313638',
                },
                mb: 1,
                pl: 4
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {section.icon}
              </ListItemIcon>
              <ListItemText primary={section.label} />
            </ListItemButton>
          ))
        }
        {/* <ListItem button 
          component={NavLink}
          end // https://stackoverflow.com/a/70551865
          to=''
          onClick={handleDrawerToggle}
          style={({ isActive }) => ({
            background: isActive ? '#31363822' : '',
            borderRadius: isActive ? '8px' : '',
            color: isActive ? '#313638' : '',
          })}
          sx={{
            '&:hover': {
              background: '#31363822',
              borderRadius: '8px',
              color: '#313638',
            },
            mb: 1,
            pl: 4
          }}
        >
          <ListItemText primary='Inicio' />
        </ListItem> */}
        {/* <ListItem button 
          component={NavLink}
          end // https://stackoverflow.com/a/70551865
          to='/agenda'
          onClick={handleDrawerToggle}
          style={({ isActive }) => ({
            background: isActive ? '#31363822' : '',
            borderRadius: isActive ? '8px' : '',
            color: isActive ? '#313638' : '',
          })}
          sx={{
            '&:hover': {
              background: '#31363822',
              borderRadius: '8px',
              color: '#313638',
            },
            mb: 1,
            pl: 4
          }}
        >
          <ListItemText primary='Agenda' />
        </ListItem>
        <ListItem button 
          component={NavLink}
          end // https://stackoverflow.com/a/70551865
          to='/ponentes'
          onClick={handleDrawerToggle}
          style={({ isActive }) => ({
            background: isActive ? '#31363822' : '',
            borderRadius: isActive ? '8px' : '',
            color: isActive ? '#313638' : '',
          })}
          sx={{
            '&:hover': {
              background: '#31363822',
              borderRadius: '8px',
              color: '#313638',
            },
            mb: 1,
            pl: 4
          }}
        >
          <ListItemText primary='Ponentes' />
        </ListItem> */}
      </List>
      <Box sx={{ marginTop: 'auto', p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} align='center'>
            <Avatar
              alt='Profile Picture'
              src={formatProfilePicture(user.photoUrl, user.authProvider)}
              sx={{ width: 64, height: 64 }}
            />
          </Grid>
          <Grid item xs={12} align='center'>
            <Typography variant='body2'>
              { user.name }
            </Typography>
            {/* <Typography variant='caption'>
              { user.email }
            </Typography> */}
          </Grid>
          <Grid item xs={12}>
            <Button
              color='primary'
              disableElevation
              fullWidth
              onClick={logout}
              size='small'
              variant='contained'
            >
              Cerrar sesión
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  // const LinkRouter = (props) => <Link {...props} component={RouterLink} />

  // const breadcrumbNameMap = {
  //   '/dashboard': 'Inicio',
  // }

  // const Page = () => {
  //   const location = useLocation()
  //   const pathnames = location.pathname.split('/').filter((x) => x)
  
  //   return (
  //     <Breadcrumbs 
  //       aria-label='breadcrumb'
  //       separator={<NavigateNextIcon fontSize='small' />} 
  //       sx={{ pb: 2 }}
  //     >
  //       <LinkRouter underline='hover' color='inherit' to='/dashboard'>
  //         EL PAÍS
  //       </LinkRouter>
  //       {pathnames.map((value, index) => {
  //         const last = index === pathnames.length - 1
  //         const to = `/${pathnames.slice(0, index + 1).join('/')}`
  
  //         return last ? (
  //           <Typography color='text.primary' key={to}>
  //             {breadcrumbNameMap[to]}
  //           </Typography>
  //         ) : (
  //           <LinkRouter underline='hover' color='inherit' to={to} key={to}>
  //             {breadcrumbNameMap[to]}
  //           </LinkRouter>
  //         )
  //       })}
  //     </Breadcrumbs>
  //   )
  // }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        color='secondary'
        position='absolute'
        sx={{
          boxShadow: 'none',
          display: { xs: 'flex', md: 'none' },
          ml: `${drawerWidth}px`,
          // width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant='h6' noWrap component='div'>
            <b>EL PAÍS</b>
          </Typography> */}
          {/* <Box
            component='img'
            src='/assets/images/el-pais-logo.png'
            sx={{ height: 24 }}
          /> */}
          <Typography color='white' fontWeight={900} variant='h5'>
            I M I TAT IO N
          </Typography>
          {/* <Box sx={{ flexGrow: 1 }}>
            
          </Box> */}
        </Toolbar>
      </AppBar>
      <Drawer
        // anchor='left'
        container={container}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            borderWidth: 0,
            boxSizing: 'border-box',
            width: drawerWidth
          },
          width: drawerWidth,
        }}
        variant='temporary'
      >
        { drawer }
      </Drawer>
      <Drawer
        sx={{
          display: { xs: 'none', md: 'block' },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            borderWidth: 0,
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: '#fafafa'
          },
          width: drawerWidth,
        }}
        variant='permanent'
        anchor='left'
      >
        { drawer }
      </Drawer>
      <Box
        component='main'
        sx={{ bgcolor: 'background.default', flexGrow: 1, p: { xs: 2, md: 2 } }}
      >
        <Toolbar sx={{ display: { xs: 'flex', md: 'none' } }}/>
        {/* <Page sx={{ display: { xs: 'none', md: 'flex' } }}/> */}
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='agenda' element={<Agenda />} />
          <Route path='portada' element={<Cover />} />
          <Route path='notificaciones' element={<Notifications />} />
          <Route path='ponentes' element={<Speakers />} />
          <Route path='ponentes/:id' element={<Speaker />} />
          <Route path='preguntas' element={<Questions />} />
          <Route path='videos' element={<Videos />} />
          <Route path='vivo' element={<Live />} />
          <Route path='cesar' element={<CesarModule />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default Dashboard
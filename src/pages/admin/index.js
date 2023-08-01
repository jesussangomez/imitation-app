import React, { useState } from 'react'

import {
  Link as RouterLink,
  NavLink,
  Route,
  Routes,
  useLocation
} from 'react-router-dom'

import useAuth from 'hooks/auth'

import {
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Drawer,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { 
  IconBrandYoutube,
  IconCalendarEvent,
  IconHome,
  IconQuestionMark,
  IconUsers,
} from '@tabler/icons-react'

import md5 from 'md5'

import Speakers from './speakers'
import CreateSpeaker from './speakers/create'
import Live from './live'
import Questions from './questions'
import EditSpeaker from './speakers/edit'
import Agenda from './agenda'
import CreateAgenda from './agenda/create'
import EditAgenda from './agenda/edit'

const Admin = (props) => {

  const { window } = props

  const { auth } = useAuth()
  const { logout, user } = auth

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
    { 'id': 0, 'label': 'Agenda', 'icon': <IconCalendarEvent color='#313638' size={iconSize} stroke={iconStroke} />, 'path': 'agenda' },
    { 'id': 1, 'label': 'Ponentes', 'icon': <IconUsers color='#313638' size={iconSize} stroke={iconStroke} />, 'path': 'ponentes' },
    // { 'id': 2, 'label': 'Haz tu portada', 'icon': <IconId color='#313638' size={iconSize} stroke={iconStroke} />, 'path': 'portada' },
    // { 'id': 3, 'label': 'Notificaciones', 'icon': <IconNotification color='#313638' size={iconSize} stroke={iconStroke} />, 'path': 'notificaciones' },
    // { 'id': 4, 'label': 'Videos', 'icon': <IconMovie color='#313638' size={iconSize} stroke={iconStroke} />, 'path': 'videos' },
    { 'id': 5, 'label': 'Preguntas', 'icon': <IconQuestionMark color='#313638' size={iconSize} stroke={iconStroke} />, 'path': 'preguntas' },
    { 'id': 6, 'label': 'Evento en vivo', 'icon': <IconBrandYoutube color='#313638' size={iconSize} stroke={iconStroke} />, 'path': 'vivo' },
  ]

  const drawer = (
    <>
      <Toolbar sx={{ bgcolor: '#313638', minHeight: '96px !important' }}>
        <Grid container>
          <Grid item xs align='middle'>
            <Box>
              <img
                src='/assets/images/menu-logo.png'
                alt='Foro Sonora'
                style={{ verticalAlign: 'middle', width: '80%' }}
              />
            </Box>
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
        <ListItem button dense
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
          <ListItemIcon sx={{ minWidth: 32 }}>
            <IconHome color='#313638' size={iconSize} stroke={iconStroke} />
          </ListItemIcon>
          <ListItemText primary='Inicio' />
        </ListItem>
        {
          sections.map((section) => (
            <ListItem 
              key={`section_${section.id}`}
              button 
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
            </ListItem>
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
            <Typography variant='caption'>
              { user.email }
            </Typography>
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

  const LinkRouter = (props) => <Link {...props} component={RouterLink} />

  const breadcrumbNameMap = {
    '/admin': 'Inicio',
    '/admin/agenda': 'Agenda',
    '/admin/agenda/edit': 'Editar',
    '/admin/ponentes': 'Ponentes',
    '/admin/ponentes/crear': 'Crear',
    '/admin/ponentes/edit': 'Editar',
    '/admin/preguntas': 'Preguntas',
    '/admin/videos': 'Videos',
    '/admin/vivo': 'Evento en vivo',
  }

  const Page = () => {
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x)
  
    return (
      <Breadcrumbs 
        aria-label='breadcrumb'
        separator={<NavigateNextIcon fontSize='small' />} 
        sx={{ pb: 2 }}
      >
        <LinkRouter underline='hover' color='inherit' to='/dashboard'>
          El País
        </LinkRouter>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
  
          return last ? (
            <Typography color='text.primary' key={to}>
              {breadcrumbNameMap[to]}
            </Typography>
          ) : (
            <LinkRouter underline='hover' color='inherit' to={to} key={to}>
              {breadcrumbNameMap[to]}
            </LinkRouter>
          )
        })}
      </Breadcrumbs>
    )
  }

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
          <Box
            component='img'
            src='/assets/images/el-pais-logo.png'
            sx={{ height: 24 }}
          />
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
            // bgcolor: '#fafafa'
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
        sx={{ flexGrow: 1, p: { xs: 2, md: 2 } }}
      >
        <Toolbar sx={{ display: { xs: 'flex', md: 'none' } }}/>
        <Page />
        <Routes>
          <Route path='ponentes' element={<Speakers />} />
          <Route path='agenda' element={<Agenda />} />
          <Route path='agenda/crear' element={<CreateAgenda />} />
          <Route path='agenda/edit/:id' element={<EditAgenda />} />
          <Route path='ponentes/crear' element={<CreateSpeaker />} />
          <Route path='ponentes/edit/:id' element={<EditSpeaker />} />
          <Route path='preguntas' element={<Questions />} />
          <Route path='vivo' element={<Live />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default Admin
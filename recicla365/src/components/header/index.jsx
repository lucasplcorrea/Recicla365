import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import RecyclingIcon from '@mui/icons-material/Recycling';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom

export default function HeaderWithProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    // Função para obter o nome do usuário do localStorage
    const getUsernameFromLocalStorage = () => {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        // Extrair apenas o primeiro nome do usuário
        const firstName = userData.nome.split(' ')[0];
        setUsername(firstName);
      }
    };

    getUsernameFromLocalStorage();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Limpa os dados do usuário do localStorage
   window.location.href = '/login'; // Redireciona para a página de login
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Recicla365
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={anchorEl ? 'account-menu' : undefined}
                aria-haspopup="true"
                onClick={handleMenuClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={anchorEl ? 'account-menu' : undefined}
                aria-haspopup="true"
                onClick={handleMenuClick}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Olá, {username}
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/cadastro-coletas" onClick={handleClose}>
          <ListItemIcon>
            <RecyclingIcon fontSize="small" />
          </ListItemIcon>
          Cadastrar Novo Ponto
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" style={{ color: 'red' }} />
          </ListItemIcon>
          <Typography style={{ color: 'red' }}>Logout</Typography>
        </MenuItem>
      </Menu>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <List>
          <ListItem button component={Link} to="/dashboard" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/cadastro" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Novo Usuário" />
          </ListItem>
          <ListItem button component={Link} to="/cadastro-coletas" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <AddLocationAltIcon />
            </ListItemIcon>
            <ListItemText primary="Novo Local de Coleta" />
          </ListItem>
          <ListItem button component={Link} to="/pontos-cadastrados" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Ver Pontos de Coleta" />
          </ListItem>
          <ListItem button component={Link} to="/usuarios-cadastrados" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Ver Usuários" />
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}

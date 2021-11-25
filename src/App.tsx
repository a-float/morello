import './App.css';
import { SheetManager } from './components/SheetManager'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

function App() {
  return (
    <Box className="App" sx={{ flexGrow: 1, height: "100vh", display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" className="gradient-bg" sx={{ mb: "0.5em", flex: "0 auto" }}>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className="title-font" sx={{ textAlign: "center", flexGrow: 1 }}>
            Morello
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="settings gear"
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SheetManager />
    </Box >
  );
}

export default App;

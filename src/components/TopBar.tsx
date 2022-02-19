import { FunctionComponent } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

export interface TopBarProps {
    onToggleSheetDrawer: (toggle: boolean) => void,
    onToggleSettingsDrawer: (toggle: boolean) => void
}

const TopBar: FunctionComponent<TopBarProps> = (props) => {
    return (
        <AppBar position="sticky" sx={{backgroundColor:"white", mixBlendMode: "screen", color:"black", flex: "0 auto" }}>
            <Toolbar variant="dense">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => props.onToggleSheetDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" className="title-font" sx={{ fontSize: "1.7rem", fontFamily: 'Dancing Script, cursive', textAlign: "center", flexGrow: 1 }}>
                    Morello
                </Typography>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="settings gear"
                    onClick={() => props.onToggleSettingsDrawer(true)}
                >
                    <SettingsIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;
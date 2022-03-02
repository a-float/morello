import { FunctionComponent } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export interface TopBarProps {
    onToggleSheetDrawer: (toggle: boolean) => void,
    isSheetDrawerOpen: boolean,
    onToggleSettingsDrawer: (toggle: boolean) => void
}

const TopBar: FunctionComponent<TopBarProps> = (props) => {
    return (
        <AppBar position="sticky" color='secondary' sx={{zIndex: (theme) => theme.zIndex.drawer + 1, flex: "0 auto" }}>
            <Toolbar variant="dense">
                <IconButton
                    size="large"
                    edge="start"
                    color="primary"
                    aria-label="menu open"
                    onClick={() => props.onToggleSheetDrawer(!props.isSheetDrawerOpen)}
                >
                    {props.isSheetDrawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
                <Typography variant="h6" color="primary" component="div" sx={{ fontSize: "1.7rem", fontFamily: 'Dancing Script, cursive', textAlign: "center", flexGrow: 1 }}>
                    Morello
                </Typography>
                <IconButton
                    size="large"
                    edge="end"
                    color="primary"
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
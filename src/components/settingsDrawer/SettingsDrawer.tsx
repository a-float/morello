import { FunctionComponent } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TopBarSpacer from '../TopBarSpacer'
import themes, { createOptions } from '../../themes'
import Grid from "@mui/material/Grid"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThemePreview from './ThemePreview';
import { Button, FormControlLabel, Switch, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import TagEditor from './TagEditor'

type settingsManagerProps = {
    isDrawerOpen: boolean,
    onToggleDrawer: (toggle: boolean) => void,
    currentThemeName: string,
    onSelectTheme: (name: string) => void,
    onSetDarkMode: (dark: boolean) => void,
    isDarkMode: boolean
}

const SettingsDrawer: FunctionComponent<settingsManagerProps> = (props) => {
    const darkMode = useTheme().palette.mode === "dark"
    const themePreviews = themes.map(t => (
        <Grid item xs={6} key={t.name}>
            <ThemeProvider theme={createTheme(createOptions(t.options, darkMode))}>
                <Button onClick={() => props.onSelectTheme(t.name)}
                    sx={{
                        width: "100%", flexDirection: 'column',
                        ...(t.name === props.currentThemeName ? { color: t.options.palette.primary.dark } : {}),
                        backgroundColor: (t.name === props.currentThemeName) ? t.options.palette.primary.main + '50' : null
                    }}
                    disabled={t.name === props.currentThemeName}>
                    <ThemePreview />
                    {t.name}
                </Button>
            </ThemeProvider>
        </Grid >)
    )

    return (
        <Drawer
            anchor={"right"}
            open={props.isDrawerOpen}
            onClose={_ => props.onToggleDrawer(false)}
            id="settings-drawer"
            PaperProps={{
                sx: { minWidth: "200px", maxWidth: "350px", width: "fit-content" },
            }}
        >
            <TopBarSpacer />
            <Box id="settings-container">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="tag-panel-content"
                        id="tag-panel-header"
                    >
                        <Typography>Tags</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TagEditor />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="theme-panel-content"
                        id="theme-panel-header"
                    >
                        <Typography>Themes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControlLabel
                            sx={{ margin: 0 }}
                            value="dark mode"
                            control={<Switch color="primary" />}
                            label="Dark mode"
                            labelPlacement="start"
                            onChange={(e: any) => {
                                props.onSetDarkMode(!props.isDarkMode)
                            }
                            }
                            checked={props.isDarkMode}
                        />
                        <Divider sx={{ marginBottom: "15px" }} />
                        <Grid container spacing={2}>
                            {themePreviews}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Drawer>
    )
}

export default SettingsDrawer
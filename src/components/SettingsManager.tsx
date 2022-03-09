import { FunctionComponent } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TopBarSpacer from './TopBarSpacer'
import themes from '../themes'
import Grid from "@mui/material/Grid"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThemePreview from './ThemePreview';
import { Button, FormControlLabel, Switch, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import { defaultTagColors } from '../tags';
import TagEditItem from './TagEditItem';

type settingsManagerProps = {
    isDrawerOpen: boolean,
    onToggleDrawer: (toggle: boolean) => void,
    currentThemeName: string,
    onSelectTheme: (name: string) => void,
    onSetDarkMode: (dark: boolean) => void,
    isDarkMode: boolean
    onChangeTagColors: (colors: Map<string, string>) => void,
}

const SettingsManager: FunctionComponent<settingsManagerProps> = (props) => {
    const themePreviews = themes.map(t => <Grid item xs={6} key={t.name}>
        <ThemeProvider theme={createTheme(t.options)}>
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

    const tagEditItems = [...defaultTagColors.keys()].map(k =>
        <TagEditItem key={k}
            name={k}
            color={defaultTagColors.get(k) || 'red'} />)

    return (
        <Drawer
            anchor={"right"}
            open={props.isDrawerOpen}
            onClose={event => props.onToggleDrawer(false)}
            id="settings-drawer"
        >
            <TopBarSpacer />
            <Box id="settings-container" sx={{ minWidth: "200px", maxWidth: "300px" }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="tag-panel-content"
                        id="tag-panel-header"
                    >
                        <Typography>Tags</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={3}>
                            {tagEditItems}
                        </Stack>
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
                                console.log(props.isDarkMode);
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

export default SettingsManager
import { Component } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type settingsManagerProps = {
    isDrawerOpen: boolean,
    onToggleDrawer: (toggle: boolean) => void
}

type settingsManagerState = {

}

class SettingsManager extends Component<settingsManagerProps, settingsManagerState>{
    render() {
        return (

            <Drawer
                anchor={"right"}
                open={this.props.isDrawerOpen}
                onClose={event => this.props.onToggleDrawer(false)}
                id="settings-drawer"
            >
                <Box id="settings-container" sx={{ minWidth: "200px", maxWidth: "300px" }}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Labels</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Themes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Drawer>

        )
    }
}

export default SettingsManager
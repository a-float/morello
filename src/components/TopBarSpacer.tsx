// import { useTheme } from "@mui/material/styles"
import { FunctionComponent } from "react"
import Box from "@mui/material/Box"
/*
Placed at the top of the drawers. Acts as padding. TODO change hardcoded background color to something transparent?
opactity and visibility don't work
*/
const TopBarSpacer: FunctionComponent<{}> = (props) => {
    // const theme = useTheme()
    // TODO fix hardcoded height. all mixins breaks when the screen size is close to a tablet
    return <Box sx={{ minHeight: { xs: "48px" } }} />
}

export default TopBarSpacer
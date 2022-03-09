import { FunctionComponent, useState, useRef } from "react";
import Stack from "@mui/material/Stack"
import { SketchPicker } from 'react-color';
import Popover from '@mui/material/Popover'
import { Button, Typography } from "@mui/material";
import { defaultTagColors } from "../tags";

type TagEditItemProps = {
    name: string,
    color: string
}

// TODO create one shared Popover for all tag items?
const TagEditItem: FunctionComponent<TagEditItemProps> = (props) => {
    const [state, setState] = useState({ pickerOpen: false, currColor: props.color })
    const anchorElement = useRef(null)
    return (
        <>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body1">{props.name}</Typography>
                <Button ref={anchorElement} variant="contained" onClick={event => { setState({ ...state, pickerOpen: true }) }}
                    sx={{ backgroundColor: state.currColor, minHeight: "20px", maxWidth: "30px", marginRight:"6px"}}>
                </Button>
            </Stack>
            <Popover
                id={'color-picker-tag-' + props.name}
                open={state.pickerOpen}
                anchorEl={anchorElement.current}
                onClose={() => setState({ ...state, pickerOpen: false })}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <SketchPicker
                    color={state.currColor}
                    onChange={color => setState({ ...state, currColor: color.hex })}
                    onChangeComplete={color => defaultTagColors.set(props.name, color.hex)} />
            </Popover>
        </>
    )
}

export default TagEditItem
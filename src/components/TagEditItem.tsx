import { FunctionComponent } from "react";
import Stack from "@mui/material/Stack"

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import { TagManager } from '../TagManager'
import styled from "@mui/material/styles/styled";
import { colord, extend } from 'colord'
import mixPlugin from "colord/plugins/mix";
extend([mixPlugin]);

type TagEditItemProps = {
    name: string,
    color: string,
    onOpenPicker: (target: EventTarget, name: string) => void
    onChangeName: (oldName: string, newName: string) => null | string
}

// TODO create one shared Popover for all tag items?
const TagEditItem: FunctionComponent<TagEditItemProps> = props => {
    console.log(colord(props.color).toHex());
    const darkerTone = colord(props.color).shades(5)[1].toHex()
    const StyledButton = styled(Button)`
        background-color: ${props.color};
        padding: 6px 12px;
        &:hover {
            background-color: ${darkerTone};
        }
        &:focus {
            background-color: ${darkerTone};
        }
`;
    return (
        <>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                    disabled={props.name === TagManager.defaultTag.name}
                    size='small'
                    variant="outlined"
                    defaultValue={props.name}
                    onChange={event => props.onChangeName(props.name, event.target.value)}
                    sx={{ marginRight: "20px" }} />
                <StyledButton variant="contained" onClick={event => props.onOpenPicker(event.target, props.name)}
                    sx={{ backgroundColor: props.color, minHeight: "20px", maxWidth: "30px", marginRight: "6px" }}>
                </StyledButton>
            </Stack>

        </>
    )
}

export default TagEditItem
import { FunctionComponent, useState } from "react";
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField"
import maxInputLength from "../../maxInputLengths";
import { Tag } from '../../logic/TagManager'
import styled from "@mui/material/styles/styled";
import { colord, extend } from 'colord'
import mixPlugin from "colord/plugins/mix";
import { Delete, MoreHoriz } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MyIcon from '../MyIcon'

extend([mixPlugin]);

type TagEditItemProps = {
    tag: Tag,
    onOpenPicker: (target: EventTarget, tag: Tag) => void
    onChangeName: (id: number, newName: string) => null | string,
    onDelete: (id: number) => void
}

// TODO create one shared Popover for all tag items?
const TagEditItem: FunctionComponent<TagEditItemProps> = props => {
    const darkerTone = colord(props.tag.color).shades(10)[1].toHex()
    const [anchorEl, setAnchorEl] = useState<null | any>(null) // TODO bad any
    const open = Boolean(anchorEl)
    const openMenu = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget)
    }

    const StyledButton = styled(Button)`
        background-color: ${props.tag.color};
        padding: 0px;
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
                    inputProps={{ maxLength: maxInputLength.tagName }}
                    size='small'
                    variant="outlined"
                    defaultValue={props.tag.name}
                    onChange={event => props.onChangeName(props.tag.id, event.target.value)}
                    sx={{ marginRight: "20px", minWidth: "18ch" }} />
                <StyledButton
                    variant="contained"
                    onClick={event => props.onOpenPicker(event.target, props.tag)}
                    sx={{ backgroundColor: props.tag.color, minWidth: "2em", width: "20%", minHeight: "1.7em", margin: "0px 20px 0px 10px" }} />
                <MyIcon color="#aaaaaa" hoverColor="#666666" onClick={openMenu}>
                    <MoreHoriz />
                </MyIcon>
            </Stack>
            <Menu
                id="delete-tag-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}>
                <MenuItem dense={true} onClick={(event) => { setAnchorEl(null); props.onDelete(props.tag.id); }}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </>
    )
}

export default TagEditItem
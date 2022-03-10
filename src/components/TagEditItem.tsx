import { FunctionComponent } from "react";
import Stack from "@mui/material/Stack"

import { Button, Typography } from "@mui/material";

type TagEditItemProps = {
    name: string,
    color: string,
    onOpenPicker: (target: EventTarget, name: string) => void
}

// TODO create one shared Popover for all tag items?
const TagEditItem: FunctionComponent<TagEditItemProps> = props => {
    return (
        <>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body1">{props.name}</Typography>
                <Button variant="contained" onClick={event => props.onOpenPicker(event.target, props.name)}
                    sx={{ backgroundColor: props.color, minHeight: "20px", maxWidth: "30px", marginRight: "6px" }}>
                </Button>
            </Stack>

        </>
    )
}

export default TagEditItem
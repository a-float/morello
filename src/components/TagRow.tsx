import { Box, Stack } from '@mui/material'
import { AssertionError } from 'assert'
import { FunctionComponent } from 'react'
import { tagColors } from '../tmpUtils'

const TagBar: FunctionComponent<{ color: string; }> = (props) => {
    return (
        <Box
            sx={{
                width: "2.7em",
                height: "0.4em",
                backgroundColor: props.color
            }}>

        </Box>
    )
}

export const TagRow: FunctionComponent<{ tags: string[] }> = (props) => {
    if (!props.tags.every(t => tagColors.has(t))) {
        throw new AssertionError({ message: "Invalid tag name among [" + props.tags + "]" })
    }
    // const tagChips = props.tags.map(tagName => <TinyChip key={tagName} size="small" label={tagName} style={{ backgroundColor: tagColors.get(tagName) }} />)
    const tagBars = props.tags.map(tagName => <TagBar key={tagName} color={tagColors.get(tagName) || "red"} />)

    if (tagBars.length > 0) {
        return (
            <Stack direction="row" spacing={1} sx={{ maxWidth: "85%", marginBottom: "0.5em" }}>
                {tagBars}
            </Stack>
        )
    } else return null
}
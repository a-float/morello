import { Box, Stack } from '@mui/material'
import { FunctionComponent, useContext } from 'react'
import { TagContext } from '../../TagManager'

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

export const TagRow: FunctionComponent<{ tags: number[] }> = (props) => {
    // const tagChips = props.tags.map(tagName => <TinyChip key={tagName} size="small" label={tagName} style={{ backgroundColor: tagColors.get(tagName) }} />)
    const {tagManager} = useContext(TagContext)
    if (props.tags.length > 0) {
        return (
            <Stack direction="row" spacing={1} sx={{ maxWidth: "85%", marginBottom: "0.5em" }}>
                {props.tags.map(tagId => <TagBar key={tagId} color={tagManager.getColor(tagId)} />)}
            </Stack>
        )
    } else return null
}
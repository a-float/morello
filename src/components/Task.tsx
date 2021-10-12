import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { styled } from '@mui/material/styles'
import { tagColors } from '../tmpUtils'
import { AssertionError } from 'assert';
import { Edit, Minimize, Close } from '@mui/icons-material';
// import EditableTaskContent from "./EditableTaskContent"
import MyIcon from "./MyIcon"
import { grey } from '@mui/material/colors';

const CardContentEvenPadding = styled(CardContent)(`
    padding: 1em;
    &:last-child{
        padding-bottom: 1em;
    }
`);
const TinyChip = styled(Chip)(`
    margin-bottom: 0.5em;
    padding: 0 0.5;
    font-size: 0.7em;
`);

export interface TaskData {
    id: string,
    columnName?: string,
    name: string,
    tags: string[] | [],
    dueDate?: Date,
    descr?: string,
}
export type TaskProps = {
    onDeleteTask: (id: string) => void
    onStartEdit: (id: string) => void
} & TaskData

export const Task: FunctionComponent<TaskProps> = (props) => {
    const [state, setState] = useState({ showDescr: true, showBar: false })
    const startEdit = () => props.onStartEdit(props.id)
    const toggleDescrVisibility = () => {
        setState(prevState => ({
            ...prevState,
            showDescr: !prevState.showDescr
        }))
    }

    if (!props.tags.every(t => tagColors.has(t))) {
        throw new AssertionError({ message: "Invalid tag name among [" + props.tags + "]" })
    }
    const tagChips = props.tags.map(tagName => <TinyChip key={tagName} size="small" label={tagName} style={{ backgroundColor: tagColors.get(tagName) }} />)

    return (
        <Card elevation={6} sx={{ minWidth: 275, position:"relative" }}
            onMouseEnter={() => { setState(prevState => ({ ...prevState, showBar: true })) }}
            onMouseLeave={() => { setState(prevState => ({ ...prevState, showBar: false })) }}>
            {/* {props.id} */}
            {state.showBar &&
                <Stack position="absolute" right="10px" direction="row" alignItems="center" justifyContent="flex-end">
                    id={props.id}&nbsp;
                    <MyIcon color={grey[500]} hoverColor={grey[900]} onClick={startEdit}>
                        <Edit fontSize="small" />
                    </MyIcon>
                    <MyIcon color={grey[500]} hoverColor={grey[900]}>
                        <Minimize fontSize="small"
                            onClick={toggleDescrVisibility} />
                    </MyIcon>
                    <MyIcon color={grey[500]} hoverColor={grey[900]}>
                        <Close fontSize="small" onClick={() => props.onDeleteTask(props.id)} />
                    </MyIcon>
                </Stack>
            }
            <CardContentEvenPadding onDoubleClick={startEdit}>
                <Typography variant="h5" component="div">
                    {props.name}
                </Typography>
                {
                    tagChips.length > 0 && <Stack direction="row" spacing={1}>
                        {tagChips}
                    </Stack>
                }
                {state.showDescr &&
                    <Typography sx={{ whiteSpace: "pre-wrap" }} variant='body1' component="div">
                        {props.descr}
                    </Typography>
                }
            </CardContentEvenPadding>
        </Card >
    )
}
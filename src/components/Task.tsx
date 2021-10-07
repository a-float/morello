import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { styled } from '@mui/material/styles'
import { tagColors } from '../tmpUtils'
import { AssertionError } from 'assert';
import { Edit, Minimize, Close } from '@mui/icons-material';
import EditableTaskContent from "./EditableTaskContent"
import MyIcon from "./MyIcon"
import { grey } from '@mui/material/colors';

const CardContentEvenPadding = styled(CardContent)(`
    padding: 1em;
    position: relative;
    &:last-child{
        padding-bottom: 1em;
    }
`);
const TinyChip = styled(Chip)(`
    margin-bottom: 0.5em;
    padding: 0 0.5;
    font-size: 0.7em;
`);

export interface TaskProps {
    id?: string,
    name: string,
    tags: string[] | [],
    duaDate?: Date,
    descr?: string
}

export const Task: FunctionComponent<TaskProps> = (props) => {
    const [state, setState] = useState({ name: "Task name", descr: "Default task description", editable: false }) // TODO move these up?

    if (!props.tags.every(t => tagColors.has(t))) {
        throw new AssertionError({ message: "Invalid tag name among [" + props.tags + "]" })
    }
    const tagChips = props.tags.map(tagName => <TinyChip key={tagName} size="small" label={tagName} style={{ backgroundColor: tagColors.get(tagName) }} />)
    const onStartEdit = () => setState({ ...state, editable: true })
    const onEndEdit = () => setState({ ...state, editable: false })
    const onChange = (newData: {}) => setState({ ...state, ...newData })

    return (
        <Card elevation={6} sx={{ minWidth: 275 }}
            onDoubleClick={onStartEdit}>
            <CardContentEvenPadding>
                <Stack position="absolute" right="10px" direction="row" alignItems="center" justifyContent="flex-end">
                    <MyIcon color={grey[500]} hoverColor={grey[900]} onClick={onStartEdit}>
                        <Edit fontSize="small" {...(state.editable ? { color: 'disabled' } : {})} />
                    </MyIcon>
                    <MyIcon color={grey[500]} hoverColor={grey[900]}>
                        <Minimize fontSize="small" />
                    </MyIcon>
                    <MyIcon color={grey[500]} hoverColor={grey[900]}>
                        <Close fontSize="small" />
                    </MyIcon>
                </Stack>
                {!state.editable ?
                    <>
                        <Typography variant="h5" component="div">
                            {state.name}
                        </Typography>
                        {
                            tagChips.length > 0 && <Stack direction="row" spacing={1}>
                                {tagChips}
                            </Stack>
                        }
                        <Typography variant='body1' component="div">
                            {state.descr}
                        </Typography>
                    </>
                    :
                    <EditableTaskContent
                        name={state.name} descr={state.descr} onChange={onChange} onEndEdit={onEndEdit} />
                }
            </CardContentEvenPadding>
        </Card >
    )
}
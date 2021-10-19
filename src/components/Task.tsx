import { Card, CardContent, Stack, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Edit, Minimize, Close } from '@mui/icons-material';
// import EditableTaskContent from "./EditableTaskContent"
import MyIcon from "./MyIcon"
import { grey } from '@mui/material/colors';
import { TagRow } from './TagRow'

const CardContentEvenPadding = styled(CardContent)(`
    padding: 1em;
    &:last-child{
        padding-bottom: 1em;
    }
`);

const textWrapStyle : any = {
    overflowWrap: "break-word",
    wordWrap: "break-word",
    hyphens: "auto"
}

export interface TaskData {
    id: string,
    columnId: number,
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
    return (
        <Card elevation={6} sx={{ position: "relative" }}
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
                <Typography sx={{ ...textWrapStyle }} variant="h5" component="div">
                    {props.name}
                </Typography>
                <TagRow tags={props.tags} />
                {state.showDescr &&
                    <Typography sx={{ ...textWrapStyle,  whiteSpace: "pre-wrap" }} variant='body1' component="div">
                        {props.descr}
                    </Typography>
                }
            </CardContentEvenPadding>
        </Card >
    )
}
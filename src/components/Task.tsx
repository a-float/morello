import { Card, CardContent, Stack, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Edit, Close } from '@mui/icons-material';
// import EditableTaskContent from "./EditableTaskContent"
import MyIcon from "./MyIcon"
import { grey } from '@mui/material/colors';
import { TagRow } from './TagRow'
import { Draggable } from 'react-beautiful-dnd'
import '../App.css'

const CardContentEvenPadding = styled(CardContent)(`
    padding: 0;
    &:last-child{
        padding-bottom: 0;
    }
    overflow: hidden;
    max-width: 100%;
`);

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
    index: number
} & TaskData

export const Task: FunctionComponent<TaskProps> = (props) => {
    const [state, setState] = useState({ showBar: false })
    const startEdit = () => props.onStartEdit(props.id)
    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided, snapshot) => (
                <Card
                    elevation={0}
                    onMouseEnter={() => { setState(prevState => ({ ...prevState, showBar: true })) }}
                    onMouseLeave={() => { setState(prevState => ({ ...prevState, showBar: false })) }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                        position: "relative",
                        marginBottom: '0.34em',
                        padding: '0.25em 0.45em',
                        boxShadow: '0px 3px 1px 0px rgba(0,0,0,0.15)',
                        backgroundColor: snapshot.isDragging ? 'lightblue' : 'white'
                    }}
                >
                    {state.showBar &&
                        <Stack position="absolute" right="0px" top="0.2em" direction="row" alignItems="center" justifyContent="flex-end">
                            {/* id={props.id}&nbsp;index={props.index}&nbsp; */}
                            <MyIcon color={grey[500]} hoverColor={grey[900]} onClick={startEdit}>
                                <Edit fontSize="inherit" sx={{ fontSize: "0.6em" }} />
                            </MyIcon>
                            <MyIcon color={grey[500]} hoverColor={grey[900]}>
                                <Close fontSize="inherit" sx={{ fontSize: "0.6em" }} onClick={() => props.onDeleteTask(props.id)} />
                            </MyIcon>
                        </Stack>
                    }
                    <CardContentEvenPadding onDoubleClick={startEdit}>
                        <TagRow tags={props.tags} />
                        <Typography variant='subtitle1' sx={{ lineHeight: '1.25' }} component="div">
                            {props.name}
                        </Typography>
                        <Typography variant='body2' sx={{ lineHeight: '1.25' }} component="div">
                            {props.descr}
                        </Typography>
                    </CardContentEvenPadding>
                </Card >
            )
            }
        </Draggable >
    )
}
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
import { useTheme } from "@mui/material/styles"

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
    const theme = useTheme()
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
                        marginBottom: '0.5em',
                        padding: '0.6em 0.6em',
                        border: snapshot.isDragging ? `solid 3px ${theme.palette.primary.main}` : "none",
                    }}
                >
                    {state.showBar &&
                        <Stack position="absolute" right="0px" top="0.2em" direction="row" alignItems="center" justifyContent="flex-end">
                            {/* id={props.id}&nbsp;index={props.index}&nbsp; */}
                            <MyIcon color={grey[500]} hoverColor={grey[900]} onClick={startEdit}>
                                <Edit fontSize="inherit" />
                            </MyIcon>
                            <MyIcon color={grey[500]} hoverColor={grey[900]}>
                                <Close fontSize="inherit" onClick={() => props.onDeleteTask(props.id)} />
                            </MyIcon>
                        </Stack>
                    }
                    <CardContentEvenPadding onDoubleClick={startEdit}>
                        <TagRow tags={props.tags} />
                        <Typography variant='subtitle1' sx={{ lineHeight: '1.25' }} component="div">
                            {props.name}
                        </Typography>
                        {props.descr && <Typography variant='body2' sx={{ whiteSpace: "pre-line", marginTop: "0.3em", lineHeight: '1.25', color: grey[500] }} component="div">
                            {props.descr}
                        </Typography>}
                    </CardContentEvenPadding>
                </Card >
            )
            }
        </Draggable >
    )
}
import { Close, Edit, Add } from '@mui/icons-material'
import { Button, Stack, Typography, TextField, Box, useTheme } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import MyIcon from '../MyIcon'
import { Task, TaskData } from './Task'
import { grey } from '@mui/material/colors'
import { Droppable } from 'react-beautiful-dnd'

export interface TaskColumnData {
    name: string,
    tasks: TaskData[]
}
export type TaskColumnProps = {
    onAddNewTask: (columnName: string) => void,
    onStartTaskEdit: (id: string) => void,
    onDeleteTask: (id: string, columnName: string) => void,
    onNameChange: (oldName: string, newName: string) => void,
    onDeleteColumn: (columnName: string) => void
} & TaskColumnData

export const TaskColumn: FunctionComponent<TaskColumnProps> = (props) => {
    // TODO make column name edition similar to EditableListItem one!
    const [state, setState] = useState({ editable: false, name: props.name, showBar: false })
    const tasks = props.tasks.map((taskData, index) =>
        <Task
            index={index}
            key={taskData.id}
            {...taskData}
            onStartEdit={props.onStartTaskEdit}
            onDeleteTask={(id) => { props.onDeleteTask(id, props.name) }} />
    )
    const bgColor = useTheme().palette.mode === 'dark' ? 'rgba(30,30,30, .7)' : 'rgba(255, 255, 255, .6)'
    return (
        <Stack spacing={1} sx={{ borderRadius: "4px", width: '30%', minWidth: '200px', maxWidth: "280px", minHeight: "30px", padding: '0.6em', backgroundColor: bgColor, height: "fit-content" }}>
            <Box
                sx={{ position: 'relative' }}
                onDoubleClick={() => { setState(prevState => ({ ...prevState, showBar: false, editable: true })) }}
                // do not display the option bar, while title is editable
                onMouseEnter={() => { !state.editable && setState(prevState => ({ ...prevState, showBar: true })) }}
                onMouseLeave={() => { !state.editable && setState(prevState => ({ ...prevState, showBar: false })) }}
            >
                {state.showBar &&
                    <Stack position="absolute" right="-0.1em" top="-0.1em" direction="row" alignItems="center" justifyContent="flex-end">
                        <MyIcon color={grey[500]} hoverColor={grey[900]}
                            onClick={() => setState(prevState => ({ ...prevState, editable: true, showBar: false }))}>
                            <Edit fontSize="inherit" />
                        </MyIcon>
                        <MyIcon color={grey[500]} hoverColor={grey[900]}
                            onClick={() => props.onDeleteColumn(props.name)}>
                            <Close fontSize="inherit" />
                        </MyIcon>
                    </Stack>
                }
                {!state.editable ?
                    <Typography align="center" variant='h5' sx={{ color: 'text.primary' }}>{props.name}</Typography>
                    :
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        setState(prevState => ({ ...prevState, editable: false }))
                        props.onNameChange(props.name, state.name)
                    }}>
                        <Stack direction='row' sx={{ justifyContent: "space-between", alignItems: "flex-end" }}>
                            <TextField
                                autoFocus
                                label="Column Name"
                                value={state.name}
                                variant='standard'
                                onBlur={() => { setState(prevState => ({ ...prevState, editable: false })) }}
                                onChange={(event) => {
                                    setState(prevState => ({ ...prevState, name: event.target.value }))
                                }}
                            />
                            <Button type='submit'>Save</Button>
                        </Stack>

                    </form>
                }
            </Box>
            <Droppable droppableId={'col-' + props.name}>
                {provided => (
                    <div {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {tasks}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable >
            <Button variant="text"
                sx={{ color: 'text.secondary', whiteSpace: 'nowrap', justifyContent: 'flex-start' }}
                size='small'
                startIcon={<Add />}
                onClick={() => props.onAddNewTask(props.name)}>
                Add new task
            </Button>
        </Stack>




    )
}

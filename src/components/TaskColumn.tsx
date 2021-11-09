import { Close, Edit } from '@mui/icons-material'
import { Button, Stack, Typography, TextField, Box } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import MyIcon from './MyIcon'
import { Task, TaskData } from './Task'
import { grey, red } from '@mui/material/colors'
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
    return (
        <Stack spacing={1} sx={{ minWidth: '220px' }}>
            <Box
                sx={{ position: 'relative' }}
                onDoubleClick={() => { setState(prevState => ({ ...prevState, showBar: false, editable: true })) }}
                // do not display the option bar, while title is editable
                onMouseEnter={() => { !state.editable && setState(prevState => ({ ...prevState, showBar: true })) }}
                onMouseLeave={() => { !state.editable && setState(prevState => ({ ...prevState, showBar: false })) }}
            >
                {state.showBar &&
                    <Stack position="absolute" right="10px" direction="row" alignItems="center" justifyContent="flex-end">
                        <MyIcon color={grey[500]} hoverColor={grey[900]}
                            onClick={() => setState(prevState => ({ ...prevState, editable: true, showBar: false }))}>
                            <Edit fontSize="small" />
                        </MyIcon>
                        <MyIcon color={red[500]} hoverColor={red[900]}>
                            <Close fontSize="small" onClick={() => props.onDeleteColumn(props.name)} />
                        </MyIcon>
                    </Stack>
                }
                {!state.editable ?
                    <Typography align="center" variant='h4'>{props.name}</Typography>
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
                                // onBlur={()=>{setState(prevState => ({...prevState, editable:false}))}}
                                onChange={(event) => {
                                    setState(prevState => ({ ...prevState, name: event.target.value }))
                                }}
                            />
                            <Button type='submit'>Save</Button>
                        </Stack>
                    </form>}

            </Box>
            <Droppable droppableId={'col-' + props.name}>
                {provided => (
                    <div 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {tasks}
                        {provided.placeholder}
                    </div>

                )}
            </Droppable>

            <Button variant="contained" color="primary" onClick={() => props.onAddNewTask(props.name)}>
                Add
            </Button>
        </Stack>
    )
}

import { Button, Stack, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { Task, TaskData } from './Task'

export interface TaskColumnProps {
    name: string
    tasks: TaskData[] | [],
    addNewTask: (columnName: string) => void,
    onStartTaskEdit: (id: string) => void,
    onDeleteTask: (id: string) => void
}

export const TaskColumn: FunctionComponent<TaskColumnProps> = (props) => {
    const tasks = props.tasks.map(taskData =>
        <Task
            key={taskData.id}
            {...taskData}
            onStartEdit={props.onStartTaskEdit}
            onDeleteTask={props.onDeleteTask} />
    )
    return (
        <Stack sx={{ minWidth: '300px', width: "30%" }} spacing={1}>
            <Typography sx={{ textAlign: 'center', marginBottom: '0', fontSize: 28 }} color="text.primary" gutterBottom>
                {props.name}
            </Typography>
            {tasks}
            <Button variant="contained" color="primary" onClick={() => props.addNewTask(props.name)}>
                Add
            </Button>
        </Stack>
    )
}

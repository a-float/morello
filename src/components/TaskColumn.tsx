import { Button, Stack, Typography } from '@mui/material'
import React, { FunctionComponent } from 'react'
import { Task, TaskData } from './Task'

export interface TaskColumnProps {
    name: string
    tasks: TaskData[] | [],
    addNewTask: (columnName: string) => void
    deleteTask: (id: string) => void
}

export const TaskColumn: FunctionComponent<TaskColumnProps> = (props) => {
    const tasks = props.tasks.map(taskData => <Task key={taskData.id} {...taskData} deleteTask={props.deleteTask} />)
    return (
        <Stack sx={{ maxWidth: "33%" }} spacing={1}>
            <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
                {props.name}
            </Typography>
            {tasks}
            <Button variant="contained" color="primary" onClick={() => props.addNewTask(props.name)}>
                Add
            </Button>
        </Stack>
    )
}

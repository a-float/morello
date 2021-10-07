import { Button, Stack, Typography } from '@mui/material'
import React, { FunctionComponent } from 'react'
import { Task, TaskProps } from './Task'

export interface TaskColumnProps {
    name: string
    tasks: TaskProps[] | [],
    // addNewTask: (columnName: string) => void
}

export const TaskColumn: FunctionComponent<TaskColumnProps> = (props) => {
    const tasks = props.tasks.map(taskData => <Task key={taskData.name} name={taskData.name} descr={taskData.descr} tags={taskData.tags} />)
    return (
        <Stack sx={{ maxWidth: "33%" }} spacing={1}>
            <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
                {props.name}
            </Typography>
            {tasks}
            <Button variant="contained" color="primary">
                Add
            </Button>
        </Stack>
    )
}

import React from 'react'
import { TaskColumn, TaskColumnProps } from './TaskColumn'
import { Stack, Container } from '@mui/material'

export interface TaskDisplayProps {
    columns: [] | TaskColumnProps[]
}

export class TaskDisplay extends React.Component<TaskDisplayProps>{
    render() {
        const columns = this.props.columns.map(col => <TaskColumn key={col.name} name={col.name} tasks={col.tasks} />)
        return (
            <Container>
                <Stack direction="row" spacing={3}>
                    {columns}
                </Stack>
            </Container>
        )
    }
}
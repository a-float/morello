import React from 'react'
import { TaskColumn } from './TaskColumn'
import { Stack, Container } from '@mui/material'
import { TaskData } from './Task'
import { data, defaultTask } from "../database"

export interface TaskDisplayProps {
}

interface TaskDisplayState {
    tasks: TaskData[]
}

export class TaskDisplay extends React.Component<TaskDisplayProps, TaskDisplayState>{
    constructor(props: TaskDisplayProps) {
        super(props)
        this.state = {
            tasks: data
        }
        this.addNewTask = this.addNewTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }
    addNewTask(columnName: string) {
        const id = Math.floor(Math.random() * 100000).toString()
        this.setState({ tasks: [...this.state.tasks, { ...defaultTask, columnName, id }] })
        console.log(id)
    }
    deleteTask(id: string) {
        this.setState({ tasks: this.state.tasks.filter(task => task.id !== id) })
    }
    render() {
        const columns = ["Done", "To Do", "In Progress"].map(col =>
            <TaskColumn
                addNewTask={this.addNewTask}
                deleteTask={this.deleteTask}
                key={col}
                name={col}
                tasks={this.state.tasks.filter(task => task.columnName === col)}
            />)
        return (
            <Container>
                <Stack direction="row" spacing={3}>
                    {columns}
                </Stack>
            </Container>
        )
    }
}
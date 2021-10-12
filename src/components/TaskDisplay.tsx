import React from 'react'
import { TaskColumn } from './TaskColumn'
import { Stack, Container } from '@mui/material'
import { TaskData } from './Task'
import { data, defaultTask } from "../database"
import { TaskEditor } from './TaskEditor'

export interface TaskDisplayProps {
}

interface TaskDisplayState {
    tasks: TaskData[]
    idToEdit: string | null
}

export class TaskDisplay extends React.Component<TaskDisplayProps, TaskDisplayState>{
    constructor(props: TaskDisplayProps) {
        super(props)
        this.state = {
            tasks: data,
            idToEdit: null
        }
        this.addNewTask = this.addNewTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.onStartTaskEdit = this.onStartTaskEdit.bind(this)
        this.onEndTaskEdit = this.onEndTaskEdit.bind(this)

    }
    addNewTask(columnName: string) {
        const id = Math.floor(Math.random() * 100000).toString()
        this.setState({ tasks: [...this.state.tasks, { ...defaultTask, columnName, id }] })
        console.log(id)
    }
    deleteTask(id: string) {
        this.setState({ tasks: this.state.tasks.filter(task => task.id !== id) })
    }
    private getTaskById(id: string) {
        const task = this.state.tasks.find(task => task.id === id)
        return task ? task : null
    }
    onStartTaskEdit(id: string) {
        this.setState(prevState => ({ ...prevState, idToEdit: id }))
    }
    private updateTask(data: TaskData) {
        const taskIdx = this.state.tasks.findIndex(task => task.id === data.id)
        this.setState(prevState => ({
            ...prevState,
            tasks: [
                ...prevState.tasks.slice(0, taskIdx),
                {
                    ...data
                },
                ...prevState.tasks.slice(taskIdx + 1)
            ]
        }));
    }
    onEndTaskEdit(data: TaskData | null) {
        if (data) this.updateTask(data)
        this.setState(prevState => ({ ...prevState, idToEdit: null }))
    }

    render() {
        const columns = ["Done", "To Do", "In Progress"].map(col =>
            <TaskColumn
                addNewTask={this.addNewTask}
                onDeleteTask={this.deleteTask}
                onStartTaskEdit={this.onStartTaskEdit}
                key={col}
                name={col}
                tasks={this.state.tasks.filter(task => task.columnName === col)}
            />)
        return (
            <Container>
                <Stack direction="row" spacing={3} sx={{ justifyContent: "center" }}>
                    {columns}
                </Stack>
                <TaskEditor
                    taskData={this.state.idToEdit ? this.getTaskById(this.state.idToEdit) : null}
                    onEndEdit={this.onEndTaskEdit} />
            </Container>
        )
    }
}
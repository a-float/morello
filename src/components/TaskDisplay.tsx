import React from 'react'
import { TaskColumn } from './TaskColumn'
import { Container, Box } from '@mui/material'
import { TaskData } from './Task'
import { data, defaultTask } from "../database"
import { TaskEditor } from './TaskEditor'

export interface TaskDisplayProps {
}

/*
    need to keep editedTaskData and isEditorOpen separately. If the editor dialog window 
    closes while the chips are dissappearing
    the closing animation gets laggy
*/
interface TaskDisplayState {
    tasks: TaskData[]
    editedTaskData: TaskData | null,
    isEditorOpen: boolean
}

export class TaskDisplay extends React.Component<TaskDisplayProps, TaskDisplayState>{
    constructor(props: TaskDisplayProps) {
        super(props)
        this.state = {
            tasks: data,
            editedTaskData: null,
            isEditorOpen: false
        }
        this.addNewTask = this.addNewTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.onStartTaskEdit = this.onStartTaskEdit.bind(this)
        this.onEndTaskEdit = this.onEndTaskEdit.bind(this)

    }
    addNewTask(columnName: string) {
        const id = Math.floor(Math.random() * 100000).toString()
        const newTaskData = { ...defaultTask, columnName, id }
        this.setState(prevState => ({
            ...prevState,
            tasks: [...this.state.tasks, newTaskData],
        }))
        console.log("A task with id " + id + " has been created.")
        this.openEditor(newTaskData)
    }
    deleteTask(id: string) {
        this.setState({ tasks: this.state.tasks.filter(task => task.id !== id) })
    }
    private getTaskById(id: string) {
        const task = this.state.tasks.find(task => task.id === id)
        return task ? task : null
    }
    onStartTaskEdit(id: string) {
        const taskData = this.getTaskById(id)
        if (taskData !== null) this.openEditor(taskData)
    }
    private openEditor(data: TaskData) {
        this.setState(prevState => ({ ...prevState, editedTaskData: data, isEditorOpen: true }))
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
        this.setState(prevState => ({ ...prevState, isEditorOpen: false }))
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
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {columns}
                </Box>
                <TaskEditor
                isOpen={this.state.isEditorOpen}
                taskData={this.state.editedTaskData}
                onEndEdit={this.onEndTaskEdit} />
            </Container>
        )
    }
}
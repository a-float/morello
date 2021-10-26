import React from 'react'
import { TaskColumn } from './TaskColumn'
import { Container, Button, Grid } from '@mui/material'
import { TaskData } from './Task'
import { defaultTask, SheetData } from "../database"
import { TaskEditor } from './TaskEditor'

export interface TaskDisplayProps {
    columns: string[],
    tasks: TaskData[],
    onChangeSheet: (data: SheetData) => void
}
/*
    need to keep editedTaskData and isEditorOpen separately. If the editor dialog window 
    closes while the chips are dissappearing
    the closing animation gets laggy
*/
interface TaskDisplayState {
    editedTaskData: TaskData | null,
    isEditorOpen: boolean
}

export class TaskDisplay extends React.Component<TaskDisplayProps, TaskDisplayState>{
    state: TaskDisplayState = {
        editedTaskData: null,
        isEditorOpen: false
    }

    addNewTask = (columnName: string) => {
        const id = Math.floor(Math.random() * 100000).toString()
        const newTask = { ...defaultTask, columnId: this.props.columns.indexOf(columnName), id }
        this.openEditor(newTask)
        console.log("A task with id " + id + " has been created.")
    }

    deleteTask = (id: string) => {
        const newTasks = [...this.props.tasks.filter(task => task.id !== id)]
        this.props.onChangeSheet({ tasks: newTasks, columns: [...this.props.columns] })
    }

    private getTaskById = (id: string) => {
        const task = this.props.tasks.find(task => task.id === id)
        return task ? task : null
    }

    startTaskEdit = (id: string) => {
        const taskData = this.getTaskById(id)
        if (taskData !== null) this.openEditor(taskData)
    }

    private openEditor = (data: TaskData) => {
        this.setState(prevState => ({ ...prevState, editedTaskData: data, isEditorOpen: true }))
    }

    private updateTask = (updatedTask: TaskData) => {
        let taskIdx = this.props.tasks.findIndex(task => task.id === updatedTask.id)
        if (taskIdx === -1) taskIdx = this.props.tasks.length;
        const newTasks = [
            ...this.props.tasks.slice(0, taskIdx),
            { ...updatedTask },
            ...this.props.tasks.slice(taskIdx + 1)
        ]
        this.props.onChangeSheet({ tasks: newTasks, columns: [...this.props.columns] })
    }

    onEndTaskEdit = (data: TaskData | null) => {
        if (data) this.updateTask(data)
        this.setState(prevState => ({ ...prevState, isEditorOpen: false }))
    }

    addNewColumn = () => {
        let columnCount = this.props.columns.length + 1
        let newName = (x: number) => "Column " + x
        while (this.props.columns.includes(newName(columnCount))) {
            columnCount += 1
        }
        const newColumns = [...this.props.columns, newName(columnCount)]
        this.props.onChangeSheet({ tasks: [...this.props.tasks], columns: newColumns })
    }

    changeColumnName = (oldName: string, newName: string) => {
        if (this.props.columns.includes(newName)) {
            console.log(`'${newName}' is already taken`)
            return
        }
        const colIdx = this.props.columns.indexOf(oldName)
        if (colIdx === -1) {
            console.log(`Internal Error: Invalid oldName: '${oldName}'`)
            return
        }
        const newColumns = [
            ...this.props.columns.slice(0, colIdx),
            newName,
            ...this.props.columns.slice(colIdx + 1)
        ]
        this.props.onChangeSheet({ tasks: [...this.props.tasks], columns: newColumns })
    }

    deleteColumn = (columnName: string) => {
        const colIdx = this.props.columns.indexOf(columnName)
        if (colIdx === -1) {
            console.error('No column with name: ' + columnName)
            return
        } else {
            const newDataSheet = {
                columns: this.props.columns.filter((col, i) => i !== colIdx),
                tasks: this.props.tasks.filter(task => task.columnId !== colIdx)
            }
            this.props.onChangeSheet(newDataSheet)
        }
    }

    render() {
        const gridColumns = [...Array(this.props.columns.length).keys()].map(colIdx =>
            <Grid key={this.props.columns[colIdx]} item xs={12} sm={6} md={4} lg={3}>
                <TaskColumn
                    onAddNewTask={this.addNewTask}
                    onDeleteTask={this.deleteTask}
                    onStartTaskEdit={this.startTaskEdit}
                    onNameChange={this.changeColumnName}
                    onDeleteColumn={this.deleteColumn}
                    name={this.props.columns[colIdx]}
                    tasks={this.props.tasks.filter(task => task.columnId === colIdx)}
                />
            </Grid>)
        return (
            <Container>
                <Grid container spacing={{ xs: 1, md: 2, xl: 2 }}>
                    {gridColumns}
                    <Grid
                        item
                        sx={{display: "flex", justifyContent: "center", alignItems: "flex-start" }}
                        xs={12} sm={6} md={4} lg={3}>
                        <Button sx={{ marginTop: "2em" }} size='small' variant='outlined' onClick={this.addNewColumn}>
                            Add new column
                        </Button>
                    </Grid>
                </Grid>
                <TaskEditor
                    isOpen={this.state.isEditorOpen}
                    taskData={this.state.editedTaskData}
                    onEndEdit={this.onEndTaskEdit} />
            </Container>
        )
    }
}
import React from 'react'
import { TaskColumn } from './TaskColumn'
import { Container, Button, Grid } from '@mui/material'
import { TaskData } from './Task'
import { defaultTask, columns, tasks } from "../database"
import { TaskEditor } from './TaskEditor'

export interface TaskDisplayProps {
}
/*
    need to keep editedTaskData and isEditorOpen separately. If the editor dialog window 
    closes while the chips are dissappearing
    the closing animation gets laggy
*/
interface TaskDisplayState {
    columns: string[],
    tasks: TaskData[],
    editedTaskData: TaskData | null,
    isEditorOpen: boolean
}

export class TaskDisplay extends React.Component<TaskDisplayProps, TaskDisplayState>{
    constructor(props: TaskDisplayProps) {
        super(props)
        this.state = {
            tasks,
            columns,
            editedTaskData: null,
            isEditorOpen: false
        }
        this.addNewTask = this.addNewTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.onStartTaskEdit = this.onStartTaskEdit.bind(this)
        this.onEndTaskEdit = this.onEndTaskEdit.bind(this)
        this.addNewColumn = this.addNewColumn.bind(this)
        this.changeColumnName = this.changeColumnName.bind(this)
        this.onDeleteColumn = this.onDeleteColumn.bind(this)
    }
    addNewTask(columnName: string) {
        const id = Math.floor(Math.random() * 100000).toString()
        const newTask = { ...defaultTask, columnId: this.state.columns.indexOf(columnName), id }
        this.setState(prevState => ({
            tasks: [...prevState.tasks, newTask]
        }))
        console.log("A task with id " + id + " has been created.")
        this.openEditor(newTask)
    }

    deleteTask(id: string) {
        this.setState(prevState => ({
            tasks: [...prevState.tasks.filter(task => task.id !== id)]
        }))
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
    private updateTask(updatedTask: TaskData) {
        const taskIdx = this.state.tasks.findIndex(task => task.id === updatedTask.id)
        this.setState(prevState => ({
            tasks: [
                ...prevState.tasks.splice(0, taskIdx),
                { ...updatedTask },
                ...prevState.tasks.splice(taskIdx + 1)
            ]
        }));
    }
    onEndTaskEdit(data: TaskData | null) {
        if (data) this.updateTask(data)
        this.setState(prevState => ({ ...prevState, isEditorOpen: false }))
    }
    addNewColumn() {
        // find new available column name
        let columnCount = Object.keys(this.state.columns).length + 1
        let newName = (x: number) => "Column #" + x
        while (this.state.columns.includes(newName(columnCount))) {
            columnCount += 1
        }
        this.setState(prevState => ({
            columns: [...prevState.columns, newName(columnCount)]
        }))
    }
    changeColumnName(oldName: string, newName: string) {
        if (this.state.columns.includes(newName)) {
            console.log(`'${newName}' is already taken`)
            return
        }
        const colIdx = this.state.columns.indexOf(oldName)
        if (colIdx === -1) {
            console.log(`Invalid oldName = '${oldName}'`)
            return
        }
        this.setState(prevState => ({
            columns: [
                ...prevState.columns.splice(0, colIdx),
                newName,
                ...prevState.columns.splice(colIdx+1)
            ]
        }))
    }
    onDeleteColumn(columnName: string){
        const colIdx = this.state.columns.indexOf(columnName)
        if(colIdx === -1){
            console.error('No column with name: ' + columnName)
            return
        } else {
            this.setState(prevState => ({
                columns: prevState.columns.filter((col, i) => i !== colIdx),
                tasks: prevState.tasks.filter(task => task.columnId !== colIdx)
            }))
        }
    }

    render() {
        const gridColumns = [...Array(this.state.columns.length).keys()].map(colIdx =>
            <Grid key={this.state.columns[colIdx]} item xs={12} sm={6} md={4} lg={3}>
                <TaskColumn
                    addNewTask={this.addNewTask}
                    onDeleteTask={this.deleteTask}
                    onStartTaskEdit={this.onStartTaskEdit}
                    onNameChange={this.changeColumnName}
                    onDeleteColumn={this.onDeleteColumn}
                    name={this.state.columns[colIdx]}
                    tasks={this.state.tasks.filter(task => task.columnId === colIdx)}
                />
            </Grid>)
        return (
            <Container>
                <Grid container spacing={{ xs: 1, md: 2, xl: 2 }}>
                    {gridColumns}
                    <Grid
                        sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}
                        item xs={12} sm={6} md={4} lg={3}>
                        <Button sx={{ marginTop: "2em" }} size='small' variant='outlined' onClick={this.addNewColumn}>
                            Add new
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
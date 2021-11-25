import React from 'react'
import { TaskColumn } from './TaskColumn'
import { Container, Button, Stack, Box } from '@mui/material'
import { TaskData } from './Task'
import { defaultTask, SheetData } from "../database"
import { TaskEditor } from './TaskEditor'
import { Add } from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

export interface TaskDisplayProps {
    columns: string[],
    tasks: TaskData[],
    onChangeSheet: (data: SheetData) => void
}
/*
    need to keep editedTaskData and isEditorOpen separately. If the editor dialog window 
    closes while the chips are disappearing
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
        // console.log("A task with id " + id + " has been created.")
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

    onDragEnd = ({ source, destination }: DropResult) => {
        // Make sure we have a valid destination
        if (destination === undefined || destination === null) return null

        // If the source and destination columns are the same
        // AND if the index is the same, the item isn't moving
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        )
            return null

        // Set start and end variables
        const startColName = source.droppableId.split('-').slice(1).join('')
        const endColName = destination.droppableId.split('-').slice(1).join('')
        const start = this.props.columns.findIndex(col => col === startColName)
        const end = this.props.columns.findIndex(col => col === endColName)

        // If start is the same as end, we're in the same column
        if (start === end) {
            const newTasks = []
            let foundCount = 0
            let taskToMove: TaskData = this.props.tasks[0] // temporary value
            for (let task of this.props.tasks) {
                if (task.columnId === start) {
                    if (foundCount === source.index) {
                        taskToMove = task
                        break
                    }
                    foundCount += 1
                }
            }
            foundCount = 0
            for (let task of this.props.tasks) {
                if (task.columnId === start) {
                    if (foundCount === destination.index) {
                        newTasks.push(taskToMove)
                    }
                    if (task.id !== taskToMove.id) {
                        newTasks.push(task)
                        foundCount += 1
                    }
                } else {
                    newTasks.push(task)
                }
            }
            if (foundCount <= destination.index) newTasks.push(taskToMove)

            this.props.onChangeSheet({ tasks: newTasks, columns: [...this.props.columns] })
            return null
        }
        else { // different columns
            const newTasks = []
            let foundCount = 0
            let taskToMove: TaskData = this.props.tasks[0] // temporary value
            for (let task of this.props.tasks) {
                if (task.columnId === start) {
                    if (foundCount === source.index) {
                        taskToMove = task
                        break
                    }
                    foundCount += 1
                }
            }
            taskToMove.columnId = end
            foundCount = 0
            console.log(destination.index)
            for (let task of this.props.tasks) {
                if (task.id === taskToMove.id) continue
                if (task.columnId === end) {
                    if (foundCount === destination.index) {
                        newTasks.push(taskToMove)
                    }
                    if (task.id !== taskToMove.id) {
                        newTasks.push(task)
                        foundCount += 1
                    }
                } else {
                    newTasks.push(task)
                }
            }
            if (foundCount <= destination.index) newTasks.push(taskToMove)
            this.props.onChangeSheet({ tasks: newTasks, columns: [...this.props.columns] })
        }
        return null
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
            <TaskColumn
                key={this.props.columns[colIdx]}
                onAddNewTask={this.addNewTask}
                onDeleteTask={this.deleteTask}
                onStartTaskEdit={this.startTaskEdit}
                onNameChange={this.changeColumnName}
                onDeleteColumn={this.deleteColumn}
                name={this.props.columns[colIdx]}
                tasks={this.props.tasks.filter(task => task.columnId === colIdx)}
            />
        )
        return (
            <Box sx={{ height: "100%" }}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Stack direction='row' spacing={1} sx={{ overflowX: 'auto', overflowY: 'auto', height:"100%", minWidth: '100vw', maxWidth: '100vw' }}>
                        {gridColumns}
                        <Button variant="text"
                            sx={{ maxHeight: '30px', color: grey[800], justifyContent: 'flex-start' }}
                            size='small'
                            startIcon={<Add />}
                            onClick={this.addNewColumn}>
                            Add new column
                        </Button>
                    </Stack>
                </DragDropContext>
                <TaskEditor
                    isOpen={this.state.isEditorOpen}
                    taskData={this.state.editedTaskData}
                    onEndEdit={this.onEndTaskEdit} />
            </Box>
        )
    }
}
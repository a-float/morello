import { FunctionComponent, useState, useRef, useEffect } from 'react'
import { TaskColumn } from './TaskColumn'
import { Stack } from '@mui/material'
import { TaskData } from './Task'
import { ColumnData, generateId } from "../../temps"
import { defaultTask } from './Task'
import { TaskEditor } from '../taskEditor/TaskEditor'
import { Add } from '@mui/icons-material'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Fab from '@mui/material/Fab'
import { SheetData } from '../../logic/sheets/sheetTypes'

export interface TaskDisplayProps {
    columns: ColumnData[],
    tasks: TaskData[],
    widthOffsets: { left: number, right: number },
    onModifySheet: (data: SheetData) => void
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

const TaskDisplay: FunctionComponent<TaskDisplayProps> = (props) => {
    const [state, setState] = useState<TaskDisplayState>({
        editedTaskData: null,
        isEditorOpen: false
    })
    const scrollRef = useRef<HTMLElement | null>(null)

    useEffect(() => {

    })

    const addNewTask = (columnId: number) => {
        // TODO make sure no two ids are the same
        const id = Math.floor(Math.random() * 100000).toString()
        let newTask = { ...defaultTask, columnId: columnId, id }
        openEditor(newTask)
    }

    const deleteTask = (id: string) => {
        const newTasks = [...props.tasks.filter(task => task.id !== id)]
        props.onModifySheet({ tasks: newTasks, columns: [...props.columns] })
    }

    const getTaskById = (id: string) => {
        const task = props.tasks.find(task => task.id === id)
        return task ? task : null
    }

    const startTaskEdit = (id: string) => {
        const taskData = getTaskById(id)
        if (taskData !== null) openEditor(taskData)
    }

    const openEditor = (data: TaskData) => {
        setState(prevState => ({ ...prevState, editedTaskData: data, isEditorOpen: true }))
    }

    const updateTask = (updatedTask: TaskData) => {
        let taskIdx = props.tasks.findIndex(task => task.id === updatedTask.id)
        if (taskIdx === -1) taskIdx = props.tasks.length;
        const newTasks = [
            ...props.tasks.slice(0, taskIdx),
            { ...updatedTask },
            ...props.tasks.slice(taskIdx + 1)
        ]
        props.onModifySheet({ tasks: newTasks, columns: [...props.columns] })
    }

    const onEndTaskEdit = (data: TaskData | null) => {
        if (data) updateTask(data)
        setState(prevState => ({ ...prevState, isEditorOpen: false }))
    }

    const onDragEnd = ({ source, destination }: DropResult) => {
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
        // get column ids using their names
        // their is was passed by the drop context, so they must exist
        const startId = props.columns.find(col => col.name === startColName)!.id
        const end = props.columns.find(col => col.name === endColName)!.id

        let taskToMove: TaskData | null = null;
        let toMoveNewTaskIdx = -1
        let oldBeforeCount = 0
        let newBeforeCount = 0
        let newTasks: (TaskData | null)[] = []
        let pushTaskInEndCheck = false
        for (const task of props.tasks) {
            if (task.columnId === startId) {
                if (oldBeforeCount === source.index) {
                    taskToMove = { ...task, columnId: end }
                } else if (newBeforeCount !== destination.index || startId !== end) {
                    newTasks.push(task)
                } else {
                    pushTaskInEndCheck = true
                }
                oldBeforeCount++;
            }
            if (task.columnId === end && task.id !== taskToMove?.id) {
                if (newBeforeCount === destination.index) {
                    toMoveNewTaskIdx = newTasks.length
                    newTasks.push(null)
                    if (pushTaskInEndCheck) {
                        newTasks.push(task)
                        pushTaskInEndCheck = false
                    }
                }
                if (startId !== end) newTasks.push(task)
                newBeforeCount++;
            }
            if (task.columnId !== startId && task.columnId !== end) {
                newTasks.push(task)
            }
        }
        if (toMoveNewTaskIdx !== -1) newTasks[toMoveNewTaskIdx] = taskToMove
        else newTasks.push(taskToMove)

        console.log(newTasks.map(task => task?.name + " " + task?.columnId).join("\n"));
        newTasks = newTasks.filter(t => t !== null)
        props.onModifySheet({ tasks: newTasks as TaskData[], columns: [...props.columns] })
    }

    const addNewColumn = () => {
        let columnCount = props.columns.length + 1
        const existingIds = props.columns.map(col => col.id)
        let newId = generateId()
        while (existingIds.includes(newId)) {
            newId = generateId()
        }
        const newColumns = [...props.columns, { name: `Column #${columnCount}`, id: newId }]
        props.onModifySheet({ tasks: [...props.tasks], columns: newColumns })
        // TODO hacky scroll
        // I want to scroll to the right end of the container but only when a new column is added
        // using useEffect dependant on the props.columns.length, the scroll occurs also when a column is removed
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTo(scrollRef.current.scrollWidth, 0)
            }
        }, 100)
    }

    const changeColumnName = (colId: number, newName: string) => {
        const colIdx = props.columns.findIndex(col => col.id === colId)
        if (colIdx === -1) {
            console.error(`Internal Error: Column with id ${colId} does not exist.`)
            return
        }
        const newColumns = [
            ...props.columns.slice(0, colIdx),
            { id: colId, name: newName },
            ...props.columns.slice(colIdx + 1)
        ]
        props.onModifySheet({ tasks: [...props.tasks], columns: newColumns })
    }

    const deleteColumn = (colId: number) => {
        const newDataSheet = {
            columns: props.columns.filter(col => col.id !== colId),
            tasks: props.tasks.filter(task => task.columnId !== colId)
        }
        props.onModifySheet(newDataSheet)
    }

    const gridColumns = props.columns.map(col =>
        <TaskColumn
            key={col.id}
            onAddNewTask={addNewTask}
            onDeleteTask={deleteTask}
            onStartTaskEdit={startTaskEdit}
            onNameChange={changeColumnName}
            onDeleteColumn={deleteColumn}
            name={col.name}
            id={col.id}
            tasks={props.tasks.filter(task => task.columnId === col.id)}
        />)
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Stack ref={scrollRef} direction='row' spacing="20px" sx={{
                    boxSizing: "border-box", height: "100%", padding: "20px", overflowX: 'auto', overflowY: 'auto',
                    width: `calc(100% - ${props.widthOffsets.left + props.widthOffsets.right})`,
                    marginLeft: `${props.widthOffsets.left}px`,
                    marginRight: `${props.widthOffsets.right}px`,
                    transition: (theme) => theme.transitions.create(['margin', 'width'], {
                        ...(props.widthOffsets.left === 0 ?
                            {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.leavingScreen
                            } :
                            {
                                easing: theme.transitions.easing.easeOut,
                                duration: theme.transitions.duration.enteringScreen
                            })
                    })
                }}>
                    {gridColumns}
                </Stack>
            </DragDropContext>
            <TaskEditor
                isOpen={state.isEditorOpen}
                taskData={state.editedTaskData}
                onEndEdit={onEndTaskEdit} />
            <Fab variant="circular" aria-label="add column" onClick={() => addNewColumn()}
                sx={{ "&:hover": { backgroundColor: "secondary.dark" }, backgroundColor: "secondary.main", position: "fixed", bottom: "20px", right: "20px", margin: "0px" }}>
                <Add color="primary" />
            </Fab>
        </>
    )
}

export default TaskDisplay
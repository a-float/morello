import { FunctionComponent, useState, useRef } from 'react'
import { TaskColumn } from './TaskColumn'
import { Stack } from '@mui/material'
import { TaskData } from './Task'
import { defaultTask, SheetData } from "../../database"
import { TaskEditor } from '../taskEditor/TaskEditor'
import { Add } from '@mui/icons-material'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Fab from '@mui/material/Fab';

export interface TaskDisplayProps {
    columns: string[],
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

    // useEffect(() => {
    //     if(scrollRef.current){
    //         console.log("scrollin");
    //         scrollRef.current.scrollTo(scrollRef.current.scrollWidth, 0)
    //     }
    // }, [len])

    const addNewTask = (columnName: string) => {
        // TODO make sure no two ids are the same
        const id = Math.floor(Math.random() * 100000).toString()
        const newTask = { ...defaultTask, columnId: props.columns.indexOf(columnName), id }
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
        console.log(source, destination);
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
        const start = props.columns.findIndex(col => col === startColName)
        const end = props.columns.findIndex(col => col === endColName)

        // If start is the same as end, we're in the same column
        if (start === end) {
            const newTasks = []
            let foundCount = 0
            let taskToMove: TaskData = props.tasks[0] // temporary value
            for (let task of props.tasks) {
                if (task.columnId === start) {
                    if (foundCount === source.index) {
                        taskToMove = task
                        break
                    }
                    foundCount += 1
                }
            }
            foundCount = 0
            for (let task of props.tasks) {
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

            props.onModifySheet({ tasks: newTasks, columns: [...props.columns] })
            return null
        }
        else { // different columns
            const newTasks = []
            let foundCount = 0
            let taskToMove: TaskData = props.tasks[0] // temporary value
            for (let task of props.tasks) {
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
            // console.log(destination.index)
            for (let task of props.tasks) {
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
            props.onModifySheet({ tasks: newTasks, columns: [...props.columns] })
        }
        return null
    }

    const addNewColumn = () => {
        let columnCount = props.columns.length + 1
        let newName = (x: number) => "Column " + x
        while (props.columns.includes(newName(columnCount))) {
            columnCount += 1
        }
        const newColumns = [...props.columns, newName(columnCount)]
        props.onModifySheet({ tasks: [...props.tasks], columns: newColumns })
        // TODO hacky scroll
        // i want to scroll to the right end of the container but only when a new column is added
        // using useEffect dependant on the props.columns.length, the scroll occurs also when a column is removed
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTo(scrollRef.current.scrollWidth, 0)
            }
        }, 100)
    }

    const changeColumnName = (oldName: string, newName: string) => {
        if (props.columns.includes(newName)) {
            console.log(`'${newName}' is already taken`)
            return
        }
        const colIdx = props.columns.indexOf(oldName)
        if (colIdx === -1) {
            console.log(`Internal Error: Invalid oldName: '${oldName}'`)
            return
        }
        const newColumns = [
            ...props.columns.slice(0, colIdx),
            newName,
            ...props.columns.slice(colIdx + 1)
        ]
        props.onModifySheet({ tasks: [...props.tasks], columns: newColumns })
    }

    const deleteColumn = (columnName: string) => {
        const colIdx = props.columns.indexOf(columnName)
        if (colIdx === -1) {
            console.error('No column with name: ' + columnName)
            return
        } else {
            const newDataSheet = {
                columns: props.columns.filter((col, i) => i !== colIdx),
                tasks: props.tasks.filter(task => task.columnId !== colIdx)
            }
            props.onModifySheet(newDataSheet)
        }
    }

    const gridColumns = [...Array(props.columns.length).keys()].map(colIdx =>
        <TaskColumn
            key={props.columns[colIdx]}
            onAddNewTask={addNewTask}
            onDeleteTask={deleteTask}
            onStartTaskEdit={startTaskEdit}
            onNameChange={changeColumnName}
            onDeleteColumn={deleteColumn}
            name={props.columns[colIdx]}
            tasks={props.tasks.filter(task => task.columnId === colIdx)}
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
            <Fab variant="circular" aria-label="add column" onClick={() => {
                addNewColumn();
            }}
                color="inherit"
                sx={{ position: "fixed", bottom: "20px", right: "20px", margin: "0px" }}>
                <Add color="primary" />
            </Fab>
        </>
    )
}

export default TaskDisplay
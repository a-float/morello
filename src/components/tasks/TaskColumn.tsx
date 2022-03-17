import { Button, Stack, Typography, TextField, Box, useTheme } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { Task, TaskData } from './Task'
import { Droppable } from 'react-beautiful-dnd'
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import { Add, Edit, Delete, MoreHoriz } from "@mui/icons-material";
import { grey } from "@mui/material/colors"

export interface TaskColumnData {
    name: string,
    tasks: TaskData[]
}
export type TaskColumnProps = {
    onAddNewTask: (columnName: string) => void,
    onStartTaskEdit: (id: string) => void,
    onDeleteTask: (id: string, columnName: string) => void,
    onNameChange: (oldName: string, newName: string) => void,
    onDeleteColumn: (columnName: string) => void
} & TaskColumnData

export const TaskColumn: FunctionComponent<TaskColumnProps> = (props) => {
    // TODO make column name edition similar to EditableListItem one!
    const [state, setState] = useState({ editable: false, name: props.name })
    const [menuAnchor, setMenuAnchor] = useState(null)

    const onChangeName = (event: any) => {
        event.preventDefault()
        setState(prevState => ({ ...prevState, editable: false }))
        props.onNameChange(props.name, state.name)
    }
    const tasks = props.tasks.map((taskData, index) =>
        <Task
            index={index}
            key={taskData.id}
            {...taskData}
            onStartEdit={props.onStartTaskEdit}
            onDeleteTask={(id) => { props.onDeleteTask(id, props.name) }} />
    )
    const openMenu = (event: React.MouseEvent<any>) => {
        setMenuAnchor(event.currentTarget)
    }
    // TODO hardcoded values?
    const bgColor = useTheme().palette.mode === 'dark' ? 'rgba(30,30,30, .7)' : 'rgba(255, 255, 255, .6)'
    return (
        <Stack spacing={1} sx={{ position: 'relative', borderRadius: "4px", width: '30%', minWidth: '200px', maxWidth: "280px", minHeight: "30px", padding: '0.6em', backgroundColor: bgColor, height: "fit-content" }}>
            <Box
                onDoubleClick={() => { setState(prevState => ({ ...prevState, editable: true })) }}>

                {!state.editable ?
                    <>
                        <Typography align="center" variant='h5' sx={{ color: 'text.primary' }}>{props.name}</Typography>
                        <MoreHoriz onClick={openMenu} sx={{ color: grey[500], "&:hover": { color: grey[800] }, position: "absolute", right: "0.3em", top: "0em" }} />
                    </>
                    :
                    <form onSubmit={onChangeName}>
                        <Stack direction='row' sx={{ justifyContent: "space-between", alignItems: "flex-end" }}>
                            <TextField
                                autoFocus
                                label="Column Name"
                                value={state.name}
                                variant='standard'
                                onBlur={() => { setState(prevState => ({ ...prevState, editable: false })) }}
                                onChange={(event) => {
                                    setState(prevState => ({ ...prevState, name: event.target.value }))
                                }}
                            />
                            <Button onMouseDown={onChangeName}>Save</Button>
                        </Stack>
                    </form>
                }
            </Box>
            <Droppable droppableId={'col-' + props.name}>
                {provided => (
                    <div {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {tasks}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable >
            <Button variant="text"
                sx={{ color: 'text.secondary', whiteSpace: 'nowrap', justifyContent: 'flex-start' }}
                size='small'
                startIcon={<Add />}
                onClick={() => props.onAddNewTask(props.name)}>
                Add new task
            </Button>
            {/* TODO this and tasks menus are the same. Move to another component? Maybe use the extension from fireship */}
            <Menu
                id="delete-tag-menu"
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem dense={true} onClick={(event) => { setMenuAnchor(null); setState(prevState => ({ ...prevState, editable: true })); }}>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    Edit
                </MenuItem>
                <MenuItem dense={true} onClick={(event) => { setMenuAnchor(null); props.onDeleteColumn(props.name); }}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </Stack>




    )
}

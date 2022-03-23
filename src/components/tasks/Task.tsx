import { Card, CardContent, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { Edit, Delete, MoreHoriz } from "@mui/icons-material";
import { grey } from '@mui/material/colors';
import { TagRow } from './TagRow'
import { Draggable } from 'react-beautiful-dnd'
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
// import { useTheme } from "@mui/material/styles"

export const defaultTask =
{
    name: "Task Name",
    descr: "",
    tagIds: []
}

export interface TaskData {
    id: string,
    columnId: number,
    name: string,
    tagIds: number[],
    dueDate?: Date,
    descr?: string,
}
export type TaskProps = {
    onDeleteTask: (id: string) => void
    onStartEdit: (id: string) => void
    index: number
} & TaskData

export const Task: FunctionComponent<TaskProps> = (props) => {
    const [menuAnchor, setMenuAnchor] = useState(null)
    const startEdit = () => props.onStartEdit(props.id)
    const openMenu = (event: React.MouseEvent<any>) => {
        setMenuAnchor(event.currentTarget)
    }
    // const theme = useTheme()
    return (
        <>
            <Draggable draggableId={props.id} index={props.index}>
                {(provided, snapshot) => (
                    <Card
                        color="secondary"
                        elevation={0}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                            position: "relative",
                            marginBottom: '0.5em',
                            padding: '0.8em 0.6em 0.6em 0.6em',
                            // border: snapshot.isDragging ? `solid 3px ${theme.palette.primary.main}` : "none",
                        }}
                    >
                        <MoreHoriz onClick={openMenu} sx={{ color: grey[500], "&:hover": { color: grey[800] }, position: "absolute", right: "0.2em", top: "0em" }} />
                        <CardContent sx={{ padding: "0", "&:last-child": { "paddingBottom": "0" } }} onDoubleClick={startEdit}>
                            <TagRow tags={props.tagIds} />
                            <Typography variant='subtitle1' sx={{ wordBreak: "break-word", fontSize: "1.2em", lineHeight: '1.25' }} component="div">
                                {props.name}
                            </Typography>
                            {props.descr && <Typography variant='body1' sx={{ whiteSpace: "pre-line", marginTop: "0.3em", lineHeight: '1.25', color: "text.secondary" }} component="div">
                                {props.descr}
                            </Typography>}
                        </CardContent>
                    </Card >
                )
                }
            </Draggable >
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
                <MenuItem dense={true} onClick={(event) => { setMenuAnchor(null); props.onStartEdit(props.id); }}>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    Edit
                </MenuItem>
                <MenuItem dense={true} onClick={(event) => { setMenuAnchor(null); props.onDeleteTask(props.id); }}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </>
    )
}
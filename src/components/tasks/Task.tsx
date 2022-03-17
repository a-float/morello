import { Card, CardContent, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Edit, Delete, MoreHoriz } from "@mui/icons-material";
import { grey } from '@mui/material/colors';
import { TagRow } from './TagRow'
import { Draggable } from 'react-beautiful-dnd'
// import '../../App.css'
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import { useTheme } from "@mui/material/styles"

const CardContentEvenPadding = styled(CardContent)(`
    padding: 0;
    &:last-child{
        padding-bottom: 0;
    }
    overflow: hidden;
    max-width: 100%;
`);

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
    const theme = useTheme()
    return (
        <>
            <Draggable draggableId={props.id} index={props.index}>
                {(provided, snapshot) => (
                    <Card
                        elevation={0}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                            position: "relative",
                            marginBottom: '0.5em',
                            padding: '0.6em 0.6em',
                            border: snapshot.isDragging ? `solid 3px ${theme.palette.primary.main}` : "none",
                        }}
                    >
                        {/* <MyIcon color="#aaaaaa" hoverColor="#666666" onClick={openMenu} */}
                        {/* sx={{ position: "absolute", right: "0.2em", top: "0em" }}> */}
                        <MoreHoriz onClick={openMenu} sx={{ color: grey[500], "&:hover": { color: grey[800] }, position: "absolute", right: "0.3em", top: "0em" }} />
                        {/* </MyIcon> */}
                        <CardContentEvenPadding onDoubleClick={startEdit}>
                            <TagRow tags={props.tagIds} />
                            <Typography variant='subtitle1' sx={{ lineHeight: '1.25' }} component="div">
                                {props.name}
                            </Typography>
                            {props.descr && <Typography variant='body2' sx={{ whiteSpace: "pre-line", marginTop: "0.3em", lineHeight: '1.25', color: grey[500] }} component="div">
                                {props.descr}
                            </Typography>}
                        </CardContentEvenPadding>
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
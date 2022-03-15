import TagEditItem from './TagEditItem';
import { Tag, TagContext } from '../../TagManager'
import Stack from '@mui/material/Stack'
import { FunctionComponent, useState, useContext } from 'react';
import { TwitterPicker } from 'react-color';
import { Button, Dialog } from '@mui/material';

type TagEditorState = {
    editedTag: Tag | null,
    anchor: any
}

const TagEditor: FunctionComponent<{}> = (props) => {
    const [state, setState] = useState<TagEditorState>({ editedTag: null, anchor: null })

    const handleOpenPicker = (event: any, tag: Tag) => {
        setState({ editedTag: tag, anchor: event.currentTarget })
    }

    const { tags, tagManager } = useContext(TagContext)
    return (
        <>
            <Stack spacing={3}>
                {tags.map(tag => (
                    <TagEditItem key={tag.id}
                        tag={tag}
                        onOpenPicker={handleOpenPicker}
                        onChangeName={(x, y) => tagManager.renameTag(x, y)}
                        onDelete={id => tagManager.removeTag(id)} />))
                }
                <Button variant="text" onClick={event => tagManager.addTag()}>Add tag</Button>
            </Stack>
            <Dialog
                id={'tag-color-picker'}
                open={Boolean(state.editedTag)}
                // anchorEl={state.anchor}
                onClose={() => setState({ ...state, editedTag: null })}
            // anchorOrigin={{
            //     vertical: 'bottom',
            //     horizontal: 'center',
            // }}
            // transformOrigin={{
            //     vertical: 'top',
            //     horizontal: 'center',
            // }}
            >
                <TwitterPicker
                    color={state.editedTag?.color || 'red'}
                    onChangeComplete={colorRes => tagManager.setTagColor(state.editedTag!.id, colorRes.hex)} // TODO bad exclamation mark
                />
            </Dialog>
        </>)

}

export default TagEditor
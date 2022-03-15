import TagEditItem from './TagEditItem';
import { TagContext } from '../../TagManager'
import Stack from '@mui/material/Stack'
import { FunctionComponent, useState, useContext } from 'react';
import {ColorResult, TwitterPicker } from 'react-color';
import { TagManager } from '../../TagManager'
import { Dialog } from '@mui/material';

type TagEditorState = {
    currName: string,
    anchor: any
}

const TagEditor: FunctionComponent<{}> = (props) => {
    const [state, setState] = useState<TagEditorState>({ currName: '', anchor: null })

    const handleOpenPicker = (event: any, name: string) => {
        setState({ currName: name, anchor: event.currentTarget })
    }

    const handleChange = (tagManager: TagManager, colorResult: ColorResult) => {
        tagManager.setTagColor(state.currName, colorResult.hex)
        setState({...state})   // force recolor of tags
    }

    const handleRenameTag = (tagManager: TagManager, oldName: string, newName: string) => {
        return tagManager.renameTag(oldName, newName)
    }

    const tagManager = useContext(TagContext)
    return (
        <>
            <Stack spacing={3}>
                {tagManager.getAllTags().map(tag => (
                    <TagEditItem key={tag.name}
                        name={tag.name}
                        color={tagManager.getColor(tag.name)}
                        onOpenPicker={handleOpenPicker}
                        onChangeName={(x, y) => handleRenameTag(tagManager, x, y)} />))
                }
            </Stack>
            <Dialog
                id={'tag-color-picker'}
                open={state.currName.length > 0}
                // anchorEl={state.anchor}
                onClose={() => setState({ ...state, currName: '' })}
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
                    color={tagManager.getColor(state.currName)}
                    onChange={colorRes => handleChange(tagManager, colorRes)}
                    />
            </Dialog>
        </>)

}

export default TagEditor
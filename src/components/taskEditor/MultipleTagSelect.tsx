import { FunctionComponent, useContext } from 'react'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { TagContext } from '../../logic/TagManager'
import { colord } from 'colord';

interface MultipleTagSelectProps {
  tags: number[],
}

export const MultipleTagSelect: FunctionComponent<MultipleTagSelectProps> = (props) => {
  const {tags, tagManager } = useContext(TagContext)
  const getTextColor = (id: number) => {
    const bgColor = tagManager.getColor(id)
    return colord(bgColor).toHsl().l < 55 ? "#fafafa" : "#131313"
  }
  return (
    <div>
      <FormControl sx={{ my: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          id="mutliple-tag-select"
          multiple
          defaultValue={props.tags}
          input={<OutlinedInput id="tag-input" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((id) => (
                <Chip key={id} label={tagManager.getTag(id)?.name || "undefined"} sx={{ color: getTextColor(id), backgroundColor: tagManager.getColor(id) }} />
              ))}
            </Box>
          )}
        >

          {tags.map(tag => (
            <MenuItem
              key={tag.id}
              value={tag.id}
            >
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
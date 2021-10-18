import { FunctionComponent } from 'react'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { tagColors } from '../tmpUtils'

interface MultipleTagSelectProps {
  tags: string[],
}

export const MultipleTagSelect: FunctionComponent<MultipleTagSelectProps> = (props) => {
  return (
    <div>
      <FormControl sx={{ my: 1, minWidth: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          id="mutliple-tag-select"
          multiple
          defaultValue={props.tags}
          sx={{padding: "0.1em", height: "4em"}}
          input={<OutlinedInput id="tag-input" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} sx={{ backgroundColor: tagColors.get(value) || 'grey' }} />
              ))}
            </Box>
          )}
        >
          {Array.from(tagColors.keys()).map((tag: string) => (
            <MenuItem
              key={tag}
              value={tag}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
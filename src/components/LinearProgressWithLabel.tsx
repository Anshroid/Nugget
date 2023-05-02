import * as React from 'react';
import LinearProgress, {LinearProgressProps} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Adapted from https://mui.com/material-ui/react-progress/#linear-with-label

export default function LinearProgressWithLabel({label, ...props}: LinearProgressProps & { value: number, label: string }) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{minWidth: 35}}>
                <Typography variant="body2" color="text.secondary">{label}</Typography>
            </Box>
            <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{minWidth: 35}}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
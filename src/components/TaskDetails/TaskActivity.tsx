import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Task } from '../../types/task';

interface TaskActivityProps {
    task: Task;
}

const TaskActivity: React.FC<TaskActivityProps> = ({ task }) => {
    return (
        <Box>
            <Typography variant="subtitle2" gutterBottom>
                Activity Log
            </Typography>
            <List>
                <ListItem>
                    <ListItemText
                        primary={`Created on ${task.createdAt.toLocaleDateString()}`}
                        secondary={`Last updated ${task.updatedAt.toLocaleDateString()}`}
                    />
                </ListItem>
            </List>
        </Box>
    );
};

export default TaskActivity;

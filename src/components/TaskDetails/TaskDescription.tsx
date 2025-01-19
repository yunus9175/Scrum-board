import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { Task } from '../../types/task';

interface TaskDescriptionProps {
    task: Task;
    onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({
    task,
    onUpdate,
}) => {
    const handleDescriptionChange = (value: string) => {
        onUpdate(task.id, { description: value });
    };

    return (
        <Box>
            <Typography variant="subtitle2" gutterBottom>
                Description
            </Typography>
            <TextField
                multiline
                rows={4}
                fullWidth
                value={task.description || ''}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Add a description..."
                variant="outlined"
            />
        </Box>
    );
};

export default TaskDescription;

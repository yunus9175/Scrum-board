import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Task } from '../../types/task';

interface TaskDetailsHeaderProps {
    task: Task;
    onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const TaskDetailsHeader: React.FC<TaskDetailsHeaderProps> = ({ task }) => {
    return (
        <Box
            sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: 1,
                borderColor: 'divider',
            }}
        >
            <Typography variant="h6">{task.content}</Typography>
            <IconButton edge="end" size="small">
                <CloseIcon />
            </IconButton>
        </Box>
    );
};

export default TaskDetailsHeader;

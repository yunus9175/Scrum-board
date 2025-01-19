import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Paper, Typography } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface TaskProps {
    task: {
        id: string;
        content: string;
    };
    index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    elevation={2}
                    sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'white',
                        '&:hover': {
                            bgcolor: 'grey.50',
                        },
                    }}
                >
                    <div {...provided.dragHandleProps}>
                        <DragIndicatorIcon sx={{ color: 'grey.500' }} />
                    </div>
                    <Typography>{task.content}</Typography>
                </Paper>
            )}
        </Draggable>
    );
};

export default Task;

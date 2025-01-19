import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { Paper, Box } from '@mui/material';
import { Task as TaskType } from '../store/tasksSlice';

interface TaskListProps {
    tasks: TaskType[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <Droppable droppableId="task-list">
            {(provided) => (
                <Paper
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                        p: 2,
                        bgcolor: 'grey.100',
                        minHeight: 400,
                        borderRadius: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </Box>
                </Paper>
            )}
        </Droppable>
    );
};

export default TaskList;

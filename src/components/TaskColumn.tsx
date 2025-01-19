import React from 'react';
import {
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Typography, Box, Chip } from '@mui/material';
import TaskCard from './TaskCard';
import { Column, Task } from '../types/task';
import { commonStyles } from '../styles/common';

interface TaskColumnProps {
    column: Column;
    tasksCount: number;
    onEdit: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
    column,
    tasksCount,
    onEdit,
}) => {
    const renderDroppableContent = (
        provided: DroppableProvided,
        snapshot: DroppableStateSnapshot
    ) => (
        <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
                ...commonStyles.scrollable,
                flex: 1,
                p: 1,
                bgcolor: snapshot.isDraggingOver
                    ? (theme) =>
                          theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.1)'
                              : 'rgba(25, 118, 210, 0.08)'
                    : 'transparent',
                transition: 'background-color 0.2s ease',
                minHeight: 200,
                border: (theme) =>
                    snapshot.isDraggingOver
                        ? `2px dashed ${theme.palette.primary.main}`
                        : '2px dashed transparent',
            }}
        >
            {column.tasks.map((task, index) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                    onEdit={onEdit}
                />
            ))}
            {provided.placeholder}
        </Box>
    );

    return (
        <Box
            sx={{
                minWidth: 300,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(0, 0, 0, 0.02)',
                borderRadius: 2,
                boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                        ? '0 4px 12px rgba(0,0,0,0.5)'
                        : '0 4px 12px rgba(0,0,0,0.2)',
                '&:hover': {
                    boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                            ? '0 8px 24px rgba(0,0,0,0.6)'
                            : '0 8px 24px rgba(0,0,0,0.25)',
                },
                transition: 'box-shadow 0.2s ease-in-out',
            }}
        >
            {/* Column Header */}
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.03)',
                    borderBottom: '1px solid',
                    borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                    }}
                >
                    {column.title.toUpperCase()}
                </Typography>
                <Chip
                    label={tasksCount}
                    size="small"
                    sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        color: 'text.secondary',
                        height: 20,
                        fontSize: '0.75rem',
                    }}
                />
            </Box>

            {/* Droppable Area */}
            <Droppable droppableId={column.id}>
                {renderDroppableContent}
            </Droppable>
        </Box>
    );
};

export default TaskColumn;

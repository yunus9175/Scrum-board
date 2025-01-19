import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { Task } from '../types/task';
import { format } from 'date-fns';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LabelIcon from '@mui/icons-material/Label';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

interface TaskCardProps {
    task: Task;
    index: number;
    onEdit: (task: Task) => void;
}

const getPriorityColor = (priority?: string) => {
    switch (priority) {
        case 'high':
            return 'error';
        case 'medium':
            return 'warning';
        case 'low':
            return 'success';
        default:
            return 'default';
    }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                        p: 2,
                        mb: 1,
                        position: 'relative',
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        border: (theme) =>
                            `1px solid ${
                                theme.palette.mode === 'dark'
                                    ? 'rgba(255, 255, 255, 0.12)'
                                    : 'rgba(0, 0, 0, 0.12)'
                            }`,
                        cursor: 'grab',
                        boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                                ? '0 1px 4px rgba(0,0,0,0.2)'
                                : '0 1px 4px rgba(0,0,0,0.1)',
                        '&:hover': {
                            bgcolor: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? 'rgba(255, 255, 255, 0.05)'
                                    : 'rgba(0, 0, 0, 0.02)',
                            boxShadow: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? '0 2px 8px rgba(0,0,0,0.3)'
                                    : '0 2px 8px rgba(0,0,0,0.15)',
                            '& .edit-button': {
                                opacity: 1,
                            },
                        },
                        ...(snapshot.isDragging && {
                            boxShadow: '0 5px 10px rgba(0,0,0,0.3)',
                            transform: 'rotate(2deg) scale(1.02)',
                        }),
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    <IconButton
                        className="edit-button"
                        size="small"
                        onClick={() => onEdit(task)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            '&:hover': {
                                bgcolor: 'background.paper',
                            },
                            zIndex: 1,
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ position: 'relative' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                minHeight: '80px',
                            }}
                        >
                            <Typography variant="body2" color="text.primary">
                                {task.content}
                            </Typography>
                            {task.description && (
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {task.description}
                                </Typography>
                            )}

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                }}
                            >
                                {task.labels?.map((label) => (
                                    <Chip
                                        key={label}
                                        label={label}
                                        size="small"
                                        icon={
                                            <LabelIcon
                                                sx={{ fontSize: '14px' }}
                                            />
                                        }
                                        sx={{ height: 20, fontSize: '0.75rem' }}
                                    />
                                ))}
                            </Box>

                            <Box
                                sx={{
                                    mt: 'auto',
                                    pt: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderTop: '1px solid',
                                    borderColor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.1)'
                                            : 'rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {task.priority && (
                                        <Chip
                                            label={task.priority}
                                            size="small"
                                            color={getPriorityColor(
                                                task.priority
                                            )}
                                            sx={{
                                                height: 20,
                                                fontSize: '0.75rem',
                                            }}
                                        />
                                    )}
                                    {task.dueDate && (
                                        <Chip
                                            icon={
                                                <CalendarTodayIcon
                                                    sx={{ fontSize: '14px' }}
                                                />
                                            }
                                            label={format(
                                                new Date(task.dueDate),
                                                'MMM d'
                                            )}
                                            size="small"
                                            sx={{
                                                height: 20,
                                                fontSize: '0.75rem',
                                            }}
                                        />
                                    )}
                                </Box>
                                {task.assignee && (
                                    <Chip
                                        icon={
                                            <PersonIcon
                                                sx={{ fontSize: '14px' }}
                                            />
                                        }
                                        label={task.assignee}
                                        size="small"
                                        sx={{ height: 20, fontSize: '0.75rem' }}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            )}
        </Draggable>
    );
};

export default TaskCard;

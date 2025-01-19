import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, DropResult, DragUpdate } from 'react-beautiful-dnd';
import { Box, Fab, Typography, TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskColumn from './TaskColumn';
import AddTaskDialog from './AddTaskDialog';
import { Task, Column, TaskStatus } from '../types/task';
import { storage } from '../utils/localStorage';
import { commonStyles } from '../styles/common';
import SearchIcon from '@mui/icons-material/Search';
import EditTaskDialog from './EditTaskDialog';

const initialColumns: Column[] = [
    { id: 'todo', title: 'Todo', tasks: [] },
    { id: 'inProgress', title: 'In Progress', tasks: [] },
    { id: 'inReview', title: 'In Review', tasks: [] },
    { id: 'blocked', title: 'Blocked', tasks: [] },
    { id: 'hold', title: 'On Hold', tasks: [] },
    { id: 'completed', title: 'Completed', tasks: [] },
];

const TaskBoard: React.FC = () => {
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [autoScrollInterval, setAutoScrollInterval] = useState<ReturnType<
        typeof setInterval
    > | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedTasks = storage.getTasks();
        if (savedTasks.length) {
            const updatedColumns = initialColumns.map((col) => ({
                ...col,
                tasks: savedTasks.filter((task) => task.status === col.id),
            }));
            setColumns(updatedColumns);
        }
    }, []);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceCol = columns.find((col) => col.id === source.droppableId);
        const destCol = columns.find(
            (col) => col.id === destination.droppableId
        );

        if (!sourceCol || !destCol) return;

        const sourceTasks = [...sourceCol.tasks];
        const destTasks =
            source.droppableId === destination.droppableId
                ? sourceTasks
                : [...destCol.tasks];

        const [removed] = sourceTasks.splice(source.index, 1);
        const updatedTask = {
            ...removed,
            status: destination.droppableId as TaskStatus,
        };
        destTasks.splice(destination.index, 0, updatedTask);

        const newColumns = columns.map((col) => {
            if (col.id === source.droppableId) {
                return { ...col, tasks: sourceTasks };
            }
            if (col.id === destination.droppableId) {
                return { ...col, tasks: destTasks };
            }
            return col;
        });

        setColumns(newColumns);

        // Save all tasks to localStorage
        const allTasks = newColumns.flatMap((col) => col.tasks);
        storage.setTasks(allTasks);
    };

    const handleAddTask = (taskData: Omit<Task, 'id'>) => {
        const newTask: Task = {
            ...taskData,
            id: `task-${Date.now()}`, // Generate unique ID
        };

        const newColumns = columns.map((col) => {
            if (col.id === 'todo') {
                return {
                    ...col,
                    tasks: [...col.tasks, newTask],
                };
            }
            return col;
        });

        setColumns(newColumns);
        const allTasks = newColumns.flatMap((col) => col.tasks);
        storage.setTasks(allTasks);
    };

    const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
        const newColumns = columns.map((col) => ({
            ...col,
            tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
            ),
        }));

        setColumns(newColumns);
        const allTasks = newColumns.flatMap((col) => col.tasks);
        storage.setTasks(allTasks);
    };

    const filteredColumns = columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter(
            (task) =>
                task.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                task.labels?.some((label) =>
                    label.toLowerCase().includes(searchTerm.toLowerCase())
                )
        ),
    }));

    const handleDragUpdate = (event: DragUpdate) => {
        if (!scrollContainerRef.current || !event.draggableId) return;

        const container = scrollContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const scrollSpeed = 15;
        const scrollThreshold = 200;

        // Get the dragged element
        const draggedElement = document.querySelector(
            `[data-rbd-draggable-id="${event.draggableId}"]`
        );
        if (!draggedElement) return;

        const draggedRect = draggedElement.getBoundingClientRect();
        const draggedLeft = draggedRect.left;
        const draggedRight = draggedRect.right;

        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }

        // Check if dragged element is near the left edge
        if (draggedLeft - containerRect.left < scrollThreshold) {
            // Scroll left
            const interval = setInterval(() => {
                const newScrollLeft = container.scrollLeft - scrollSpeed;
                if (newScrollLeft >= 0) {
                    container.scrollLeft = newScrollLeft;
                }
            }, 16);
            setAutoScrollInterval(interval);
        }
        // Check if dragged element is near the right edge
        else if (containerRect.right - draggedRight < scrollThreshold) {
            // Scroll right
            const interval = setInterval(() => {
                const newScrollLeft = container.scrollLeft + scrollSpeed;
                if (
                    newScrollLeft <=
                    container.scrollWidth - container.clientWidth
                ) {
                    container.scrollLeft = newScrollLeft;
                }
            }, 16);
            setAutoScrollInterval(interval);
        }
    };

    const cleanupAutoScroll = () => {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            setAutoScrollInterval(null);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.default',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    borderBottom: 1,
                    borderColor: 'divider',
                    flexShrink: 0,
                }}
            >
                <Typography variant="h6" color="text.primary">
                    Task Board
                </Typography>
                <TextField
                    placeholder="Search tasks..."
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon
                                    sx={{ color: 'text.secondary', ml: 1 }}
                                />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: 300,
                        ml: 'auto',
                        mr: 2,
                        '& .MuiOutlinedInput-root': {
                            height: 48,
                            borderRadius: '24px',
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? 'rgba(255, 255, 255, 0.08)'
                                    : 'rgba(0, 0, 0, 0.04)',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark'
                                        ? 'rgba(255, 255, 255, 0.12)'
                                        : 'rgba(0, 0, 0, 0.06)',
                                boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.05)',
                            },
                            '& fieldset': {
                                border: 'none',
                            },
                            '&.Mui-focused': {
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark'
                                        ? 'rgba(255, 255, 255, 0.15)'
                                        : 'rgba(0, 0, 0, 0.08)',
                                boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.15)',
                            },
                            '& input': {
                                padding: '14px 14px 14px 8px',
                                '&::placeholder': {
                                    color: 'text.secondary',
                                    opacity: 0.8,
                                },
                            },
                        },
                    }}
                />
                <Fab
                    color="primary"
                    size="medium"
                    onClick={() => setIsAddDialogOpen(true)}
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                        transition: 'transform 0.2s ease',
                    }}
                >
                    <AddIcon />
                </Fab>
            </Box>
            <DragDropContext
                onDragEnd={(result) => {
                    cleanupAutoScroll();
                    onDragEnd(result);
                }}
                onDragUpdate={handleDragUpdate}
            >
                <Box
                    ref={scrollContainerRef}
                    sx={{
                        flex: 1,
                        display: 'flex',
                        gap: 2,
                        p: 2,
                        ...commonStyles.scrollable,
                        overflowX: 'auto',
                    }}
                >
                    {filteredColumns.map((column) => (
                        <TaskColumn
                            key={column.id}
                            column={column}
                            tasksCount={column.tasks.length}
                            onEdit={setEditingTask}
                        />
                    ))}
                </Box>
            </DragDropContext>
            <AddTaskDialog
                open={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAdd={handleAddTask}
            />
            <EditTaskDialog
                open={!!editingTask}
                onClose={() => setEditingTask(null)}
                onUpdate={handleUpdateTask}
                task={editingTask!}
            />
        </Box>
    );
};

export default TaskBoard;

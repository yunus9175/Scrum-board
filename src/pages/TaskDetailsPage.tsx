import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Chip,
    Stack,
    IconButton,
    Divider,
    CircularProgress,
} from '@mui/material';
import {
    AccessTime,
    Flag,
    Label,
    Person,
    ArrowBack,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../types/task';
import { format } from 'date-fns';
import TaskSidebar from '../components/TaskSidebar';
import { storage } from '../utils/localStorage';

const calculateProgress = (task: Task): number => {
    switch (task.status) {
        case 'todo':
            return 0;
        case 'inProgress':
            return 33;
        case 'inReview':
            return 66;
        case 'completed':
            return 100;
        case 'blocked':
        case 'onHold':
            return 33;
        default:
            return calculateSubtaskProgress(task);
    }
};

const calculateSubtaskProgress = (task: Task): number => {
    const subtasks = task.subtasks || [];
    const checklist = task.checklist || [];

    const subtaskCount = subtasks.length;
    const completedSubtasks = subtasks.filter((st) => st.completed).length;
    const checklistCount = checklist.length;
    const completedChecklist = checklist.filter((item) => item.checked).length;

    const total = subtaskCount + checklistCount;
    const completed = completedSubtasks + completedChecklist;

    return total === 0 ? 0 : Math.round((completed / total) * 100);
};

const getPriorityColor = (priority: string) => {
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

const getProgressColor = (progress: number) => {
    if (progress === 0) return 'text.disabled';
    if (progress === 100) return 'success.main';
    if (progress > 75) return 'info.main';
    if (progress > 50) return 'primary.main';
    if (progress > 25) return 'warning.main';
    return 'error.main';
};

const getProgressLabel = (progress: number) => {
    if (progress === 0) return 'Not Started';
    if (progress === 100) return 'Completed';
    return `${progress}% Complete`;
};

const TaskDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        const tasks = storage.getTasks();
        const foundTask = tasks.find((t: Task) => t.id === id);
        if (foundTask) {
            // Ensure task has required properties
            const taskWithDefaults = {
                ...foundTask,
                subtasks: foundTask.subtasks || [],
                checklist: foundTask.checklist || [],
            };
            setTask(taskWithDefaults);
            const newProgress = calculateProgress(taskWithDefaults);
            setProgress(newProgress);
        } else {
            navigate('/dashboard');
        }
        setLoading(false);
    }, [id, navigate]);

    useEffect(() => {
        if (task) {
            const newProgress = calculateProgress(task);
            setProgress(newProgress);
        }
    }, [task]);

    const handleUpdate = (taskId: string, updates: Partial<Task>) => {
        const tasks = storage.getTasks();
        const updatedTasks = tasks.map((t: Task) =>
            t.id === taskId ? { ...t, ...updates } : t
        );
        storage.setTasks(updatedTasks);
        const updatedTask = { ...task!, ...updates };
        setTask(updatedTask);
        setProgress(calculateProgress(updatedTask));
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (!task) return null;

    return (
        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
            <IconButton onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
                <ArrowBack />
            </IconButton>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Box sx={{ flex: { xs: '1', md: '2' } }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 3,
                                mb: 3,
                            }}
                        >
                            <Typography variant="h4">{task.content}</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        display: 'inline-flex',
                                    }}
                                >
                                    <CircularProgress
                                        variant="determinate"
                                        value={progress}
                                        size={48}
                                        thickness={4}
                                        sx={{
                                            color: () =>
                                                getProgressColor(progress),
                                            bgcolor: (theme) =>
                                                theme.palette.mode === 'dark'
                                                    ? 'rgba(255,255,255,0.1)'
                                                    : 'rgba(0,0,0,0.1)',
                                            borderRadius: '50%',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            component="div"
                                            color="text.secondary"
                                            sx={{ fontWeight: 'medium' }}
                                        >
                                            {`${progress}%`}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        ml: 1,
                                        color: () => getProgressColor(progress),
                                    }}
                                >
                                    {getProgressLabel(progress)}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                mb: 3,
                                flexWrap: 'wrap',
                            }}
                        >
                            {task.priority && (
                                <Chip
                                    icon={<Flag />}
                                    label={task.priority}
                                    color={getPriorityColor(task.priority)}
                                    variant="outlined"
                                />
                            )}
                            {task.dueDate && (
                                <Chip
                                    icon={<AccessTime />}
                                    label={format(
                                        new Date(task.dueDate),
                                        'MMM d, yyyy'
                                    )}
                                    variant="outlined"
                                />
                            )}
                            {task.assignee && (
                                <Chip
                                    icon={<Person />}
                                    label={task.assignee}
                                    variant="outlined"
                                />
                            )}
                        </Box>

                        <Typography variant="h6" gutterBottom>
                            Description
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            {task.description || 'No description provided.'}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" gutterBottom>
                            Labels
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {task.labels?.map((label) => (
                                <Chip
                                    key={label}
                                    icon={<Label />}
                                    label={label}
                                    variant="outlined"
                                    size="small"
                                />
                            ))}
                        </Box>
                    </Paper>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <TaskSidebar task={task} onUpdate={handleUpdate} />
                </Box>
            </Stack>
        </Box>
    );
};

export default TaskDetailsPage;

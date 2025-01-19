import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    InputAdornment,
} from '@mui/material';
import { Task, TaskPriority } from '../types/task';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface EditTaskDialogProps {
    open: boolean;
    onClose: () => void;
    onUpdate: (taskId: string, updatedTask: Partial<Task>) => void;
    task: Task;
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
    open,
    onClose,
    onUpdate,
    task,
}) => {
    const [taskData, setTaskData] = useState({
        content: '',
        description: '',
        priority: 'medium' as TaskPriority,
        dueDate: '',
        assignee: '',
        labels: [] as string[],
    });

    useEffect(() => {
        if (task) {
            setTaskData({
                content: task.content,
                description: task.description || '',
                priority: task.priority || 'medium',
                dueDate: task.dueDate || '',
                assignee: task.assignee || '',
                labels: task.labels || [],
            });
        }
    }, [task]);

    const handleSubmit = () => {
        if (!taskData.content.trim()) return;
        onUpdate(task.id, taskData);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 1,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    minWidth: '500px',
                    '& .MuiDialogTitle-root+.MuiDialogContent-root': {
                        paddingTop: '27px',
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    p: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontSize: '1.25rem',
                    fontWeight: 400,
                }}
            >
                Edit Task
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5,
                    }}
                >
                    <TextField
                        label="Task Title"
                        value={taskData.content}
                        onChange={(e) =>
                            setTaskData((prev) => ({
                                ...prev,
                                content: e.target.value,
                            }))
                        }
                        fullWidth
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: '56px',
                            },
                        }}
                    />
                    <TextField
                        label="Description"
                        value={taskData.description}
                        onChange={(e) =>
                            setTaskData((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        multiline
                        rows={4}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: 'auto',
                                minHeight: '120px',
                                alignItems: 'flex-start',
                                '& textarea': {
                                    height: '100% !important',
                                    overflow: 'auto !important',
                                },
                            },
                        }}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={taskData.priority}
                            label="Priority"
                            onChange={(e) =>
                                setTaskData((prev) => ({
                                    ...prev,
                                    priority: e.target.value as TaskPriority,
                                }))
                            }
                            sx={{
                                height: '56px',
                            }}
                        >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        type="date"
                        label="Due Date"
                        value={taskData.dueDate}
                        onChange={(e) =>
                            setTaskData((prev) => ({
                                ...prev,
                                dueDate: e.target.value,
                            }))
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarTodayIcon
                                        sx={{ mr: 1, fontSize: '20px' }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Assignee"
                        value={taskData.assignee}
                        onChange={(e) =>
                            setTaskData((prev) => ({
                                ...prev,
                                assignee: e.target.value,
                            }))
                        }
                        fullWidth
                    />
                    <TextField
                        label="Labels (comma-separated)"
                        value={taskData.labels.join(', ')}
                        onChange={(e) =>
                            setTaskData((prev) => ({
                                ...prev,
                                labels: e.target.value
                                    .split(',')
                                    .map((l) => l.trim())
                                    .filter(Boolean),
                            }))
                        }
                        fullWidth
                        helperText="Enter labels separated by commas"
                    />
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    p: 2.5,
                    gap: 1,
                    '& .MuiButton-root': {
                        minWidth: '100px',
                        height: '40px',
                    },
                }}
            >
                <Button
                    onClick={onClose}
                    variant="text"
                    sx={{
                        color: 'primary.main',
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!taskData.content.trim()}
                    sx={{
                        bgcolor: 'grey.300',
                        color: 'grey.700',
                        '&:not(:disabled)': {
                            bgcolor: 'primary.main',
                            color: 'white',
                        },
                    }}
                >
                    Update Task
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTaskDialog;

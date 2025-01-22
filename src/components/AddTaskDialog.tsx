import React, { useState } from 'react';
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
} from '@mui/material';
import { Task, TaskPriority } from '../types/task';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface AddTaskDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (task: Omit<Task, 'id'>) => void;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
    open,
    onClose,
    onAdd,
}) => {
    const [taskData, setTaskData] = useState({
        content: '',
        description: '',
        priority: 'medium' as TaskPriority,
        dueDate: '',
        assignee: '',
        labels: [] as string[],
    });

    const handleSubmit = () => {
        if (!taskData.content.trim()) return;

        onAdd({
            content: taskData.content,
            status: 'todo',
            description: taskData.description,
            priority: taskData.priority,
            dueDate: taskData.dueDate,
            assignee: taskData.assignee,
            labels: taskData.labels,
            subtasks: [],
            checklist: [],
            comments: [],
            dependencies: { blockedBy: [], blocking: [] },
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        setTaskData({
            content: '',
            description: '',
            priority: 'medium' as TaskPriority,
            dueDate: '',
            assignee: '',
            labels: [],
        });
        onClose();
    };

    const handleLabelsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Keep the raw input if it ends with comma
        if (value.endsWith(',')) {
            setTaskData((prev) => ({
                ...prev,
                labels: [
                    ...value
                        .slice(0, -1)
                        .split(',')
                        .map((l) => l.trim())
                        .filter(Boolean),
                    '',
                ],
            }));
            return;
        }

        // Split by comma and clean up
        const labels = value
            .split(',')
            .map((label) => label.trim())
            .filter((label) => label !== '');

        setTaskData((prev) => ({
            ...prev,
            labels: labels,
        }));
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
                Add New Task
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
                            setTaskData({
                                ...taskData,
                                content: e.target.value,
                            })
                        }
                        fullWidth
                        required
                        autoFocus
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: '56px',
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Description"
                        value={taskData.description}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                description: e.target.value,
                            })
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
                                setTaskData({
                                    ...taskData,
                                    priority: e.target.value as TaskPriority,
                                })
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
                                <CalendarTodayIcon
                                    sx={{
                                        mr: 1,
                                        fontSize: '20px',
                                        color: 'text.secondary',
                                    }}
                                />
                            ),
                            sx: {
                                '& input::-webkit-calendar-picker-indicator': {
                                    display: 'block',
                                    filter: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? 'invert(1)'
                                            : 'none',
                                },
                            },
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
                        label="Labels"
                        fullWidth
                        value={taskData.labels.join(', ')}
                        onChange={handleLabelsChange}
                        placeholder="Enter labels separated by commas"
                        helperText="Separate labels with commas (e.g. frontend, bug, urgent)"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: '56px',
                            },
                        }}
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
                    Add Task
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTaskDialog;

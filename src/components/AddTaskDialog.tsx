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
                        label="Labels (comma-separated)"
                        value={taskData.labels.join(', ')}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            // Keep the last comma if user just typed it
                            const labels = inputValue.endsWith(',')
                                ? [
                                      ...inputValue
                                          .split(',')
                                          .map((l) => l.trim())
                                          .filter(Boolean),
                                      '',
                                  ]
                                : inputValue
                                      .split(',')
                                      .map((l) => l.trim())
                                      .filter(Boolean);

                            setTaskData((prev) => ({
                                ...prev,
                                labels: labels,
                            }));
                        }}
                        fullWidth
                        helperText="Enter labels separated by commas"
                        placeholder="e.g. important, urgent, feature"
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

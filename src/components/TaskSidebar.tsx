import React from 'react';
import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Box,
    Button,
} from '@mui/material';
import { Task } from '../types/task';
import AddIcon from '@mui/icons-material/Add';

interface TaskSidebarProps {
    task: Task;
    onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const TaskSidebar: React.FC<TaskSidebarProps> = ({ task, onUpdate }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Subtasks
                </Typography>
                <List dense>
                    {task.subtasks.map((subtask) => (
                        <ListItem key={subtask.id} disablePadding>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={subtask.completed}
                                    onChange={() => {
                                        const updatedSubtasks =
                                            task.subtasks.map((st) =>
                                                st.id === subtask.id
                                                    ? {
                                                          ...st,
                                                          completed:
                                                              !st.completed,
                                                      }
                                                    : st
                                            );
                                        onUpdate(task.id, {
                                            subtasks: updatedSubtasks,
                                        });
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={subtask.content} />
                        </ListItem>
                    ))}
                </List>
                <Button
                    startIcon={<AddIcon />}
                    sx={{ mt: 1 }}
                    fullWidth
                    variant="outlined"
                >
                    Add Subtask
                </Button>
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Checklist
                </Typography>
                <List dense>
                    {task.checklist.map((item) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={item.checked}
                                    onChange={() => {
                                        const updatedChecklist =
                                            task.checklist.map((i) =>
                                                i.id === item.id
                                                    ? {
                                                          ...i,
                                                          checked: !i.checked,
                                                      }
                                                    : i
                                            );
                                        onUpdate(task.id, {
                                            checklist: updatedChecklist,
                                        });
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <Button
                    startIcon={<AddIcon />}
                    sx={{ mt: 1 }}
                    fullWidth
                    variant="outlined"
                >
                    Add Checklist Item
                </Button>
            </Paper>
        </Box>
    );
};

export default TaskSidebar;

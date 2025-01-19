import React, { useState } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    TextField,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Task, SubTask } from '../../types/task';

interface TaskSubtasksProps {
    task: Task;
    onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const TaskSubtasks: React.FC<TaskSubtasksProps> = ({ task, onUpdate }) => {
    const [newSubtask, setNewSubtask] = useState('');

    const handleAddSubtask = () => {
        if (!newSubtask.trim()) return;
        const subtask: SubTask = {
            id: `subtask-${Date.now()}`,
            content: newSubtask,
            completed: false,
        };
        onUpdate(task.id, {
            subtasks: [...task.subtasks, subtask],
        });
        setNewSubtask('');
    };

    const toggleSubtask = (subtaskId: string) => {
        const updatedSubtasks = task.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        onUpdate(task.id, { subtasks: updatedSubtasks });
    };

    return (
        <Box>
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Add subtask"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
                />
                <IconButton onClick={handleAddSubtask}>
                    <AddIcon />
                </IconButton>
            </Box>
            <List>
                {task.subtasks.map((subtask) => (
                    <ListItem
                        key={subtask.id}
                        dense
                        secondaryAction={
                            <Checkbox
                                edge="end"
                                checked={subtask.completed}
                                onChange={() => toggleSubtask(subtask.id)}
                            />
                        }
                    >
                        <ListItemText primary={subtask.content} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TaskSubtasks;

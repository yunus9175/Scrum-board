import React, { useState } from 'react';
import {
    Box,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Task, ChecklistItem } from '../../types/task';

interface TaskChecklistProps {
    task: Task;
    onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const TaskChecklist: React.FC<TaskChecklistProps> = ({ task, onUpdate }) => {
    const [newItem, setNewItem] = useState('');

    const handleAdd = () => {
        if (!newItem.trim()) return;
        const item: ChecklistItem = {
            id: `checklist-${Date.now()}`,
            text: newItem,
            checked: false,
        };
        onUpdate(task.id, { checklist: [...task.checklist, item] });
        setNewItem('');
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Add checklist item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                />
                <IconButton onClick={handleAdd}>
                    <AddIcon />
                </IconButton>
            </Box>
            <List>
                {task.checklist.map((item) => (
                    <ListItem key={item.id} dense>
                        <Checkbox
                            checked={item.checked}
                            onChange={() => {
                                const updated = task.checklist.map((i) =>
                                    i.id === item.id
                                        ? { ...i, checked: !i.checked }
                                        : i
                                );
                                onUpdate(task.id, { checklist: updated });
                            }}
                        />
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TaskChecklist;

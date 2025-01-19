import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { Task, Comment } from '../../types/task';

interface TaskCommentsProps {
    task: Task;
    onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const TaskComments: React.FC<TaskCommentsProps> = ({ task, onUpdate }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const comment: Comment = {
            id: `comment-${Date.now()}`,
            content: newComment,
            userId: 'current-user', // Replace with actual user ID
            timestamp: new Date(),
        };
        onUpdate(task.id, { comments: [...task.comments, comment] });
        setNewComment('');
    };

    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <TextField
                    multiline
                    rows={2}
                    fullWidth
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    sx={{ mt: 1 }}
                >
                    Add Comment
                </Button>
            </Box>
            <List>
                {task.comments.map((comment) => (
                    <ListItem key={comment.id}>
                        <ListItemText
                            primary={comment.content}
                            secondary={comment.timestamp.toLocaleString()}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TaskComments;

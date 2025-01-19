import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Tabs,
    Tab,
    Typography,
    Divider,
} from '@mui/material';
import { Task } from '../../types/task';
import TaskDetailsHeader from './TaskDetailsHeader';
import TaskDescription from './TaskDescription';
import TaskSubtasks from './TaskSubtasks';
import TaskChecklist from './TaskChecklist';
import TaskComments from './TaskComments';
import TaskActivity from './TaskActivity';

interface TaskDetailsProps {
    open: boolean;
    onClose: () => void;
    task: Task;
    onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
    open,
    onClose,
    task,
    onUpdate,
}) => {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    height: '80vh',
                    maxHeight: '800px',
                },
            }}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TaskDetailsHeader task={task} onUpdate={onUpdate} />
            </DialogTitle>
            <DialogContent sx={{ p: 0, display: 'flex' }}>
                <Box sx={{ flex: 1, borderRight: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Details" />
                        <Tab label="Subtasks" />
                        <Tab label="Comments" />
                        <Tab label="Activity" />
                    </Tabs>
                    <Box sx={{ p: 2 }}>
                        {activeTab === 0 && (
                            <>
                                <TaskDescription
                                    task={task}
                                    onUpdate={onUpdate}
                                />
                                <Divider sx={{ my: 2 }} />
                                <TaskChecklist
                                    task={task}
                                    onUpdate={onUpdate}
                                />
                            </>
                        )}
                        {activeTab === 1 && (
                            <TaskSubtasks task={task} onUpdate={onUpdate} />
                        )}
                        {activeTab === 2 && (
                            <TaskComments task={task} onUpdate={onUpdate} />
                        )}
                        {activeTab === 3 && <TaskActivity task={task} />}
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: 300,
                        p: 2,
                        bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.05)'
                                : 'rgba(0, 0, 0, 0.02)',
                    }}
                >
                    <Typography variant="subtitle2" gutterBottom>
                        Properties
                    </Typography>
                    {/* Task properties and metadata */}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default TaskDetails;

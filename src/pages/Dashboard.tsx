import React from 'react';
import { Box } from '@mui/material';
import TaskBoard from '../components/TaskBoard';

const Dashboard: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            <TaskBoard />
        </Box>
    );
};

export default Dashboard;

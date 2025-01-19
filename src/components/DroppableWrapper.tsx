import React from 'react';
import {
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
} from 'react-beautiful-dnd';

interface DroppableWrapperProps {
    droppableId: string;
    children: (
        provided: DroppableProvided,
        snapshot: DroppableStateSnapshot
    ) => React.ReactElement;
}

const DroppableWrapper: React.FC<DroppableWrapperProps> = ({
    droppableId,
    children,
}) => <Droppable droppableId={droppableId}>{children}</Droppable>;

export default DroppableWrapper;

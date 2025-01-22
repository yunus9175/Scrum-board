export type TaskStatus =
    | 'todo'
    | 'inProgress'
    | 'inReview'
    | 'blocked'
    | 'onHold'
    | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface SubTask {
    id: string;
    content: string;
    completed: boolean;
}

export interface ChecklistItem {
    id: string;
    text: string;
    checked: boolean;
}

export interface Comment {
    id: string;
    userId: string;
    content: string;
    timestamp: Date;
    attachments?: string[];
    mentions?: string[];
}

export interface Task {
    id: string;
    content: string;
    status: TaskStatus;
    description?: string;
    priority?: TaskPriority;
    dueDate?: string;
    assignee?: string;
    labels?: string[];
    subtasks: SubTask[];
    checklist: ChecklistItem[];
    comments: Comment[];
    dependencies: {
        blockedBy: string[];
        blocking: string[];
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface Column {
    id: TaskStatus;
    title: string;
    tasks: Task[];
}

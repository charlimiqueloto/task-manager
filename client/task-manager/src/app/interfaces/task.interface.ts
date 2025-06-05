export interface Task {
    _id?: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'done';
    dueDate: string;
}
import { User } from 'src/entities/users/user.entity';
import { TaskStatus } from 'src/constants/types';
export declare class Task {
    id: number;
    title: string;
    description?: string;
    due: Date;
    status: TaskStatus;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deleteAt: Date;
}

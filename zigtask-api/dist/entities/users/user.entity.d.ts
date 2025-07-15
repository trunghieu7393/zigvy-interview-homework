import { Task } from 'src/entities/tasks/task.entity';
import { Plan } from 'src/constants/types';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    plan: Plan;
    tasks: Task[];
    createdAt: Date;
    updatedAt: Date;
    upgradePlanAt: Date;
}

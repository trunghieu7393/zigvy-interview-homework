import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from 'src/constants/types';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    try {
      const taskData: Partial<Task> = {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status || TaskStatus.TODO,
        userId: user.id,
        dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined,
      };
      
      const task = this.taskRepository.create(taskData);
      const savedTask = await this.taskRepository.save(task);
      
      this.logger.log(`Task created: ${savedTask.id} by user: ${user.id}`);
      return savedTask;
    } catch (error) {
      this.logger.error(`Failed to create task for user ${user.id}:`, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async findAll(
    user: User,
    status?: TaskStatus,
    search?: string,
    dateFrom?: string,
    dateTo?: string,
  ): Promise<Task[]> {
    try {
      const query = this.taskRepository.createQueryBuilder('task')
        .where('task.userId = :userId', { userId: user.id });

      if (status) {
        query.andWhere('task.status = :status', { status });
      }

      if (search) {
        query.andWhere(
          '(task.title ILIKE :search OR task.description ILIKE :search)',
          { search: `%${search}%` }
        );
      }

      if (dateFrom) {
        query.andWhere('task.createdAt >= :dateFrom', { dateFrom });
      }

      if (dateTo) {
        query.andWhere('task.createdAt <= :dateTo', { dateTo });
      }

      query.orderBy('task.createdAt', 'DESC');

      return await query.getMany();
    } catch (error) {
      this.logger.error(`Failed to fetch tasks for user ${user.id}:`, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async getByStatus(user: User): Promise<{ [key in TaskStatus]: Task[] }> {
    try {
      const tasks = await this.findAll(user);
      
      return {
        [TaskStatus.TODO]: tasks.filter(task => task.status === TaskStatus.TODO),
        [TaskStatus.IN_PROGRESS]: tasks.filter(task => task.status === TaskStatus.IN_PROGRESS),
        [TaskStatus.DONE]: tasks.filter(task => task.status === TaskStatus.DONE),
      };
    } catch (error) {
      this.logger.error(`Failed to get tasks by status for user ${user.id}:`, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  // TODO
  // get by id
  // update by id
  // delete by id
}

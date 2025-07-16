import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from 'src/constants/types';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete project documentation',
    description: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'Write comprehensive documentation for the ZigTask project',
    description: 'Task description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: TaskStatus.TODO,
    enum: TaskStatus,
    description: 'Task status',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({
    example: '2024-12-31T23:59:59.000Z',
    description: 'Task due date',
  })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
} 
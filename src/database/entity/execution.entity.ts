import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import IExecution from '../model/execution.model'

@Entity('executions')
export class ExecutionEntity implements IExecution {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'timestamp', default: new Date().toISOString() })
  timestamp!: string

  @Column('integer')
  commands!: number

  @Column('integer')
  result!: number

  @Column('decimal', { precision: 10, scale: 6 })
  duration!: number
}

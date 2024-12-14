import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { ExecutionEntity } from './entity/execution.entity'

let typeORMDB: DataSource

export default async function typeORMConnect(): Promise<void> {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.NODE_ENV === 'development' ? 'localhost' : process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [ExecutionEntity],
    synchronize: true,
  })

  typeORMDB = await dataSource.initialize()
}

export function useTypeORM(
  entity: EntityTarget<ObjectLiteral>,
): Repository<ObjectLiteral> {
  if (!typeORMDB) {
    throw new Error('TypeORM has not been initialized!')
  }

  return typeORMDB.getRepository(entity)
}

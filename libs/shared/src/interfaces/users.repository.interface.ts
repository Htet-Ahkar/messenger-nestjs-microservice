import { UserEntity } from '../entities';
import { BaseInterfaceRepository } from '../repositories';

export interface UserRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {}

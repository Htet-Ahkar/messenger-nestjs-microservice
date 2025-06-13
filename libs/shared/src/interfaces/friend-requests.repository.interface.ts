import { FriendRequestEntity } from '../entities/friend-request.entity';
import { BaseInterfaceRepository } from '../repositories';

export interface FriendRequestsRepositoryInterface
  extends BaseInterfaceRepository<FriendRequestEntity> {}

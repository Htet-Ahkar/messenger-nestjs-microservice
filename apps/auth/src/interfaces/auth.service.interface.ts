import { UserEntity } from '@/shared';
import { ExistingUserDTO, NewUserDTO } from '../dto';

export interface AuthServiceInterface {
  getUsers(): Promise<UserEntity[]>;
  getUserById(id: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: number): Promise<UserEntity | null>;
  hashPassword(password: string): Promise<string>;
  register(newUser: Readonly<NewUserDTO>): Promise<UserEntity>;
  doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
  validateUser(email: string, password: string): Promise<UserEntity | null>;
  login(existingUser: Readonly<ExistingUserDTO>): Promise<{
    token: string;
    user: UserEntity;
  }>;
  verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }>;
  // getUserFromHeader(jwt: string): Promise<UserJwt>;
  // addFriend(userId: number, friendId: number): Promise<FriendRequestEntity>;
  // getFriends(userId: number): Promise<FriendRequestEntity[]>;
}

import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FriendRequestEntity } from './friend-request.entity';
// import { ConversationEntity } from './conversation.entity';
// import { MessageEntity } from './message.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(
    () => FriendRequestEntity,
    (friendRequestEntity) => friendRequestEntity.creator,
  )
  friendRequestCreator: FriendRequestEntity[];

  @OneToMany(
    () => FriendRequestEntity,
    (friendRequestEntity) => friendRequestEntity.receiver,
  )
  friendRequestReceiver: FriendRequestEntity[];

  // @ManyToMany(
  //   () => ConversationEntity,
  //   (conversationEntity) => conversationEntity.users,
  // )
  // conversations: ConversationEntity[];

  // @OneToMany(() => MessageEntity, (messageEntity) => messageEntity.user)
  // messages: MessageEntity[];
}

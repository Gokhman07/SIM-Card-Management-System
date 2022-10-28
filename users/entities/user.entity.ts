import { Column, Entity, PrimaryGeneratedColumn ,OneToMany} from 'typeorm';
import { UserRole } from './user.role';
import { IsBoolean } from 'class-validator';
import { Event } from '../../event/entities/event.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: false })
  password: string;


/*
  @OneToMany(() => Event, (event) => event.module)
  event: Event[];
*/
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MANAGER,
  })
  role: UserRole;
}

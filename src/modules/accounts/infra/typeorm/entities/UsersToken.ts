import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, } from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "./User";

@Entity("users_token")
class UsersToken {

  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { UsersToken }
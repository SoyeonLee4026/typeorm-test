import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v7 as uuidv7 } from "uuid";

@Entity({
  name: "organizations",
})
export class Organization {
  @Column()
  name: string;

  @PrimaryColumn({
    name: "id",
    type: "uuid",
    comment: "Primary key generated using uuidv7",
  })
  id: string;
  @BeforeInsert()
  generateId(): void {
    this.id = uuidv7();
  }

  @Column({
    name: "status",
    type: "enum",
    enum: ["active", "inactive"],
    default: "active",
  })
  status: "active" | "inactive";

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    type: "timestamptz",
    nullable: true,
    comment: "User deleted time",
    default: null,
  })
  deletedAt: Date | null;
}

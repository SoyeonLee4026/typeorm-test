import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Organization } from "./organization.entity";

@Entity({
  name: "departments",
})
export class Department {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ name: "organization_id", type: "uuid" })
  organizationId: string;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: "organization_id" })
  organization?: Organization;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

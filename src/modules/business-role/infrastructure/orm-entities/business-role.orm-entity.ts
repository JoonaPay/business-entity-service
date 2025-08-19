import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("business_roles")
export class BusinessroleOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ name: "is_active", default: true })
  isActive?: boolean;

  @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt?: Date;

  @Column({ name: "deleted_at", type: "timestamp", nullable: true })
  deletedAt?: Date;

  @Column({ name: "business_id", nullable: true })
  business_id?: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "description" })
  description: string;

  @Column({ name: "permissions", type: "jsonb" })
  permissions: string[];

  @Column({ name: "is_system_role", default: false })
  is_system_role: boolean;

  @Column({ name: "is_customizable", default: true })
  is_customizable: boolean;

  @Column({ name: "hierarchy", default: 100 })
  hierarchy: number;

  @Column({ name: "metadata", type: "jsonb", default: '{}' })
  metadata: Record<string, any>;
}
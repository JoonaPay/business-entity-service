import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("business_members")
export class BusinessmemberOrmEntity {
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

  @Column({ name: "business_id" })
  business_id: string;

  @Column({ name: "user_id" })
  user_id: string;

  @Column({ name: "role_id" })
  role_id: string;

  @Column({ name: "status", default: 'PENDING' })
  status: string;

  @Column({ name: "joined_at", type: "timestamp" })
  joined_at: Date;

  @Column({ name: "invited_by", nullable: true })
  invited_by?: string;

  @Column({ name: "permissions", type: "jsonb" })
  permissions: string[];

  @Column({ name: "is_owner", default: false })
  is_owner: boolean;

  @Column({ name: "metadata", type: "jsonb", default: '{}' })
  metadata: Record<string, any>;

  @Column({ name: "last_activity_at", type: "timestamp", nullable: true })
  last_activity_at?: Date;

  @Column({ name: "activity_history", type: "jsonb", default: '[]' })
  activity_history: any[];
}
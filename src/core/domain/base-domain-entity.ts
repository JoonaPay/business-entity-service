import { v4 as uuidv4 } from 'uuid';

export abstract class BaseDomainEntity {
  protected readonly _id: string;
  protected readonly _createdAt: Date;
  protected _updatedAt: Date;
  protected _deletedAt?: Date;

  constructor(id?: string) {
    this._id = id || uuidv4();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt;
  }

  protected touch(): void {
    this._updatedAt = new Date();
  }

  protected markDeleted(): void {
    this._deletedAt = new Date();
    this.touch();
  }

  public equals(entity: BaseDomainEntity): boolean {
    return this._id === entity._id;
  }

  public isDeleted(): boolean {
    return this._deletedAt !== undefined;
  }

  public softDelete(): void {
    this.markDeleted();
  }

  public isActive(): boolean {
    return !this.isDeleted();
  }
}

export * from './create-business-entity.command';
export * from './update-business-entity.command';
export * from './delete-business-entity.command';

import { CreateBusinessEntityHandler } from './create-business-entity.command';
import { UpdateBusinessEntityHandler } from './update-business-entity.command';
import { DeleteBusinessEntityHandler } from './delete-business-entity.command';

export const CommandHandlers = [
  CreateBusinessEntityHandler,
  UpdateBusinessEntityHandler,
  DeleteBusinessEntityHandler,
];

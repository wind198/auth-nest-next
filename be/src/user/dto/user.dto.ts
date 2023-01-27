import { IUserCoreField } from '../entities/user.entity';

export class CreateUserDto implements IUserCoreField {
  email: string;
  password: string;
}

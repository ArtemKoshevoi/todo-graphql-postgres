import * as mongoose from 'mongoose';
import { UserRole } from 'src/modules/shared/enums/user-role.enum';

export const UsersSchema = new mongoose.Schema({
  password: String,
  roles: [
    {
      type: String,
      enum: Object.values(UserRole),
      default: [UserRole.User],
    },
  ],
  token: {
    type: String,
    trim: true,
  },
});

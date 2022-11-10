import * as mongoose from 'mongoose';

export const ProfilesSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
});

import * as mongoose from 'mongoose';

export const TasksSchema = new mongoose.Schema({
  title: { type: String, require: true },
  assignedTo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
});

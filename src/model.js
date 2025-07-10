import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  matchId: String,
  player: String,
  minute: Number,
  team: String
}, { timestamps: true });

export default mongoose.model('Goal', GoalSchema);

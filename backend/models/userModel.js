import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Defines user model
const userSchema = Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, default: null },
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  // Generate salt and hash password with salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Campare passwords
userSchema.methods.comparePassword = async function (enteredPasword) {
  return await bcrypt.compare(enteredPasword, this.password);
};

const User = model('User', userSchema);

export default User;

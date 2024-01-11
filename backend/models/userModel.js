import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPasword) {
  return await bcrypt.compare(enteredPasword, this.password);
};

const User = model('User', userSchema);

export default User;

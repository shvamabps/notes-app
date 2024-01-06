import { Schema, model } from 'mongoose'
import { User } from '../interfaces/Users'

const UserSchema: Schema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      default: '',
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      default: '',
    },
    password: {
      type: String,
      required: true,
      trim: true,
      default: '',
    },

    authKey: {
      type: String,
      default: '',
    },
  },
  { timestamps: true, versionKey: false },
)

const UserModel = model<User>('user', UserSchema)

export default UserModel

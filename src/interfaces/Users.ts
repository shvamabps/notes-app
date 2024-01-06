import { Document, Types } from 'mongoose'

interface UserPassword {
  password: string
}

export interface User extends UserPassword {
  name: string
  email: string
  username: string
  authKey?: string
}

export interface UserDocument extends User, Document {
  _id: Types.ObjectId
}

export interface UserRegister {
  name: string
  email: string
  username: string
  password: string
  confirmPassword: string
}

export interface UserLogin {
  username: string
  password: string
}

export interface Token {
  _id: Types.ObjectId
  username: string
  email: string
}

export interface AuthenticatedUser {
  user: Token
}

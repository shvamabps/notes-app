import { Document, Types } from 'mongoose'
import { Token } from './Users'

export interface Notes {
  title: string
  content: string
  userId: Types.ObjectId
}

export interface InsertNotes {
  title: string
  content: string
  user: Token
}

export interface GetUserNote {
  user: Token
}

export interface NoteId {
  noteId?: Types.ObjectId
}

export interface DeleteNote {
  user: Token
}

export interface UpdateNotes {
  title: string
  content: string
  user: Token
}

export interface NotesDocument extends Notes, Document {
  _id: Types.ObjectId
}

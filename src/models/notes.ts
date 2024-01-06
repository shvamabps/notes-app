import { Schema, model } from 'mongoose'
import { Notes } from '../interfaces/Notes'

const NotesSchema: Schema = new Schema<Notes>(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
)

const NotesModel = model<Notes>('notes', NotesSchema)

export default NotesModel

import mongoose from 'mongoose'
import { NoteId, UpdateNotes } from '../../interfaces/Notes'
import NotesModel from '../../models/notes'

export const updateNote = async (body: UpdateNotes, params: NoteId) => {
  try {
    const { user, content, title }: UpdateNotes = body
    const { noteId }: NoteId = params

    if (!noteId) {
      return {
        statuscode: 400,
        message: 'Note id is required.',
        success: false,
      }
    }

    if (!mongoose.isValidObjectId(noteId)) {
      return {
        statuscode: 400,
        message: 'Invalid note id.',
        success: false,
      }
    }

    const updateNote = await NotesModel.updateOne(
      {
        userId: user?._id,
        _id: noteId,
      },
      {
        $set: {
          title,
          content,
        },
      },
    )

    if (updateNote.matchedCount === 0) {
      return {
        statuscode: 404,
        message: 'Requested note not available.',
        success: false,
      }
    }

    return {
      statuscode: 200,
      message: 'User note updated successfully.',
      success: true,
    }
  } catch (error) {
    console.error('Error in update user note: ', error)
    return {
      statuscode: 500,
      message: error.message,
      success: false,
    }
  }
}

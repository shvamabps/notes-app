import mongoose from 'mongoose'
import { DeleteNote, NoteId } from '../../interfaces/Notes'
import NotesModel from '../../models/notes'

export const deleteNote = async (body: DeleteNote, params: NoteId) => {
  try {
    const { user }: DeleteNote = body
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

    const deleteNote = await NotesModel.deleteOne({
      userId: user?._id,
      _id: noteId,
    })

    if (deleteNote.deletedCount === 0) {
      return {
        statuscode: 404,
        message: 'Requested note not available.',
        success: false,
      }
    }

    return {
      statuscode: 204,
      message: 'User note deleted successfully.',
      success: true,
    }
  } catch (error) {
    console.error('Error in delete user note: ', error)
    return {
      statuscode: 500,
      message: error.message,
      success: false,
    }
  }
}

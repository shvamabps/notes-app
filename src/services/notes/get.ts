import mongoose from 'mongoose'
import { GetUserNote, NoteId } from '../../interfaces/Notes'
import NotesModel from '../../models/notes'

export const getNote = async (body: GetUserNote, params: NoteId) => {
  try {
    const { user }: GetUserNote = body
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

    const agg = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user?._id),
          _id: new mongoose.Types.ObjectId(noteId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
        },
      },
      {
        $project: {
          'user.password': 0,
          'user.authKey': 0,
        },
      },
    ]

    const notes = await NotesModel.aggregate(agg)

    if (notes && notes.length === 0) {
      return {
        statuscode: 404,
        message: 'Requested note not available.',
        success: false,
      }
    }

    return {
      statuscode: 200,
      message: 'Notes retrieved successfully.',
      success: true,
      data: notes,
    }
  } catch (error) {
    console.error('Error in get user note: ', error)
    return {
      statuscode: 500,
      message: error.message,
      success: false,
    }
  }
}

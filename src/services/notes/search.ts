import mongoose from 'mongoose'
import { AuthenticatedUser } from '../../interfaces/Users'
import NotesModel from '../../models/notes'

export const searchNotes = async (body: AuthenticatedUser, query: string) => {
  try {
    const { user }: AuthenticatedUser = body

    const agg = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user?._id),
          $or: [
            {
              title: {
                $regex: query,
                $options: 'i',
              },
            },
          ],
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
        message: 'No notes available.',
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
    console.error('Error in getAllNotes: ', error)
    return {
      statuscode: 500,
      message: error.message,
      success: false,
    }
  }
}

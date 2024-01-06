import { InsertNotes } from '../../interfaces/Notes'
import NotesModel from '../../models/notes'
import UserModel from '../../models/users'

export const insertNote = async (body: InsertNotes) => {
  try {
    const { content, title, user } = body

    const checkUser = await UserModel.findOne({ _id: user._id })

    if (!checkUser) {
      return {
        message: 'User not found.',
        statuscode: 404,
        success: false,
      }
    }

    const note = await NotesModel.create({
      content,
      title,
      userId: user._id,
    })

    return {
      message: 'Note created successfully.',
      statuscode: 201,
      success: true,
      data: note,
    }
  } catch (error) {
    console.error('Error in insertNote: ', error)
    return {
      message: error.message,
      statuscode: 500,
      success: false,
    }
  }
}

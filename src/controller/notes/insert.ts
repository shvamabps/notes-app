import { Request, Response } from 'express'
import { insertNote } from '../../services/notes'

export const insertNoteController = async (req: Request, res: Response) => {
  try {
    const notes = await insertNote(req.body)
    return res.status(notes.statuscode).json(notes)
  } catch (error) {
    console.error('Error in insertNoteController: ', error)
    return res.status(500).json({
      message: error.message,
      success: false,
      statuscode: 500,
    })
  }
}

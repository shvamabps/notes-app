import { Request, Response } from 'express'
import { getAllNotes } from '../../services/notes'

export const getAllNotesController = async (req: Request, res: Response) => {
  try {
    const notes = await getAllNotes(req.body)
    return res.status(notes.statuscode).json(notes)
  } catch (error) {
    console.error('Error in getAllNotesController: ', error)
    return res.status(500).json({
      message: error.message,
      success: false,
      statuscode: 500,
    })
  }
}

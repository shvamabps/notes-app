import { Request, Response } from 'express'
import { searchNotes } from '../../services/notes'

export const searchNotesController = async (req: Request, res: Response) => {
  try {
    const notes = await searchNotes(req.body, req.query.q as string)
    return res.status(notes.statuscode).json(notes)
  } catch (error) {
    console.error('Error in searchNotesController: ', error)
    return res.status(500).json({
      message: error.message,
      success: false,
      statuscode: 500,
    })
  }
}

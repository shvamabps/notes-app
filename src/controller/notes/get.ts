import { Request, Response } from 'express'
import { NoteId } from '../../interfaces/Notes'
import { getNote } from '../../services/notes'

export const getNoteController = async (req: Request, res: Response) => {
  try {
    const notes = await getNote(req.body, req.params as NoteId)
    return res.status(notes.statuscode).json(notes)
  } catch (error) {
    console.error('Error in getNoteController: ', error)
    return res.status(500).json({
      message: error.message,
      success: false,
      statuscode: 500,
    })
  }
}

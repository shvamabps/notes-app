import { Request, Response } from 'express'
import { NoteId } from '../../interfaces/Notes'
import { updateNote } from '../../services/notes'

export const updateNoteController = async (req: Request, res: Response) => {
  try {
    const notes = await updateNote(req.body, req.params as NoteId)
    return res.status(notes.statuscode).json(notes)
  } catch (error) {
    console.error('Error in updateNoteController: ', error)
    return res.status(500).json({
      message: error.message,
      success: false,
      statuscode: 500,
    })
  }
}

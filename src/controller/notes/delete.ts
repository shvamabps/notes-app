import { Request, Response } from 'express'
import { NoteId } from '../../interfaces/Notes'
import { deleteNote } from '../../services/notes'

export const deleteNoteController = async (req: Request, res: Response) => {
  try {
    const notes = await deleteNote(req.body, req.params as NoteId)
    return res.status(notes.statuscode).json(notes)
  } catch (error) {
    console.error('Error in deleteNoteController: ', error)
    return res.status(500).json({
      message: error.message,
      success: false,
      statuscode: 500,
    })
  }
}

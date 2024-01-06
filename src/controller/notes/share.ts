import { Request, Response } from 'express'
import { NoteId } from '../../interfaces/Notes'
import { shareNote } from '../../services/notes'

export const shareNoteController = async (req: Request, res: Response) => {
  try {
    const httpOrigin = req.headers.host.includes('localhost') ? 'http' : 'https'
    const origin = `${httpOrigin}://${
      req.headers.origin || req.headers.host || req.headers.referer
    }`

    const notes = await shareNote(req.body, req.params as NoteId, origin)
    return res.status(notes.statuscode).json(notes)
  } catch (error) {
    console.error('Error in shareNoteController: ', error)
    return res.status(500).json({
      message: error.message,
      success: false,
      statuscode: 500,
    })
  }
}

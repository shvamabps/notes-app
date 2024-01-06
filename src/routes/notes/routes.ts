import { Router } from 'express'

import {
  deleteNoteController,
  getAllNotesController,
  getNoteController,
  insertNoteController,
  searchNotesController,
  shareNoteController,
  updateNoteController,
} from '../../controller'

const router = Router()

router.post('/', insertNoteController)
router.get('/', getAllNotesController)
router.get('/search', searchNotesController)
router.get('/:noteId', getNoteController)
router.delete('/:noteId', deleteNoteController)
router.post('/:noteId/share', shareNoteController)
router.put('/:noteId', updateNoteController)

export { router as NotesRouter }

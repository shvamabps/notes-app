import { Router } from 'express'

import { loginController, registrationController } from '../../controller'

const router = Router()

router.post('/signup', registrationController)
router.post('/login', loginController)

export { router as UserRouter }

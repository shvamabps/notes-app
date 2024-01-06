import { Request, Response } from 'express'
import { register } from '../../services/users'

export const registrationController = async (req: Request, res: Response) => {
  try {
    const user = await register(req.body)
    return res.status(user.statuscode).json(user)
  } catch (error) {
    console.error('Error in registrationController: ', error)
    return res.status(500).json({
      message: error.message,
      success: false,
      statuscode: 500,
    })
  }
}

import { Request, Response } from 'express'
import { login } from '../../services/users'

export const loginController = async (req: Request, res: Response) => {
  try {
    const user = await login(req.body)
    return res.status(user.statuscode).json(user)
  } catch (error) {
    console.error('Error in loginController: ', error)
    return res.status(500).json({
      message: error.message,
      success: false,
      statuscode: 500,
    })
  }
}

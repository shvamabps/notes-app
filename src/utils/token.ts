import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Token } from '../interfaces/Users'
import UserModel from '../models/users'

export const generateToken = (data: Token) => {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    return token
  } catch (error) {
    console.error('Error in generating token.', error)
    return false
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({
        message: 'Authentication token is required.',
        success: false,
        statuscode: 401,
      })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        message: 'Authentication token is required.',
        success: false,
        statuscode: 401,
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload

    if (!decoded) {
      return res.status(403).json({
        message: 'Invalid token.',
        success: false,
        statuscode: 403,
      })
    }

    const checkUser = await UserModel.findOne({
      _id: decoded._id,
    })

    if (!checkUser) {
      return res.status(403).json({
        message: 'Invalid token.',
        success: false,
        statuscode: 403,
      })
    }

    if (checkUser.authKey !== token) {
      return res.status(403).json({
        message: 'Invalid token. Try logging in again.',
        success: false,
        statuscode: 403,
      })
    }

    req.body.user = decoded

    return next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      await UserModel.updateOne(
        { email: req.body.email },
        { $set: { authKey: '' } },
      )
      return res.status(401).json({
        message: 'Token expired.',
        success: false,
        statuscode: 401,
      })
    }
    console.error('Error in verifying token.', error)
    return false
  }
}

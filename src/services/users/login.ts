import { Token, UserLogin } from '../../interfaces/Users'
import UserModel from '../../models/users'
import { compare } from '../../utils/password'
import { generateToken } from '../../utils/token'

export const login = async (body: UserLogin) => {
  try {
    const { password, username }: UserLogin = body

    if (!username) {
      return {
        message: 'Username is required.',
        success: false,
        statuscode: 400,
      }
    }

    if (!password) {
      return {
        message: 'Password is required.',
        success: false,
        statuscode: 400,
      }
    }

    const checkUserName = await UserModel.findOne({ username })

    if (!checkUserName) {
      return {
        message: 'Username not found.',
        success: false,
        statuscode: 404,
      }
    }

    const checkPassword = await compare(password, checkUserName.password)

    if (!checkPassword) {
      return {
        message: 'Invalid Credentials.',
        success: false,
        statuscode: 401,
      }
    }

    const data: Token = {
      _id: checkUserName._id,
      username: checkUserName.username,
      email: checkUserName.email,
    }

    const token = generateToken(data)

    await UserModel.updateOne(
      { _id: checkUserName._id },
      {
        $set: {
          authKey: token,
        },
      },
    )

    return {
      message: 'User logged in successfully.',
      success: true,
      statuscode: 200,
      data: {
        token,
      },
    }
  } catch (error) {
    console.error('Error in user login service.', error)
    return {
      message: error.message,
      success: false,
      statuscode: 500,
    }
  }
}

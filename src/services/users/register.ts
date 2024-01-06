import { UserRegister } from '../../interfaces/Users'
import UserModel from '../../models/users'
import { hash } from '../../utils/password'

export const register = async (body: UserRegister) => {
  try {
    const { name, email, username, password, confirmPassword }: UserRegister =
      body

    if (!name) {
      return {
        message: 'Name is required.',
        success: false,
        statuscode: 400,
      }
    }

    if (!email) {
      return {
        message: 'Email is required.',
        success: false,
        statuscode: 400,
      }
    }

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

    if (!confirmPassword) {
      return {
        message: 'Confirm password is required.',
        success: false,
        statuscode: 400,
      }
    }

    if (password.length < 6) {
      return {
        message: 'Password must be at least 6 characters.',
        success: false,
        statuscode: 400,
      }
    }

    if (password !== confirmPassword) {
      return {
        message: "Password and confirm password doesn't match.",
        success: false,
        statuscode: 400,
      }
    }

    const checkUserName = await UserModel.findOne({ username })

    if (checkUserName) {
      return {
        message: 'Username already exists.',
        success: false,
        statuscode: 400,
      }
    }

    const checkUserEmail = await UserModel.findOne({ email })

    if (checkUserEmail) {
      return {
        message: 'Email already exists.',
        success: false,
        statuscode: 400,
      }
    }

    const hashedPassword = await hash(password)

    await UserModel.create({
      name,
      email,
      username,
      password: hashedPassword,
    })
    return {
      message: 'User registration successfully completed.',
      success: true,
      statuscode: 201,
    }
  } catch (error) {
    console.error('Error in user registration service.', error)
    return {
      message: error.message,
      success: false,
      statuscode: 500,
    }
  }
}

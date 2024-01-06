import bcrypt from 'bcrypt'

export const hash = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    console.error('Error in password hashing.', error)
    return false
  }
}

export const compare = async (password: string, hashedPassword: string) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
  } catch (error) {
    console.error('Error in password comparison.', error)
    return false
  }
}

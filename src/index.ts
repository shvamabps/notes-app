import { config } from 'dotenv'
import app from './app'
import Database from './utils/db'

config()

const PORT = process.env.PORT

Database.Instance.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})

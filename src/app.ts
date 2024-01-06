import cors from 'cors'
import { config } from 'dotenv'
import express, { Response } from 'express'
import morgan from 'morgan'

import rateLimitMiddleware from './middleware/rateLimit'
import throttleMiddleware from './middleware/throttle'
import { NotesRouter, UserRouter } from './routes'
import { verifyToken } from './utils/token'

const app = express()

config()

app.use(
  cors({
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'testing'
)
  app.use(morgan('dev'))

app.use(rateLimitMiddleware)
app.use(throttleMiddleware)

app.get('/', (_, res: Response) => res.status(200).send('API is running.'))

app.use('/api/auth', UserRouter)
app.use('/api/notes', verifyToken, NotesRouter)
app.all('*', (_, res: Response) => res.status(404).send('Not Found'))

export default app

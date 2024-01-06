// middleware/customRateLimit.ts
import { NextFunction, Request, Response } from 'express'

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 1 minutes
const RATE_LIMIT_MAX_REQUESTS = 100 // Limit each IP to 100 requests per windowMs

interface RateLimitData {
  [ip: string]: {
    timestamp: number
    requests: number
  }
}

const rateLimitData: RateLimitData = {}

const rateLimitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const clientIp = req.ip

  if (!rateLimitData[clientIp]) {
    rateLimitData[clientIp] = {
      timestamp: Date.now(),
      requests: 1,
    }
  } else {
    const { timestamp, requests } = rateLimitData[clientIp]
    const elapsedTime = Date.now() - timestamp

    if (elapsedTime < RATE_LIMIT_WINDOW_MS) {
      if (requests >= RATE_LIMIT_MAX_REQUESTS) {
        return res
          .status(429)
          .json({ error: 'Too many requests, please try again later.' })
      }
      rateLimitData[clientIp].requests += 1
    } else {
      rateLimitData[clientIp] = {
        timestamp: Date.now(),
        requests: 1,
      }
    }
  }

  return next()
}

export default rateLimitMiddleware

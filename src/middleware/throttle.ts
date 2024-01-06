// middleware/throttle.ts
import { NextFunction, Request, Response } from 'express'

const THROTTLE_LIMIT = 100 // Adjust the limit as needed
const THROTTLE_WINDOW_MS = 15 * 60 * 1000 // 15 minute window
const throttleMap = new Map<string, number>()

const throttleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const clientIp = req.ip // Use IP for simplicity (You might need a better identifier for production)

  // Check if the client's requests exceed the limit within the window
  if (throttleMap.has(clientIp)) {
    const requests = throttleMap.get(clientIp) || 0
    if (requests >= THROTTLE_LIMIT) {
      return res
        .status(429)
        .json({ error: 'Request limit exceeded. Please try again later.' })
    }
  }

  // Update or set the timestamp of the current request
  throttleMap.set(clientIp, (throttleMap.get(clientIp) || 0) + 1)
  setTimeout(() => {
    // Clear the request after the window time has elapsed
    const lastRequestTime = throttleMap.get(clientIp) || 0
    if (lastRequestTime <= 1) {
      throttleMap.delete(clientIp)
    } else {
      throttleMap.set(clientIp, lastRequestTime - 1)
    }
  }, THROTTLE_WINDOW_MS)

  // Continue processing the request
  next()
}

export default throttleMiddleware

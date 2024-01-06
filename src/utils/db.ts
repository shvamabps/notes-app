import mongoose from 'mongoose'

export default class Database {
  private static _instance: Database
  private _db: mongoose.Connection

  private constructor() {
    const url = process.env.MONGODB_URL!

    mongoose.connect(url, {
      maxConnecting: 1,
      autoIndex: true,
    })
    this._db = mongoose.connection
    this._db.on('error', console.error.bind(console, 'connection error:'))
    this._db.once('open', () => {
      console.log('Connected to MongoDB')
    })

    // Auto disconnection
    process.on('SIGINT', () => {
      this.disconnect()
    })
  }

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  public get connection() {
    return this._db
  }

  public disconnect() {
    this._db.close(true)
    console.log('Disconnected from MongoDB')
  }

  public clear() {
    return this._db.dropDatabase()
  }
}

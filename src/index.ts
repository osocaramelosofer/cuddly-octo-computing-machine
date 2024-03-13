/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Express, type Request, type Response } from 'express'
import cors from 'cors'
import { chatRouter } from './routes/chat'
import { fsqRouter } from './routes/fsq'
import { rateLimitMiddleware } from './middlewares/rateLimiter'
import { searchRouter } from './routes/test'
import { userRouter } from './users/routes'

const app: Express = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false
}))
app.use(rateLimitMiddleware)

app.get('/', (req: Request, res: Response) => {
  console.log("hola")
    res.status(200).json({ message: 'Hello World!' })
})

app.use('/api/v1/chat', chatRouter)
app.use('/api/v1/fsq', fsqRouter)
app.use('/api/v1/search', searchRouter)
app.use('/api/v1/users', userRouter)

const PORT: number = 3000
app.listen(PORT, (): void => {
  console.log(`server running on port http://localhost:${PORT}`)
})

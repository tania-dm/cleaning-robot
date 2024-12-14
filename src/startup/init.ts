import { Express } from 'express'
import typeORMConnect from '../database'

const appSetup = async (app: Express) => {
  try {
    await typeORMConnect()
    console.log('Database connected successfully!')
    const PORT = process.env.APP_PORT || 5000

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  }
  catch (error) {
    console.log('Unable to start the app!')
    console.error(error)
  }
}

export default appSetup

import { Express, Request, Response } from 'express'
import executionController from '../controllers/execution.controller'

const routerSetup = (app: Express) =>
  app
    .get('/healthcheck', (req: Request, res: Response) => {
      res.send('Hello World!')
    })

    .use('/clean', executionController)

export default routerSetup
